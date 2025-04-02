// Home.tsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import EventDetails from '../components/EventDetails';
import CoupleStory from '../components/CoupleStory';
import Gallery from '../components/Gallery';
// import VenueMap from '../components/VenueMap';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import GuestWishes from '../components/GuestWishes';

interface HomeProps {
  isAudioPlaying: boolean;
  audioSrc: string;
}

export default function Home({ isAudioPlaying, audioSrc }: HomeProps) {
  // Target date for countdown - update with your wedding date
  const weddingDate = "2025-05-09";

  return (
    <div className="invitation-container">
      <Hero />
      <Header weddingDate={weddingDate} />
      <Intro />
      <EventDetails />
      <CoupleStory />
      <Gallery />
      {/* <VenueMap /> */}
      <GuestWishes />
      <Footer />
      <AudioPlayer audioSrc={audioSrc} initialPlayingState={isAudioPlaying} />
    </div>
  );
}