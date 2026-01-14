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

// Exercise 0: Health Check Route (WORKING)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Backend is running successfully!'
  });
});

// Exercise 1: Add 10 Route (TO BE IMPLEMENTED BY STUDENTS)
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

// Exercise 2: Style Text with Gemini API (TO BE IMPLEMENTED BY STUDENTS)
app.post('/api/style-text', async (req: Request, res: Response) => {
  try {
    const { text, style } = req.body;

    // Validate input
    if (!text || !style) {
      return res.status(400).json({ error: 'Please provide both text and style' });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env file'
      });
    }

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Take the following text and rewrite it in this style: "${style}". 
    Only return the rewritten text, nothing else.
    
    Original text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const styledText = response.text();

    res.json({
      originalText: text,
      style: style,
      styledText: styledText.trim()
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    console.log('Gemini API Key configured:', !!process.env.GEMINI_API_KEY);

    // Log full error details for debugging
    if (error.response) {
      console.error('API Response Error:', await error.response.text());
    }

    res.status(500).json({
      error: 'Failed to style text',
      details: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Available routes:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   POST /api/add-ten - Add 10 to a number`);
  console.log(`   POST /api/style-text - Style text with Gemini AI`);
});