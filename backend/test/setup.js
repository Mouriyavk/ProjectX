const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSetup() {
  try {
    // Create test users
    const user1 = await prisma.user.create({
      data: {
        id: 'test-user-1',
        xp: 0
      }
    });

    const user2 = await prisma.user.create({
      data: {
        id: 'test-user-2',
        xp: 0
      }
    });

    console.log('Test users created:', { user1, user2 });

    // Test XP update
    const updatedUser = await prisma.user.update({
      where: { id: user1.id },
      data: {
        xp: { increment: 50 },
        activityLogs: {
          create: {
            actionType: 'EVENT_CREATION',
            quantity: 1,
            xpEarned: 50
          }
        }
      }
    });

    console.log('XP update successful:', updatedUser);

    // Test activity log
    const activityLogs = await prisma.activityLog.findMany({
      where: { userId: user1.id }
    });

    console.log('Activity logs:', activityLogs);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSetup(); 