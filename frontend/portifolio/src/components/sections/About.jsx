import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

import SectionTitle from '../ui/SectionTitle.jsx';
import StatCard from '../ui/StatCard.jsx';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { PERSONAL_INFO, STATS } from '../../data/aboutData';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-24 border-b border-border bg-background transition-colors duration-300 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">

                <SectionTitle subtitle="Minha Biografia" title="Sobre Mim" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="space-y-6 text-base md:text-lg"
                    >
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground/90 leading-tight">
                            Desenvolvedor focado em <span className="text-primary">Performance</span>, <span className="text-primary">Arquitetura</span> e Design.
                        </h3>

                        <p className="text-muted-foreground leading-relaxed">
                            Olá! Eu sou um desenvolvedor apaixonado por construir sistemas robustos.
                            Comecei a minha jornada a explorar os fundamentos do
                            <strong className="text-foreground"> Linux</strong> e hoje crio soluções completas (Full Stack).
                        </p>

                        <p className="text-muted-foreground leading-relaxed">
                            A minha especialidade é unir a velocidade do <strong className="text-foreground">FastAPI (Python)</strong> no backend
                            com a interatividade do <strong className="text-foreground">React</strong> no frontend.
                            Atualmente estou focado em arquitetura de software, Docker e Git Flow profissional.
                        </p>

                        <div className="pt-4">
                            <Link to="/projects">
                                <motion.button
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                >
                                    Ver Repositórios
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <ul className="space-y-4">
                            {PERSONAL_INFO.map((item, index) => (
                                <li key={index} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                                    <span className="text-sm md:text-base text-muted-foreground font-medium">{item.label}</span>
                                    <span className="text-sm md:text-base text-foreground font-bold text-right font-mono">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24"
                >
                    {STATS.map((stat) => (
                        <StatCard key={stat.id} {...stat} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default About;