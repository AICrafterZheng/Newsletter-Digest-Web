import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
  };

  return (
    <div className="bg-white/20 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 text-white mr-2" />
        <h2 className="text-xl font-semibold text-white">Newsletter</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center group"
        >
          Subscribe
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}