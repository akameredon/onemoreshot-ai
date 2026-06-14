import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticate } from '../middleware/auth';

const router = Router();

const videos: any[] = [];

router.get('/', authenticate, (req: Request, res: Response) => {
  try {
    const userVideos = videos.filter(v => v.userId === req.userId);
    res.json({
      videos: userVideos,
      total: userVideos.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

router.get('/:id', authenticate, (req: Request, res: Response) => {
  try {
    const video = videos.find(v => v.id === req.params.id && v.userId === req.userId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ video });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

router.post('/generate', authenticate, (req: Request, res: Response) => {
  try {
    const { audioFile, artistId, videoType, options } = req.body;

    if (!audioFile || !artistId || !videoType) {
      return res.status(400).json({ error: 'Audio file, artist ID, and video type required' });
    }

    const video = {
      id: uuidv4(),
      userId: req.userId,
      artistId,
      videoType,
      audioFile,
      status: 'processing',
      creditsUsed: videoType === 'lyrics' ? 25 : 10,
      options: options || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    videos.push(video);

    res.status(201).json({
      message: 'Video generation started',
      video
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

router.delete('/:id', authenticate, (req: Request, res: Response) => {
  try {
    const index = videos.findIndex(v => v.id === req.params.id && v.userId === req.userId);

    if (index === -1) {
      return res.status(404).json({ error: 'Video not found' });
    }

    videos.splice(index, 1);

    res.json({
      message: 'Video deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

export default router;
