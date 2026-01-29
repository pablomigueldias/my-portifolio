import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { SiPython, SiReact, SiFastapi, SiGit, SiDocker } from 'react-icons/si';

const TECH_STACK = [
    { name: "Python", icon: SiPython, color: "text-zinc-500 hover:text-yellow-500 dark:text-zinc-500 dark:hover:text-yellow-400" },
    { name: "React", icon: SiReact, color: "text-zinc-500 hover:text-blue-500 dark:text-zinc-500 dark:hover:text-blue-400" },
    { name: "FastAPI", icon: SiFastapi, color: "text-zinc-500 hover:text-teal-500 dark:text-zinc-500 dark:hover:text-teal-400" },
    { name: "Git", icon: SiGit, color: "text-zinc-500 hover:text-orange-600 dark:text-zinc-500 dark:hover:text-orange-500" },
    { name: "Docker", icon: SiDocker, color: "text-zinc-500 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-500" },
];

const TYPEWRITER_WORDS = [
    'Sistemas Escaláveis',
    'Interfaces Modernas',
    'APIs Robustas',
    'Full Stack Solutions'
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

const Hero = () => {
    const handleDownloadCV = () => {
        alert("O PDF do currículo será baixado aqui.");
    }

    return (
        <section id='home' className='min-h-[90vh] flex flex-col justify-center items-start pt-32 pb-20 md:pt-20 md:pb-32 overflow-visible px-4 md:px-0'>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl"
            >
                {/* Badge Disponível */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 md:mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-primary text-[10px] md:text-[11px] font-semibold tracking-widest uppercase">
                        Disponível para projetos
                    </span>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 md:mb-6 tracking-tight leading-tight">
                    Olá, eu sou <span className="text-muted-foreground">Pablo</span>
                </motion.h1>

                <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground mb-6 md:mb-8 h-16 md:h-20 flex items-center">
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

                <motion.p variants={itemVariants} className="max-w-xl text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                    Especialista em transformar ideias complexas em código limpo usando
                    <strong className="text-foreground"> Python (FastAPI)</strong> e
                    <strong className="text-foreground"> React</strong>.
                    Focado em performance, arquitetura e boa documentação.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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

                <motion.div variants={itemVariants} className="mt-16 md:mt-20 pt-8 border-t border-border w-full">
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