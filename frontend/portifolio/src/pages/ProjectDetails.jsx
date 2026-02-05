import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTools, FaSpinner } from 'react-icons/fa';

import EmptyState from '../components/ui/EmptyState';
import { TechStackWidget, ProjectActionsWidget, ChallengeCard } from '../components/ui/ProjectWidgets';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { portfolioService } from '../services/api.js';

const ProjectDetails = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


   useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
    try {
        setIsLoading(true);
        const data = await portfolioService.getProjects(); 
        
        const foundProject = data.find(p => p.id === parseInt(id));

        if (!foundProject) {
            setError("Projeto não encontrado.");
        } else {
            setProject(foundProject);
        }
        
    } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        setError("Não foi possível carregar os projetos.");
    } finally {
        setIsLoading(false);
    }
};

    fetchProjects();
}, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-muted-foreground">
                <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
                <p>Carregando detalhes do projeto...</p>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <EmptyState
                    title="Projeto não encontrado"
                    message={error || "O projeto que você está tentando acessar não existe ou foi removido."}
                    actionLabel="Voltar para Projetos"
                    onAction={() => window.history.back()}
                />
            </div>
        );
    }

    const challenges = project.challenges || [];
    const description = project.long_description || project.short_description;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="min-h-screen pb-20 pt-8 transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto px-4 mb-6">
                <Link to="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit group text-sm font-bold uppercase tracking-wide">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar para Projetos
                </Link>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    variants={fadeInUp}
                    className="relative h-[40vh] md:h-[50vh] w-full rounded-3xl overflow-hidden mb-12 border border-border shadow-2xl shadow-primary/10"
                >
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl pr-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 backdrop-blur-md rounded-lg text-[10px] md:text-xs font-mono uppercase tracking-wider mb-4 inline-block font-bold">
                            {project.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                            {project.title}
                        </h1>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Visão Geral
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-lg text-justify whitespace-pre-line">
                            {description}
                        </p>
                    </motion.section>

                    {challenges.length > 0 && (
                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                <FaTools className="text-primary" />
                                Desafios & Soluções
                            </h2>
                            <div className="grid gap-4">
                                {challenges.map((challengeObj, index) => (
                                    <ChallengeCard key={index} challenge={challengeObj.description} index={index} />
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>

                <motion.div
                    variants={fadeInUp}
                    className="space-y-8 lg:sticky lg:top-24 h-fit"
                >
                    <TechStackWidget techs={project.technologies} />
                    <ProjectActionsWidget
                        githubLink={project.github_link}
                        deployLink={project.deploy_link}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProjectDetails;