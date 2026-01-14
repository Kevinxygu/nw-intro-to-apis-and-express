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

  // Exercise 1: Add 10 Route (To be implemented)
  const addTen = async () => {
    setLoading({ ...loading, add: true });
    try {
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

  // Exercise 2: Style Text with Gemini (To be implemented)
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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-orange-200 to-yellow-200 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-gray-800">Intro to APIs & Express</h1>
            <span className="text-4xl">N</span>
          </div>
          <p className="text-gray-600 text-lg">nwPlus Workshop</p>
        </header>

        {/* Exercise 0: Health Check */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Exercise 0: Health Check ✅</h2>
          <p className="text-gray-600 mb-4">
            This route is already working! Click the button to check if the backend is running.
          </p>
          <button
            onClick={checkHealth}
            disabled={loading.health}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading.health ? 'Checking...' : 'Check Health'}
          </button>
          {healthStatus && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{healthStatus}</p>
            </div>
          )}
        </div>

        {/* Exercise 1: Add 10 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Exercise 1: Add 10 🔢</h2>
          <p className="text-gray-600 mb-4">
            Implement the backend route to add 10 to any number!
          </p>
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Enter a number"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              onClick={addTen}
              disabled={loading.add || !numberInput}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading.add ? 'Adding...' : 'Add 10'}
            </button>
          </div>
          {addResult && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-purple-800 font-semibold">{addResult}</p>
            </div>
          )}
        </div>

        {/* Exercise 2: Style Text with AI */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Exercise 2: AI Text Styler 🎨</h2>
          <p className="text-gray-600 mb-4">
            Use the Gemini API to transform text into different styles!
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text to transform:
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="e.g., Hello friends, I am here"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style to apply:
              </label>
              <input
                type="text"
                value={styleInput}
                onChange={(e) => setStyleInput(e.target.value)}
                placeholder="e.g., say it like a pirate"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              />
            </div>
            <button
              onClick={styleText}
              disabled={loading.style || !textInput || !styleInput}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading.style ? 'Styling...' : 'Transform Text'}
            </button>
          </div>
          {styledResult && (
            <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-2">Styled Result:</p>
              <p className="text-orange-900 text-lg">{styledResult}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p>Built with Next.js + Express.js | bit.ly/nw-api</p>
        </footer>
      </div>
    </div>
  );
}