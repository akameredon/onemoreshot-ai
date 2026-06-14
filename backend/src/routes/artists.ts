import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticate } from '../middleware/auth';

const router = Router();

const artists: any[] = [
  {
    id: 'artist-1',
    userId: null,
    name: 'Default AI Artist 1',
    isPublic: true,
    style: 'Realistic',
    bio: 'Default artist',
    createdAt: new Date()
  }
];

router.get('/', (req: Request, res: Response) => {
  try {
    const publicArtists = artists.filter(a => a.isPublic);
    res.json({
      artists: publicArtists,
      total: publicArtists.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

router.get('/my-artists', authenticate, (req: Request, res: Response) => {
  try {
    const userArtists = artists.filter(a => a.userId === req.userId);
    res.json({
      artists: userArtists,
      total: userArtists.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const artist = artists.find(a => a.id === req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json({ artist });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

router.post('/', authenticate, (req: Request, res: Response) => {
  try {
    const { name, referencePhotos, description, style, bio } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Artist name required' });
    }

    const artist = {
      id: uuidv4(),
      userId: req.userId,
      name,
      referencePhotos: referencePhotos || [],
      description: description || '',
      style: style || 'Realistic',
      bio: bio || '',
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    artists.push(artist);

    res.status(201).json({
      message: 'Artist created successfully',
      artist
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create artist' });
  }
});

router.put('/:id', authenticate, (req: Request, res: Response) => {
  try {
    const artist = artists.find(a => a.id === req.params.id);

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    if (artist.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { name, description, style, bio } = req.body;

    if (name) artist.name = name;
    if (description !== undefined) artist.description = description;
    if (style) artist.style = style;
    if (bio !== undefined) artist.bio = bio;
    artist.updatedAt = new Date();

    res.json({
      message: 'Artist updated successfully',
      artist
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update artist' });
  }
});

router.delete('/:id', authenticate, (req: Request, res: Response) => {
  try {
    const index = artists.findIndex(a => a.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const artist = artists[index];
    if (artist.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    artists.splice(index, 1);

    res.json({
      message: 'Artist deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete artist' });
  }
});

export default router;
