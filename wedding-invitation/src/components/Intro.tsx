// src/components/Intro.tsx
import { motion } from 'framer-motion';
import dividerImg from '../assets/images/xdivider.png';

export default function Intro() {
  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h3
          className="font-serif text-3xl mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          With great pleasure
        </motion.h3>
        <motion.p
          className="font-sans text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          We, Ravin Sinnasami and Gersha Mukundan, invite you to join us as we celebrate our love and commitment in the presence of family and friends. 
          Your presence will make our special day complete.
        </motion.p>
        <motion.div
          // className="font-script text-3xl text-gold"
          // initial={{ opacity: 0, scale: 0.9 }}
          // whileInView={{ opacity: 1, scale: 1 }}
          // viewport={{ once: true }}
          // transition={{ duration: 1, delay: 0.6 }}
        >
          {/* ELEPHANT HERE */}
          
          <div className="flex justify-center mb-6">
            <img src={dividerImg} alt="Decorative divider" className="size-52 w-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}