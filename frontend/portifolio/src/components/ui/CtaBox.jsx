import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPalette, FaArrowRight } from 'react-icons/fa';

const CtaBox = ({ 
    title = "Precisa de um projeto exclusivo?", 
    description, 
    buttonText = "Fale Comigo", 
    link = "/contact",
    icon: Icon = FaPalette
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 md:p-12 bg-card border border-border rounded-3xl text-center relative overflow-hidden group"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

            <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary rotate-3 group-hover:rotate-6 transition-transform">
                    <Icon size={32} />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{title}</h3>
                
                {description && (
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                        {description}
                    </p>
                )}

                <Link to={link}>
                    <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                        {buttonText} <FaArrowRight />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default CtaBox;