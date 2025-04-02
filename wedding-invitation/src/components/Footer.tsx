// src/components/Footer.tsx
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 px-4 bg-gold text-white text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="font-script text-3xl mb-4">Ravin & Gersha</h3>
        <p className="mb-2">May 9, 2025</p>
        <p className="text-sm">© {currentYear} - With love by the happy couple</p>
      </motion.div>
    </footer>
  );
}