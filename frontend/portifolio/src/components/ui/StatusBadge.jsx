import React from 'react';
import { motion } from 'framer-motion';

const StatusBadge = ({ variants }) => {
  return (
    <motion.div 
      variants={variants} 
      className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 md:mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span className="text-primary text-[10px] md:text-[11px] font-semibold tracking-widest uppercase">
        Disponível para projetos
      </span>
    </motion.div>
  );
};

export default StatusBadge;