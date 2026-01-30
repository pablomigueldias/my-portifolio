import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaLayerGroup } from 'react-icons/fa';

import ProjectCard from '../ui/ProjectCard';
import FilterButton from '../ui/FilterButton';
import { PROJECTS, FILTERS } from '../../data/projectsData';

const Portfolio = () => {
    const [filter, setFilter] = useState('todos');

    const filteredProjects = filter === 'todos'
        ? PROJECTS
        : PROJECTS.filter(project => project.category === filter);


    const displayProjects = filteredProjects.slice(0, 6);

    return (
        <section id="portfolio" className="py-20 border-b border-border bg-background transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">

                <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">

                    <div className="max-w-xl">
                        <span className="text-primary font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                            <FaLayerGroup /> Meu Trabalho
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                            Destaques
                        </h2>
                    </div>

                    <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 mask-gradient-right">
                        <div className="flex bg-muted/50 p-1 rounded-full border border-border backdrop-blur-sm whitespace-nowrap">
                            {FILTERS.map((f) => (
                                <FilterButton
                                    key={f.value}
                                    label={f.label}
                                    value={f.value}
                                    current={filter}
                                    setFilter={setFilter}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {displayProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <Link to="/projects">
                        <button className="text-muted-foreground hover:text-primary font-bold text-sm tracking-wider uppercase transition-colors flex items-center gap-2 mx-auto group">
                            Ver todos os projetos ({PROJECTS.length})
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default Portfolio;