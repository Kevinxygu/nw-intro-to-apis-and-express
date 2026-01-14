import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Exercise 0: Health Check Route (FULLY WORKING)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Backend is running successfully!'
  });
});

// Exercise 1: Add 10 Route
// Here, the functionality is complete of adding 10 to a number. However, we don't have a route!
// What should we write here?
app.post('/api/add-ten', (req: Request, res: Response) => {
  try {
    const { number } = req.body;

    // Validate input
    if (typeof number !== 'number') {
      return res.status(400).json({ error: 'Please provide a valid number' });
    }

    // Add 10 to the number
    const result = number + 10;

    res.json({
      original: number,
      result: result,
      operation: 'added 10'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Exercise 2: Style Text with Gemini API (FULL WALKTHROUGH, backend only)
// IMPLEMENT

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Available routes:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   POST /api/add-ten - Add 10 to a number`);
  console.log(`   POST /api/style-text - Style text with Gemini AI`);
});