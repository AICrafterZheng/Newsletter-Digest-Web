import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
  console.log(apiUrl);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${apiUrl}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error);
        }
  
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Something went wrong');
      }
    };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Send className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Newsletter</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Get exclusive content, updates, and insights delivered straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          Subscribe Now
          <Send className="w-5 h-5" />
        </button>
        {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
          </p>
        )}
      </form>
    </div>
  );
}