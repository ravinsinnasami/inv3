// src/components/EventDetails.tsx
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function EventDetails() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h3
          className="text-center font-serif text-3xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Event Details
        </motion.h3>
        
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            className="text-center p-8 border border-gold rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-script text-gold text-3xl mb-4">Wedding</h4>
            <p className="mb-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              May 9, 2025
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              5:15 AM - 6:15 AM
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Sri Maha Mariamman Temple<br />
              <br />
              21A,<br />
              Lengkongan Sri Mersing 25,<br />
              Kawasan 2, Taman Sri Andalas,<br />
              41200 Klang, Selangor
            </p>
          </motion.div>
          
          <motion.div
            className="text-center p-8 border border-gold rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-script text-gold text-3xl mb-4">Bride's Reception</h4>
            <p className="mb-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              May 10, 2025
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              7:01 PM onwards
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Sunshine Banquet Hall<br />
              <br />
              42,<br />
              Persiaran Bukit Raja 2,<br />
              Bandar Baru Klang,<br />
              41150 Klang, Selangor
            </p>
          </motion.div>


          <motion.div
            className="text-center p-8 border border-gold rounded-lg"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-script text-gold text-3xl mb-4">Groom's Reception</h4>
            <p className="mb-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              May 17, 2025
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              7:01 PM onwards
            </p>
            <p className="mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Kompleks Pekan Rabu<br />
              <br />
              Jln Haji Manan, <br />
              Kampung Masjid Lama,<br />
              86000 Kluang, Johor Darul Ta'zim
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}