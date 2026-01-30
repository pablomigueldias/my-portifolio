import React from 'react';
import { motion } from 'framer-motion';

export const ContactCard = ({ icon: Icon, title, description, value, link, isText }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-card border border-border p-6 rounded-2xl flex items-start gap-5 hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
    >
        <div className="p-4 bg-muted rounded-xl text-primary text-xl">
            <Icon />
        </div>
        <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{description}</p>
            {isText ? (
                <span className="text-foreground font-mono font-medium block">{value}</span>
            ) : (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary font-mono font-bold hover:underline underline-offset-4 decoration-primary/30 transition-all">
                    {value}
                </a>
            )}
        </div>
    </motion.div>
);

export const FormInput = ({ label, register, name, rules, error, placeholder, type = "text" }) => (
    <div className="group">
        <label className="block text-sm font-bold text-foreground mb-2">{label}</label>
        <input
            type={type}
            {...register(name, rules)}
            className={`w-full bg-muted/30 border ${error ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50`}
            placeholder={placeholder}
        />
        {error && <span className="text-red-500 text-xs mt-1 font-medium">{error.message}</span>}
    </div>
);

export const FormTextArea = ({ label, register, name, rules, error, placeholder, rows = 5 }) => (
    <div>
        <label className="block text-sm font-bold text-foreground mb-2">{label}</label>
        <textarea
            {...register(name, rules)}
            rows={rows}
            className={`w-full bg-muted/30 border ${error ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50`}
            placeholder={placeholder}
        ></textarea>
        {error && <span className="text-red-500 text-xs mt-1 font-medium">{error.message}</span>}
    </div>
);