import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations.js';

const SectionTitle = ({ subtitle, title }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 md:mb-16"
        >
            <span className="text-primary font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary"></span> {subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4">
                {title}
            </h2>
        </motion.div>
    );
};

export default SectionTitle;