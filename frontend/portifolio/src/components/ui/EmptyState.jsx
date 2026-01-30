import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const EmptyState = ({ title, message, actionLabel, onAction }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-card/50 border border-dashed border-border rounded-3xl"
    >
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
            <FaSearch className="text-2xl opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-md mb-6">
            {message}
        </p>
        {actionLabel && onAction && (
            <button
                onClick={onAction}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
                {actionLabel}
            </button>
        )}
    </motion.div>
);

export default EmptyState;