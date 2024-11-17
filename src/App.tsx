import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AIFrontiersArticle from './components/Newsletters';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* add the article page */}
          <Route path="/article/:id" element={<AIFrontiersArticle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;