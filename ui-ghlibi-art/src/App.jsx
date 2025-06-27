import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Criar from './pages/Criar';
import Features from './pages/Features';
import Galeria from './pages/Galeria';
import Ghibli from './pages/Ghibli';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar" element={<Criar />} />
          <Route path="/features" element={<Features />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/ghibli" element={<Ghibli />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
