import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your gallery images
import img1 from '../assets/images/gallery1.jpg';
import img2 from '../assets/images/gallery2.jpg';
import img3 from '../assets/images/gallery3.jpg';

// Add more images as needed

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const images = [img1, img2, img3 /* Add more images */];
  
  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    
    // If swipe is more than 50px, change slides
    if (difference > 50) {
      goToNext();
    } else if (difference < -50) {
      goToPrevious();
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  
  // New fade transition variants
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h3
          className="text-center font-serif text-3xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Moments
        </motion.h3>
        
        <div className="relative w-full aspect-square md:aspect-video overflow-hidden bg-white">
          {/* Carousel container */}
          <div 
            className="w-full h-full relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    goToNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    goToPrevious();
                  }
                }}
              >
                <img 
                  src={images[currentIndex]} 
                  alt={`Gallery image ${currentIndex + 1}`} 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gold bg-opacity-50 rounded-full flex items-center justify-center text-2xl z-10 hover:bg-opacity-75 transition-all"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gold bg-opacity-50 rounded-full flex items-center justify-center text-2xl z-10 hover:bg-opacity-75 transition-all"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-white' : 'bg-white bg-opacity-50'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}