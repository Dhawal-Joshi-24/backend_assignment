const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { Video } = require('../models/Videos');

// Add new video
router.post('/addvideos', fetchuser, async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const video = new Video({ title, description, url });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete existing video
router.delete('/deletevideos/:id', fetchuser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(deletedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View videos
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View video by title
router.get('/videos/:title', async (req, res) => {
    try {
      const { title } = req.params;
      const video = await Video.findOne({ title: title });
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
