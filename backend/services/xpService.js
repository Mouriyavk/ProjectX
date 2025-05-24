const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const XP_RULES = {
  EVENT_CREATION: 50,
  CUSTOMIZATION_MIN: 10,
  CUSTOMIZATION_MAX: 30,
  INVITE_5: 10,
  INVITE_20: 25,
  CHAT_SHARE: 5,
  UPDATE: 10,
  TASK_COMPLETION: 30,
  POST_EVENT_SHARE: 15,
  GOOD_REVIEW: 25,
  DAILY_STREAK: 5,
  STREAK_10_DAYS: 50,
  EVENT_COMPLETION: 50
};

const CIRCLE_PLACEMENTS = {
  INNER: { min: 1, max: 2 },
  MIDDLE: { min: 3, max: 5 },
  OUTER: { min: 6, max: Infinity }
};

class XPService {
  static calculateXP(actionType, quantity = 1) {
    switch (actionType) {
      case 'EVENT_CREATION':
        return XP_RULES.EVENT_CREATION;
      case 'CUSTOMIZATION':
        return Math.min(
          XP_RULES.CUSTOMIZATION_MAX,
          XP_RULES.CUSTOMIZATION_MIN * quantity
        );
      case 'INVITE':
        if (quantity >= 20) return XP_RULES.INVITE_20;
        return Math.floor(quantity / 5) * XP_RULES.INVITE_5;
      case 'CHAT_SHARE':
        return XP_RULES.CHAT_SHARE * quantity;
      case 'UPDATE':
        return XP_RULES.UPDATE * quantity;
      case 'TASK_COMPLETION':
        return XP_RULES.TASK_COMPLETION;
      case 'POST_EVENT_SHARE':
        return XP_RULES.POST_EVENT_SHARE;
      case 'GOOD_REVIEW':
        return XP_RULES.GOOD_REVIEW;
      case 'DAILY_STREAK':
        if (quantity >= 10) return XP_RULES.STREAK_10_DAYS;
        return XP_RULES.DAILY_STREAK * quantity;
      case 'EVENT_COMPLETION':
        return XP_RULES.EVENT_COMPLETION;
      default:
        return 0;
    }
  }

  static getCirclePlacement(rank) {
    for (const [placement, { min, max }] of Object.entries(CIRCLE_PLACEMENTS)) {
      if (rank >= min && rank <= max) return placement;
    }
    return 'OUTER';
  }

  static async updateXP(userId, actionType, quantity = 1) {
    console.log('\n=== Starting XP Update ===');
    console.log('Input:', { userId, actionType, quantity });

    // Input validation
    if (!userId || !actionType) {
      throw new Error('Missing required fields: userId and actionType are required');
    }

    // Calculate XP
    const xpEarned = this.calculateXP(actionType, quantity);
    console.log('XP earned:', xpEarned);

    try {
      // Use upsert to handle both create and update cases
      const updatedUser = await prisma.user.upsert({
        where: { id: userId },
        update: {
          xp: {
            increment: xpEarned
          },
          lastActiveDate: new Date()
        },
        create: {
          id: userId,
          xp: xpEarned,
          lastActiveDate: new Date()
        }
      });

      // Create activity log
      await prisma.activityLog.create({
        data: {
          userId: userId,
          actionType: actionType,
          quantity: quantity,
          xpEarned: xpEarned
        }
      });

      console.log('Update successful:', {
        userId: updatedUser.id,
        newXP: updatedUser.xp,
        lastActive: updatedUser.lastActiveDate
      });

      return updatedUser;
    } catch (error) {
      console.error('XP Update Error:', {
        error: error.message,
        code: error.code,
        meta: error.meta,
        stack: error.stack
      });

      throw new Error(`Failed to update XP: ${error.message}`);
    }
  }

  static async getUserRank(userId) {
    try {
      console.log(`\n=== Getting Rank for User ${userId} ===`);
      
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) return null;

      const rank = await prisma.user.count({
        where: {
          xp: { gt: user.xp }
        }
      }) + 1;

      console.log(`Current XP: ${user.xp}`);
      console.log(`Calculated Rank: ${rank}`);

      const circlePlacement = this.getCirclePlacement(rank);
      console.log(`Circle Placement: ${circlePlacement}`);

      return {
        xp: user.xp,
        rank,
        circlePlacement
      };
    } catch (error) {
      console.error('Error in getUserRank:', error);
      throw error;
    }
  }

  static async getLeaderboard() {
    try {
      console.log('\n=== Generating Leaderboard ===');
      
      const users = await prisma.user.findMany({
        orderBy: { xp: 'desc' },
        select: {
          id: true,
          xp: true,
          lastActiveDate: true
        }
      });

      console.log(`Found ${users.length} users`);

      return users.map((user, index) => {
        const rank = index + 1;
        const circlePlacement = this.getCirclePlacement(rank);
        
        console.log(`\nUser ${user.id}:`);
        console.log(`XP: ${user.xp}`);
        console.log(`Rank: ${rank}`);
        console.log(`Circle: ${circlePlacement}`);

        return {
          ...user,
          rank,
          circlePlacement
        };
      });
    } catch (error) {
      console.error('Error in getLeaderboard:', error);
      throw error;
    }
  }
}

module.exports = XPService; 