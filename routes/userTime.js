const express = require('express');
const router = express.Router();
const { Session } = require('../models/Session');
// Start new session
router.post('/sessions', async (req, res) => {
    try {
      const { user_id } = req.body;
  
      // Find user's latest session
      const latestSession = await Session.findOne({ user_id }).sort({ start_time: -1 });
  
      // Check if user has an ongoing session
      if (latestSession && !latestSession.end_time) {
        return res.status(400).json({ error: 'User already has an ongoing session' });
      }
  
      // Start new session
      const newSession = new Session({ user_id, start_time: new Date() });
      await newSession.save();
      res.json(newSession);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  // End ongoing session
router.put('/sessions/:id/end', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find session by ID
      const session = await Session.findById(id);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      // Check if session has already ended
      if (session.end_time) {
        return res.status(400).json({ error: 'Session has already ended' });
      }
  
      // End session
      session.end_time = new Date();
      await session.save();
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  // Get average session time for user
router.get('/sessions/:user_id/average-time', async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Find all completed sessions for user
      const sessions = await Session.find({ user_id, end_time: { $exists: true } });
  
      // Calculate average session time
      const totalSessionTime = sessions.reduce((acc, session) => {
        return acc + session.session_time;
      }, 0);
      const averageSessionTime = totalSessionTime / sessions.length;
  
      res.json({ averageSessionTime });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  