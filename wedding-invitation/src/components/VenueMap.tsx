// src/components/VenueMap.tsx
import { motion } from 'framer-motion';

export default function VenueMap() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h3
          className="text-center font-serif text-3xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Location
        </motion.h3>
        
        <div className="aspect-video">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.746318586604!2d-74.00597285!3d40.7127837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1647532256214!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Wedding venue location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}