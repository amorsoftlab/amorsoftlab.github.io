import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Footer from './components/Footer';
import ProjectPage from './pages/ProjectPage';

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
        <Route path="/music-club" element={<ProjectPage 
          repoName="music_club_release" 
          title="Music Club" 
          description="Stream, discover, and enjoy your favorite music. Available for Android and Windows — completely free." 
          imagePath="music_club_hero.png" 
          logoPath="music_club_logo.png" 
        />} />
        <Route path="/eventdesk" element={<ProjectPage 
          repoName="event_desk" 
          title="EventDesk" 
          description="Premium Hall Booking Management Software. Seamlessly manage calendar slots, reservations, event schedules, and customer details all in one place." 
          imagePath="eventdesk.png" 
        />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
