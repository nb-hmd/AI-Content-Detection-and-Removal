import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import analysisRoutes from './routes/analysis.js';
import conversionRoutes from './routes/conversion.js';

// Import middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();

// Basic security middleware
app.use(helmet());

// Simple CORS configuration
app.use(cors());

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (before rate limiting)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/analyze', analysisRoutes);
app.use('/api/convert', conversionRoutes);

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'AI Content Detection API',
    version: '1.0.0',
    description: 'Simple API for detecting AI-generated content and converting text',
    endpoints: {
      analysis: {
        'POST /api/analyze': 'Analyze text for AI detection'
      },
      conversion: {
        'POST /api/convert': 'Convert AI text to human-like text'
      }
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Content Detection API - Student Project',
    version: '1.0.0',
    endpoints: {
      analyze: '/api/analyze',
      convert: '/api/convert'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;