import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

import StatusBadge from '../ui/StatusBadge';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { TECH_STACK, TYPEWRITER_WORDS } from '../../data/heroData';

const Hero = () => {
    const handleDownloadCV = () => {
        alert("O PDF do currículo será baixado aqui.");
    }

    return (
        <section id='home' className='min-h-[90vh] flex flex-col justify-center items-start pt-32 pb-20 md:pt-20 md:pb-32 overflow-visible px-4 md:px-0'>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl"
            >
                <StatusBadge variants={fadeInUp} />

                <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 md:mb-6 tracking-tight leading-tight">
                    Olá, eu sou <span className="text-muted-foreground">Pablo</span>
                </motion.h1>

                <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground mb-6 md:mb-8 h-16 md:h-20 flex items-center">
                    <span className="mr-2">Eu construo</span>
                    <span className="text-foreground font-semibold border-b-2 md:border-b-4 border-primary inline-block min-w-[10px]">
                        <Typewriter
                            words={TYPEWRITER_WORDS}
                            loop={0}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                </motion.h2>

                <motion.p variants={fadeInUp} className="max-w-xl text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                    Especialista em transformar ideias complexas em código limpo usando
                    <strong className="text-foreground"> Python (FastAPI)</strong> e
                    <strong className="text-foreground"> React</strong>.
                    Focado em performance, arquitetura e boa documentação.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadCV}
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 w-full sm:w-auto"
                    >
                        <FaDownload />
                        Download CV
                    </motion.button>

                    <Link to="/projects" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--muted), 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-border text-foreground hover:bg-muted/50 rounded-xl font-bold transition-all w-full sm:w-auto"
                        >
                            Meus Projetos
                            <FaArrowRight className="text-xs" />
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-16 md:mt-20 pt-8 border-t border-border w-full">
                    <p className="text-muted-foreground text-xs md:text-sm mb-6 uppercase tracking-widest font-bold opacity-70">
                        Tech Stack Principal
                    </p>
                    <div className="flex flex-wrap gap-6 md:gap-8 items-center">
                        {TECH_STACK.map((tech, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5, scale: 1.1 }}
                                className={`text-2xl md:text-3xl transition-colors duration-300 ${tech.color} flex flex-col items-center gap-2 group cursor-default relative`}
                            >
                                <tech.icon />
                                <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap pointer-events-none">
                                    {tech.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero;