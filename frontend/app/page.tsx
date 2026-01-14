'use client';

import { useState } from 'react';

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [numberInput, setNumberInput] = useState<string>('');
  const [addResult, setAddResult] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [styleInput, setStyleInput] = useState<string>('');
  const [styledResult, setStyledResult] = useState<string>('');
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Exercise 0: Health Check (Working)
  const checkHealth = async () => {
    setLoading({ ...loading, health: true });
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      setHealthStatus(`Status: ${data.status}, Time: ${new Date(data.timestamp).toLocaleString()}`);
    } catch (error) {
      setHealthStatus('Error: Could not connect to backend');
    } finally {
      setLoading({ ...loading, health: false });
    }
  };

  // Exercise 1: Add 10 Route
  // Here, the functionality is complete but we're missing the API link! Let's create the
  // API from the backend and then use it in our frontend.
  const addTen = async () => {
    setLoading({ ...loading, add: true });
    try {
      // what do we write here?
      const response = await fetch(`${API_BASE_URL}/api/add-ten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: parseInt(numberInput) }),
      });
      const data = await response.json();
      setAddResult(`Result: ${data.result}`);
    } catch (error) {
      setAddResult('Error: Could not process request');
    } finally {
      setLoading({ ...loading, add: false });
    }
  };

  // Exercise 2: Style Text with Gemini
  // This frontend is done! However, we'll need to make the backend route for its functionality
  const styleText = async () => {
    setLoading({ ...loading, style: true });
    try {
      const response = await fetch(`${API_BASE_URL}/api/style-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: textInput, 
          style: styleInput 
        }),
      });
      const data = await response.json();
      setStyledResult(data.styledText);
    } catch (error) {
      setStyledResult('Error: Could not process request');
    } finally {
      setLoading({ ...loading, style: false });
    }
  };

  return (
    <div className="min-h-screen bg-[#151515] p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="fixed top-0 left-0 right-0 bg-[#151515] border-b border-[#333] z-50">
          <div className="max-w-4xl mx-auto px-8 py-4 flex justify-end gap-6">
            <a href="https://github.com/Kevinxygu/nw-intro-to-apis-and-express" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
              GitHub Link
            </a>
            <a href="https://nw-intro-to-apis-and-express.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
              Final Product
            </a>
          </div>
        </nav>

        {/* Exercise 0: Health Check */}
        <div className="bg-[#151515] border border-[#333] rounded-xl p-6 mb-6 mt-24 hover:border-[#444] transition-colors">
          <h2 className="text-2xl font-semibold mb-4 text-white">Exercise 0: Health Check</h2>
          <p className="text-gray-400 mb-4">
            This route is already working! Click the button to check if the backend is running.
          </p>
          <button
            onClick={checkHealth}
            disabled={loading.health}
            className="bg-white text-black font-medium py-2 px-6 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading.health ? 'Checking...' : 'Check Health'}
          </button>
          {healthStatus && (
            <div className="mt-4 p-4 bg-[#0a3d0a] border border-[#1a5c1a] rounded-lg">
              <p className="text-green-400">{healthStatus}</p>
            </div>
          )}
        </div>

        {/* Exercise 1: Add 10 section*/}
        <div className="bg-[#151515] border border-[#333] rounded-xl p-6 mb-6 hover:border-[#444] transition-colors">
          <h2 className="text-2xl font-semibold mb-4 text-white">Exercise 1: Add 10 (Connecting frontend to backend)</h2>
          <p className="text-gray-400 mb-4">
            Let's fill in the routes to add 10 to any number!
          </p>
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Enter a number"
              className="flex-1 p-3 bg-[#0a0a0a] border border-[#333] rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors"
            />
            <button
              onClick={addTen}
              disabled={loading.add || !numberInput}
              className="bg-white text-black font-medium py-2 px-6 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading.add ? 'Adding...' : 'Add 10'}
            </button>
          </div>
          {addResult && (
            <div className="mt-4 p-4 bg-[#1a1a2e] border border-[#2a2a4e] rounded-lg">
              <p className="text-blue-400 font-medium">{addResult}</p>
            </div>
          )}
        </div>

        {/* Exercise 2: Style Text by calling Gemini API */}
        <div className="bg-[#151515] border border-[#333] rounded-xl p-6 hover:border-[#444] transition-colors">
          <h2 className="text-2xl font-semibold mb-4 text-white">Exercise 2: AI Text Styler (Full Walkthrough)</h2>
          <p className="text-gray-400 mb-4">
            Let's build a wrapping project to style text using Gemini API (also an MLH prize)!
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Text to transform:
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="e.g., Hello friends, I am here"
                className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 min-h-[80px] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Style to apply:
              </label>
              <input
                type="text"
                value={styleInput}
                onChange={(e) => setStyleInput(e.target.value)}
                placeholder="e.g., say it like a pirate"
                className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors"
              />
            </div>
            <button
              onClick={styleText}
              disabled={loading.style || !textInput || !styleInput}
              className="w-full bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading.style ? 'Styling...' : 'Transform Text'}
            </button>
          </div>
          {styledResult && (
            <div className="mt-6 p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-lg">
              <p className="text-sm font-medium text-gray-400 mb-2">Styled Result:</p>
              <p className="text-white text-lg">{styledResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
