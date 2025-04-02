// src/components/CoupleStory.tsx
import { motion } from 'framer-motion';

export default function CoupleStory() {
  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          className="text-center font-serif text-3xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Love Story
        </motion.h3>
        
        <div className="space-y-12">
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:w-1/3 text-center">
              <div className="text-gold font-script text-3xl mb-2">How We Met</div>
              <div className="text-sm text-gray-600">March 2019</div>
            </div>
            <div className="md:w-2/3">
              <p className="leading-relaxed text-justify">
              A simple struggle with a door led to a chance encounter at the university when she approached him with a warm
              "Hey, what's up? Do you need help? Are you new here?" What began as a thoughtful campus tour blossomed into something neither of them
              could have anticipated, proving that sometimes the most beautiful connections start with a simple act of kindness.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="md:w-1/3 text-center">
              <div className="text-gold font-script text-3xl mb-2">First Date</div>
              <div className="text-sm text-gray-600">March 2019</div>
            </div>
            <div className="md:w-2/3">
              <p className="leading-relaxed text-justify">
              Their journey together began the very day they met, when dinner at a cozy mamak restaurant transformed new acquaintances
              into fast friends. Over shared dishes and endless conversation, they laid the foundation for a relationship that would 
              continue to grow and evolve into the beautiful partnership they cherish today.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="md:w-1/3 text-center">
              <div className="text-gold font-script text-3xl mb-2">The Proposal</div>
              <div className="text-sm text-gray-600">November 2023</div>
            </div>
            <div className="md:w-2/3">
              <p className="leading-relaxed text-justify">
              Distance may have separated them physically, but their hearts remained perfectly aligned when she spontaneously asked, 
              "Babe, let's get married" and his immediate "Let's!" sealed their fate. The heartwarming video call between their families
              bridged all gaps, as parents from both sides blessed their union and the countdown to forever officially began.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}