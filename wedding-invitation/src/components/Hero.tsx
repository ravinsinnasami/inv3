// src/components/Hero.tsx
import { motion } from 'framer-motion';
import coupleImage from '../assets/images/couple.jpg';

export default function Hero() {
  return (
    <motion.section
      className="relative h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coupleImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <motion.h2 
          className="font-script text-5xl md:text-7xl mb-4"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 200, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We're Getting Married
        </motion.h2>
        <motion.p
          className="font-sans text-xl md:text-2xl"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 200, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Join us to celebrate our special day
        </motion.p>
      </div>
    </motion.section>
  );
}