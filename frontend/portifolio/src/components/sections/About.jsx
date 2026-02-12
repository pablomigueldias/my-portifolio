import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUserAstronaut, FaGraduationCap } from 'react-icons/fa';

import SectionTitle from '../ui/SectionTitle.jsx';
import StatCard from '../ui/StatCard.jsx';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { PERSONAL_INFO, STATS } from '../../data/aboutData';

const About = () => {
    const smoothStagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    return (
        <section id="about" className="md:py-24 border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">

                <motion.div
                    variants={smoothStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >

                    <div className="flex flex-col space-y-6 md:space-y-8">

                        <motion.div variants={fadeInUp}>
                            <SectionTitle subtitle="Minha Biografia" title="Sobre Mim" align="left" />
                        </motion.div>

                        <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                            <motion.h3 variants={fadeInUp} className="text-2xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
                                Desenvolvedor Full Stack especializado em <span className="text-primary">Sistemas de Alta Disponibilidade</span> e Automação.
                            </motion.h3>

                            <motion.p variants={fadeInUp} className="border-l-2 border-primary/30 pl-4 py-1">
                                Sou um Desenvolvedor Full Stack com experiência prática na construção e manutenção de aplicações robustas. Com um background sólido em administração de sistemas e gestão de servidores (WHM/cPanel), domino o ciclo completo de vida de um software — desde a arquitetura do banco de dados até o deploy e a monitoração em produção.
                            </motion.p>

                            <motion.p variants={fadeInUp}>
                                Minha stack de alta performance é centrada em Python (FastAPI) e React/Next.js, tecnologias que utilizei para otimizar operações e escalar produtos digitais. Tenho expertise na integração de Inteligência Artificial (LLMs) para automação de processos e trabalho com fluidez em ecossistemas diversos, incluindo C# e bancos de dados SQL Server e MongoDB. Encaro linguagens como ferramentas; meu foco real está em aplicar padrões de design e engenharia para entregar soluções que geram valor imediato.
                            </motion.p>
                        </div>

                        <motion.div variants={fadeInUp} className="pt-4">
                            <Link to="/projects" className="inline-block w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20 w-full sm:w-auto"
                                >
                                    Explorar Projetos
                                    <FaArrowRight />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

                        <div className="flex flex-col gap-6">
                            <motion.div
                                variants={fadeInUp}
                                className="bg-card/40 backdrop-blur-md border border-border/60 p-6 md:p-10 rounded-3xl shadow-xl"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                        <FaUserAstronaut className="text-2xl" />
                                    </div>
                                    <h4 className="text-xl font-bold text-foreground">Tech Stack & Info</h4>
                                </div>

                                <ul className="space-y-5">
                                    {PERSONAL_INFO.map((item, index) => (
                                        <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border/20 last:border-0 pb-4 last:pb-0 gap-2">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.1em]">{item.label}</span>
                                            <span className="text-sm md:text-base font-semibold text-foreground bg-secondary/30 px-3 py-1 rounded-lg border border-border/40">
                                                {item.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 p-6 rounded-2xl flex items-center gap-5"
                            >
                                <div className="p-4 bg-background rounded-xl border border-border shadow-inner text-primary">
                                    <FaGraduationCap size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-primary uppercase font-black tracking-[0.2em]">Formação Acadêmica</p>
                                    <p className="text-sm md:text-lg font-bold text-foreground">Análise e Des. de Sistemas</p>
                                    <p className="text-xs text-muted-foreground font-medium italic">Faculdade Impacta</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-24 pt-12 border-t border-border/40"
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