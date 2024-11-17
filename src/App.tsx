import { useState } from 'react';
import { Header } from './components/Header';
import AIFrontiersArticle from './components/Newsletters';
import Modal from './components/Modal';
import { SubscribeNewsletterCard } from './components/SubNewsletterCard';
import { DiscordCard } from './components/DiscordCard';

function App() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header 
        onSubscribeClick={() => setShowSubscribe(true)}
        onDiscordClick={() => setShowDiscord(true)}
      />
      
      <main className="relative pt-24 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <AIFrontiersArticle 
            source="AIFrontiers"
            limit={10}
          />
        </div>
      </main>

      {/* Modals */}
      <Modal isOpen={showSubscribe} onClose={() => setShowSubscribe(false)}>
        <SubscribeNewsletterCard />
      </Modal>

      <Modal isOpen={showDiscord} onClose={() => setShowDiscord(false)}>
        <DiscordCard />
      </Modal>
    </div>
  );
}

export default App;