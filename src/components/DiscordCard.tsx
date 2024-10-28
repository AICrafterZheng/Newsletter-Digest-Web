import React from 'react';
import { MessageSquare, Check } from 'lucide-react';

export function DiscordCard() {
  return (
    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Discord Community</h2>
      </div>
      <p className="text-indigo-100 mb-8">
        Join our vibrant Discord community to connect, share, and grow with fellow members.
      </p>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">What you'll get:</h3>
        <ul className="space-y-3">
          {[
            'Exclusive community events',
            'Direct access to our team',
            'Networking opportunities'
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-indigo-200" />
              <span className="text-indigo-100">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="https://discord.gg/your-invite-link"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors text-center flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-5 h-5" />
        Join Discord
      </a>
    </div>
  );
}