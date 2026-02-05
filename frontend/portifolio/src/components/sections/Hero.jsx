import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight, FaCode, FaTools } from 'react-icons/fa';

import StatusBadge from '../ui/StatusBadge';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { TECH_STACK, TYPEWRITER_WORDS } from '../../data/heroData';

const OTHER_TECHS = [
    "Next.js", "Docker", "PostgreSQL", "MongoDB",
    "C# / .NET", "LLM Integration", "Linux (Unix)", "Git"
];

const Hero = () => {
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/Pablo Miguel Dias Otiz - Full Stack.pdf';
        link.download = 'Curriculo_Pablo_Ortiz.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id='home' className='min-h-[80vh] flex items-center justify-center pt-20 pb-20 md:pt-0 md:pb-0 px-4 md:px-0'>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className="flex flex-col justify-center items-start">
                    <StatusBadge variants={fadeInUp} />

                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-5xl font-bold text-foreground mb-4 md:mb-4 tracking-tight leading-tight">
                        Olá, eu sou <span className="text-primary">Pablo Ortiz</span>
                    </motion.h1>

                    <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl md:text-2xl font-light text-muted-foreground mb-6 md:mb-8 h-16 md:h-20 flex items-center">
                        <span className="mr-2">Eu desenvolvo</span>
                        <span className="text-foreground font-semibold border-b-2 md:border-b-4 border-primary inline-block min-w-[10px]">
                            <Typewriter
                                words={TYPEWRITER_WORDS}
                                loop={0}
                                cursor
                                cursorStyle='|'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="max-w-xl text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                        Desenvolvedor <strong className="text-foreground">Full Stack</strong> com experiência em arquitetura de software,
                        gestão de infraestrutura e integração de <strong className="text-foreground">IA</strong>.
                        Especialista em transformar fluxos complexos em aplicações eficientes com
                        <strong className="text-foreground"> Python</strong> e <strong className="text-foreground">React/Next.js</strong>.
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
                                Ver Portfólio
                                <FaArrowRight className="text-xs" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:mr-0"
                >
                    <div className="bg-card/30 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FaCode className="text-xl" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground">Stack Principal</h3>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                            {TECH_STACK.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className={`flex flex-col items-center gap-2 group cursor-default transition-colors duration-300 ${tech.color}`}
                                >
                                    <div className="text-4xl drop-shadow-sm">
                                        <tech.icon />
                                    </div>
                                    <span className="text-[10px] font-mono font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-tighter">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-secondary/20 rounded-lg text-foreground">
                                <FaTools className="text-lg" />
                            </div>
                            <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-widest">Ecosystem & Tools</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {OTHER_TECHS.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 text-[11px] font-bold bg-background/50 border border-border/50 rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    )
}

export default Hero;