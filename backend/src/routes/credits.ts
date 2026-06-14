import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

const userCredits: { [key: string]: number } = {};

router.get('/balance', authenticate, (req: Request, res: Response) => {
  try {
    const balance = userCredits[req.userId || ''] || 10;
    res.json({
      userId: req.userId,
      balance
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch credit balance' });
  }
});

router.post('/purchase', authenticate, (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const currentBalance = userCredits[req.userId || ''] || 10;
    const newBalance = currentBalance + amount;
    userCredits[req.userId || ''] = newBalance;

    res.json({
      message: 'Credits purchased successfully',
      newBalance,
      transaction: {
        id: `txn-${Date.now()}`,
        amount,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase credits' });
  }
});

export default router;
