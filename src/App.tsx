import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Footer from './components/Footer';

function HomePage() {
  return (
    <main>
      <Hero />
      <Products />
    </main>
  );
}

function App() {
  return (
    <>
      <div className="bg-blobs">
        <div className="blob-mid"></div>
      </div>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
