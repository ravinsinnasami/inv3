// Header.tsx
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import dividerImg from '../assets/images/divider.png';

interface HeaderProps {
  weddingDate: string; // Format: 'YYYY-MM-DD'
}

export default function Header({ weddingDate }: HeaderProps) {
  return (
    <motion.header 
      className="text-center py-8 px-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h5 className="font-script text-gold text-3xl mb-2">The Wedding of</h5>
      <h1 className="font-serif text-4xl md:text-6xl text-gold font-bold mb-4">
        Ravin & Gersha
      </h1>
      <p className="font-sans text-lg mb-4">
        Saturday, May 9, 2025
      </p>
      <div className="flex justify-center mb-6">
        <img src={dividerImg} alt="Decorative divider" className="h-12 w-auto" />
      </div>
      
      {/* Add the countdown timer */}
      <CountdownTimer targetDate={weddingDate} />
    </motion.header>
  );
}