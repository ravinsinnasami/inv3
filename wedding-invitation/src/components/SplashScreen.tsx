import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onEnter: () => void;
  coupleNames: string; // e.g., "John & Sarah"
  weddingDate: string; // e.g., "September 12, 2025"
  audioSrc: string;
}

const SplashScreen = ({ onEnter, coupleNames, weddingDate, audioSrc }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Initialize audio element
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.preload = 'auto';

    return () => {
      clearTimeout(timer);
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const handleEnter = () => {
    // Try to play the audio
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        // We'll still enter the site even if audio fails
      });
    }
    
    // Call the onEnter callback
    onEnter();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl w-full text-center">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-lg">Loading our love story...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-script text-5xl md:text-7xl text-gold mb-4">
              {coupleNames}
            </h1>
            <p className="font-serif text-xl md:text-2xl mb-8">
              {weddingDate}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={handleEnter}
                className="bg-gold text-white py-3 px-8 rounded-full text-lg uppercase tracking-wider hover:bg-opacity-90 transition-all flex items-center"
              >
                <span>Open Invitation</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
            <p className="mt-4 text-sm opacity-70">
              Click to open with music
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SplashScreen;