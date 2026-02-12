import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { fadeInUp } from '../../utils/animations';

const StatCard = ({ value, suffix, text, icon: Icon, isText }) => {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, borderColor: "rgba(var(--primary), 0.5)" }}
            className="p-4 md:p-6 bg-card rounded-xl border border-border transition-all duration-300 group shadow-sm hover:shadow-lg flex flex-col items-center text-center"
        >
            <div className="text-2xl md:text-3xl text-muted-foreground mb-3 group-hover:text-primary transition-colors transform group-hover:scale-110 duration-300">
                <Icon />
            </div>

            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 font-mono">
                {isText ? (
                    <span>{suffix}</span>
                ) : (
                    <AnimatedCounter to={value} suffix={suffix} />
                )}
            </div>

            <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-80 mt-1">
                {text}
            </div>
        </motion.div>
    );
};

export default StatCard;