import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

export function DiscordSection() {
  return (
    <div className="bg-white/20 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <MessageSquare className="w-6 h-6 text-white mr-2" />
        <h2 className="text-xl font-semibold text-white">Discord</h2>
      </div>
      <p className="text-white/80 mb-4">
        Join our Discord community to connect with other members and get instant updates.
      </p>
      <a
        href="https://discord.gg/your-invite-link"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-[#5865F2] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#4752C4] transition-colors text-center flex items-center justify-center group"
      >
        Join Discord
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}