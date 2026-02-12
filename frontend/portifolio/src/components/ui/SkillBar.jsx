import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const SkillBar = ({ name, percentage }) => {
  const counterRef = useRef();
  const barRef = useRef(null);
  
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const node = counterRef.current;
      
      const controls = animate(0, percentage, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value) + "%";
        }
      });

      return () => controls.stop();
    }
  }, [isInView, percentage]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">
          {name}
        </span>

        <span ref={counterRef} className="text-muted-foreground text-sm font-mono font-bold opacity-80">
          0%
        </span>
      </div>
      
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="h-full bg-primary rounded-full relative"
        >
          <div className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-[2px]"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillBar;