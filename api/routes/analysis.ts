import { Router, Request, Response } from 'express';
import { AnalysisService } from '../services/analysisService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Analyze text
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;

  // Basic validation
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Text content is required' 
    });
  }

  try {
    const result = await AnalysisService.analyzeText({ text });
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Analysis failed' 
    });
  }
}));



export default router;