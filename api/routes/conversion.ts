import { Router, Request, Response } from 'express';
import { ConversionService } from '../services/conversionService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Convert AI text to human-like text
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;

  // Basic validation
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Text content is required' 
    });
  }

  try {
    const result = await ConversionService.convertText({ text });
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Text conversion failed' 
    });
  }
}));





export default router;