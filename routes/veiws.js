const express = require('express');
const router = express.Router();
const { UserVideo } = require('../models/UserVideo');

// Route 1
// Create new user video entry if user_id or video_id is new
router.post('/user-videos', async (req, res) => {
    try {
      const { user_id, video_id } = req.params;
  
      // Check if user_id or video_id is already in collection
      const userVideo = await UserVideo.findOne({ user_id, video_id });
      if (userVideo) {
        return res.status(400).json({ error: 'User video entry already exists' });
      }
  
      // Create new user video entry
      const newUserVideo = new UserVideo({ user_id, video_id });
      await newUserVideo.save();
      res.json(newUserVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Route 2
// Increment watch_count for user video
router.put('/user-videos/:id/watch', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find user video entry by ID
      const userVideo = await UserVideo.findById(id);
      if (!userVideo) {
        return res.status(404).json({ error: 'User video entry not found' });
      }
  
      // Increment watch_count and save
      userVideo.watch_count += 1;
      await userVideo.save();
      res.json(userVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Route 3
// Update watch_time for user video
router.put('/user-videos/:id/stop', async (req, res) => {
    try {
      const { id } = req.params;
      const { watch_time } = req.body;
  
      // Find user video entry by ID
      const userVideo = await UserVideo.findById(id);
      if (!userVideo) {
        return res.status(404).json({ error: 'User video entry not found' });
      }
  
      // Update watch_time and save
      userVideo.watch_time = watch_time;
      await userVideo.save();
      res.json(userVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
