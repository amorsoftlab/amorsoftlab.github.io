import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="bg-blobs">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>
      
      <Navbar />
      
      <main>
        <Hero />
        <Products />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
