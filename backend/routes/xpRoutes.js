const express = require('express');
const router = express.Router();
const XPService = require('../services/xpService');

/**
 * @swagger
 * /xp/update:
 *   post:
 *     summary: Update user XP based on action
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - actionType
 *             properties:
 *               userId:
 *                 type: string
 *               actionType:
 *                 type: string
 *               quantity:
 *                 type: integer
 */
router.post('/update', async (req, res) => {
  try {
    const { userId, actionType, quantity } = req.body;
    console.log('Received XP update request:', { userId, actionType, quantity });
    
    if (!userId || !actionType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          userId: !userId ? 'User ID is required' : null,
          actionType: !actionType ? 'Action type is required' : null
        }
      });
    }

    const user = await XPService.updateXP(userId, actionType, quantity || 1);
    res.json(user);
  } catch (error) {
    console.error('XP Update Route Error:', {
      message: error.message,
      stack: error.stack
    });
    
    if (error.message.includes('Missing required fields')) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('User not found')) {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Failed to update XP',
      message: error.message
    });
  }
});

/**
 * @swagger
 * /xp/rank/{userId}:
 *   get:
 *     summary: Get user's XP rank and circle placement
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/rank/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('Getting rank for user:', userId);
    const rankInfo = await XPService.getUserRank(userId);
    
    if (!rankInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rankInfo);
  } catch (error) {
    console.error('Get Rank Route Error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Failed to get rank',
      message: error.message
    });
  }
});

/**
 * @swagger
 * /xp/leaderboard:
 *   get:
 *     summary: Get XP leaderboard with circle placements
 */
router.get('/leaderboard', async (req, res) => {
  try {
    console.log('Getting leaderboard');
    const leaderboard = await XPService.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard Route Error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Failed to get leaderboard',
      message: error.message
    });
  }
});

module.exports = router; 