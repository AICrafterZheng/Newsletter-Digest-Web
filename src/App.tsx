import { Header } from './components/Header';
import { NewsletterCard } from './components/NewsletterCard';
import { DiscordCard } from './components/DiscordCard';
import AIFrontiersArticle from './components/Newsletters';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">

        <AIFrontiersArticle 
          source="AIFrontiers"
          limit={10}
        />
        <Header />

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <NewsletterCard />
          <DiscordCard />
        </div>
      </div>
    </div>
  );
}

export default App;