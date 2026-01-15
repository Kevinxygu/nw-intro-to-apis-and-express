# nwPlus API Workshop - Intro to APIs & Express

Welcome to the nwPlus workshop on APIs and Express! In this workshop, you'll learn how to build a full-stack application with a Next.js frontend and Express backend.

🔗 **Quick Link**: [bit.ly/nw-api](https://bit.ly/nw-api)

## 🎯 Workshop Objectives

By the end of this workshop, you will:
- Understand what APIs are and how they work
- Learn about HTTP methods (GET, POST, PUT, DELETE)
- Create API routes with Express.js
- Connect a frontend to a backend
- Integrate external APIs (Gemini AI)
- Deploy your application

## 📋 Prerequisites

Before starting, make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor (VS Code recommended)
- [Git](https://git-scm.com/)

**Optional (for Docker)**:
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🚀 Quick Start

### Option 1: Run with npm (Recommended for Workshop)

1. **Clone the repository**
```bash
git clone https://github.com/nwplus/intro-to-apis-and-express.git
cd nw-api-workshop
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your Gemini API key (see below)
npm run dev
```

The backend will start on `http://localhost:3001`

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

4. **Open your browser** and navigate to `http://localhost:3000`

### Option 2: Run with Docker

```bash
# Make sure Docker Desktop is running
docker-compose up --build
```

Visit `http://localhost:3000` to see the app!

### Option 3: Run the batch files
You can run ./setup.sh in the root folder (Mac) or ./setup.bat if you're Windows

## 🔑 Getting API Keys

### Gemini API Key (Exercise 2)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Add it to `backend/.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## 📚 Workshop Exercises

### Exercise 0: Health Check ✅ (Working)

**Goal**: Understand how frontend communicates with backend

The health check route is already implemented! Click the "Check Health" button to test the connection.

**What's happening**:
- Frontend makes a GET request to `http://localhost:3001/api/health`
- Backend responds with a JSON object containing status and timestamp
- Frontend displays the response

**Files to explore**:
- Frontend: `frontend/app/page.tsx` (line ~30)
- Backend: `backend/src/index.ts` (line ~20)

---

### Exercise 1: Add 10 Route 🔢

**Goal**: Implement a POST route that adds 10 to any number

**Your Task**:
1. The frontend is already built (input box + button)
2. The backend route is already implemented at `/api/add-ten`
3. Test it by entering a number and clicking "Add 10"

**Challenge**: Try to understand how the code works by reading:
- How the frontend sends data: `frontend/app/page.tsx` (line ~40)
- How the backend processes it: `backend/src/index.ts` (line ~28)

**Expected behavior**:
- Input: `5` → Output: `Result: 15`
- Input: `100` → Output: `Result: 110`

---

### Exercise 2: AI Text Styler 🎨

**Goal**: Integrate the Gemini API to transform text into different styles

**Your Task**:
1. Get a Gemini API key (instructions above)
2. Add it to `backend/.env`
3. Restart your backend server
4. Test the feature:
   - Input text: "Hello friends, I am here"
   - Style: "say it like a pirate"
   - Click "Transform Text"

**What's happening**:
- Frontend sends text + style to backend
- Backend creates a prompt for Gemini
- Gemini transforms the text
- Backend sends the result back to frontend

**Files to explore**:
- Frontend: `frontend/app/page.tsx` (line ~60)
- Backend: `backend/src/index.ts` (line ~48)

**Try different styles**:
- "say it like Shakespeare"
- "say it like a robot"
- "say it in Gen Z slang"
- "say it in a formal business email"

---

## 🏗️ Project Structure

```
nw-api-workshop/
├── frontend/                 # Next.js frontend
│   ├── app/
│   │   └── page.tsx         # Main page with all exercises
│   ├── public/
│   ├── .env.local           # Frontend environment variables
│   ├── Dockerfile
│   └── package.json
├── backend/                  # Express backend
│   ├── src/
│   │   └── index.ts         # Main server file with all routes
│   ├── .env                 # Backend environment variables
│   ├── .env.example         # Template for environment variables
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml       # Docker configuration
└── README.md
```

## 🛠️ API Routes Reference

### GET /api/health
**Description**: Check if the backend is running

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "message": "Backend is running successfully!"
}
```

### POST /api/add-ten
**Description**: Add 10 to a number

**Request Body**:
```json
{
  "number": 5
}
```

**Response**:
```json
{
  "original": 5,
  "result": 15,
  "operation": "added 10"
}
```

### POST /api/style-text
**Description**: Transform text using Gemini AI

**Request Body**:
```json
{
  "text": "Hello friends, I am here",
  "style": "say it like a pirate"
}
```

**Response**:
```json
{
  "originalText": "Hello friends, I am here",
  "style": "say it like a pirate",
  "styledText": "Ahoy, me hearties! I be present!"
}
```

## 🐛 Troubleshooting

### Backend won't start
- Make sure port 3001 is not in use
- Check that all dependencies are installed: `npm install`
- Verify your `.env` file exists in the `backend/` directory

### Frontend won't connect to backend
- Verify backend is running on `http://localhost:3001`
- Check the browser console for errors (F12)
- Make sure `.env.local` has the correct `NEXT_PUBLIC_API_URL`

### Gemini API errors
- Verify your API key is correct in `backend/.env`
- Make sure you restarted the backend after adding the key
- Check you have quota remaining on your Gemini API key

### Docker issues
- Make sure Docker Desktop is running
- Try rebuilding: `docker-compose down && docker-compose up --build`
- Check container logs: `docker-compose logs`

## 📖 Learning Resources

### APIs & HTTP
- [What is an API?](https://aws.amazon.com/what-is/api/)
- [HTTP Methods Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [REST API Tutorial](https://restfulapi.net/)

### Express.js
- [Express Documentation](https://expressjs.com/)
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)

### Gemini AI
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Get API Key](https://makersuite.google.com/app/apikey)

## 🎓 Next Steps

After completing this workshop, try:

1. **Add more routes**: Create a route that multiplies by 5, divides by 2, etc.
2. **Try other AI models**: Explore Claude API, OpenAI API
3. **Add a database**: Store user inputs and results
4. **Add authentication**: Protect your routes with API keys
5. **Deploy your app**: Use Vercel (frontend) and Render (backend)

## 🤝 Contributing

Found a bug or want to improve the workshop? Contributions are welcome!

## 📞 Support

Need help during the workshop? Ask the organizers!

## 📄 License

MIT License - feel free to use this code for your own projects!

---

Built with ❤️ by nwPlus
