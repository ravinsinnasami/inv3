// App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';

// Import your background music
// import backgroundMusic from './assets/audio/wedding-music.mp3';
import backgroundMusic from './assets/audio/primavera2.mp3';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleSplashEnter = () => {
    setShowSplash(false);
    setAudioPlaying(true);
  };

  return (
    <Router>
      {showSplash ? (
        <SplashScreen 
          onEnter={handleSplashEnter} 
          coupleNames="Ravin & Gersha" 
          weddingDate="May 9, 2025"
          audioSrc={backgroundMusic}
        />
      ) : (
        <Routes>
          <Route path="/" element={<Home isAudioPlaying={audioPlaying} audioSrc={backgroundMusic} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;