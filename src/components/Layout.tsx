import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { SubscribeNewsletterCard } from './SubNewsletterCard';
import { DiscordCard } from './DiscordCard';

export default function Layout() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header 
        onSubscribeClick={() => setShowSubscribe(true)}
        onDiscordClick={() => setShowDiscord(true)}
      />
      
      <Outlet />
      
      {/* Subscribe Modal */}
      <Dialog open={showSubscribe} onOpenChange={setShowSubscribe}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <SubscribeNewsletterCard />
        </DialogContent>
      </Dialog>

      {/* Discord Modal */}
      <Dialog open={showDiscord} onOpenChange={setShowDiscord}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <DiscordCard />
        </DialogContent>
      </Dialog>
    </div>
  );
}