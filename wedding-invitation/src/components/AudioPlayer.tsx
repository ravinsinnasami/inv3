// AudioPlayer.tsx
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

interface AudioPlayerProps {
  audioSrc: string;
  initialPlayingState: boolean;
}

const AudioPlayer = ({ audioSrc, initialPlayingState }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(initialPlayingState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.4;
    
    // Play audio if the initial state is true
    if (initialPlayingState) {
      audio.play().catch(error => {
        console.error("Audio playback failed on component mount:", error);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audioSrc, initialPlayingState]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={togglePlay}
        className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label={isPlaying ? "Play music" : "Mute music"}
      >
        <FontAwesomeIcon
          icon={isPlaying ? faVolumeUp : faVolumeMute}
          className="text-gold text-xl"
        />
      </button>
    </div>
  );
};

export default AudioPlayer;