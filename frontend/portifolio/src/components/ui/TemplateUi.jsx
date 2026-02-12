import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaLock, FaPalette, FaArrowRight } from 'react-icons/fa';
import { fadeInUp } from '../../utils/animations';

export const TemplateCard = ({ template }) => (
    <motion.div
        variants={fadeInUp}
        whileHover={{ y: -5 }}
        className="relative group p-1 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >

        <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>

        <div className="bg-card/95 backdrop-blur-sm p-8 rounded-xl h-full flex flex-col items-center justify-center text-center space-y-6 relative z-10 border border-border/50">

            <div className="absolute top-4 right-4 px-3 py-1 bg-muted border border-border rounded-full flex items-center gap-2">
                <FaClock className="text-primary text-xs animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Em Breve</span>
            </div>

            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-2 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 shadow-inner">
                <FaLock size={28} />
            </div>

            <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">{template.name}</h3>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider bg-muted px-2 py-1 rounded inline-block">
                    {template.category}
                </p>
            </div>

            <div className="w-full pt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                    <span>Progresso</span>
                    <span>{template.progress}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${template.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </motion.div>
                </div>
            </div>

        </div>
    </motion.div>
);

export const CtaBox = ({ title, description, buttonText, link }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 p-8 md:p-12 bg-card border border-border rounded-3xl text-center relative overflow-hidden group"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

        <div className="relative z-10">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary rotate-3 group-hover:rotate-6 transition-transform">
                <FaPalette size={32} />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{title}</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                {description}
            </p>

            <Link to={link}>
                <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                    {buttonText} <FaArrowRight />
                </button>
            </Link>
        </div>
    </motion.div>
);