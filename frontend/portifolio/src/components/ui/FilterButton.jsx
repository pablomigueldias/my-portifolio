import React from 'react';
import { motion } from 'framer-motion';

const FilterButton = ({ label, value, current, setFilter }) => {
    const isActive = current === value;

    return (
        <button
            onClick={() => setFilter(value)}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors z-10 flex-shrink-0
            ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
            {isActive && (
                <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md shadow-primary/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            {label}
        </button>
    );
};

export default FilterButton;