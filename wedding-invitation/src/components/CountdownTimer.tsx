import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string; // Format: 'YYYY-MM-DD'
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // If the date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate initially
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      className="flex justify-center items-center my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-4 text-center">
        <div className="bg-gold bg-opacity-20 rounded-lg p-3 min-w-20">
          <div className="font-serif text-3xl text-gold font-bold">{timeLeft.days}</div>
          <div className="text-xs uppercase tracking-wider">Days</div>
        </div>
        <div className="bg-gold bg-opacity-20 rounded-lg p-3 min-w-20">
          <div className="font-serif text-3xl text-gold font-bold">{timeLeft.hours}</div>
          <div className="text-xs uppercase tracking-wider">Hours</div>
        </div>
        <div className="bg-gold bg-opacity-20 rounded-lg p-3 min-w-20">
          <div className="font-serif text-3xl text-gold font-bold">{timeLeft.minutes}</div>
          <div className="text-xs uppercase tracking-wider">Minutes</div>
        </div>
        <div className="bg-gold bg-opacity-20 rounded-lg p-3 min-w-20">
          <div className="font-serif text-3xl text-gold font-bold">{timeLeft.seconds}</div>
          <div className="text-xs uppercase tracking-wider">Seconds</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;