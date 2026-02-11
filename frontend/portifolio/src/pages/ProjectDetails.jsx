import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTools, FaSpinner, FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { portfolioService } from '../services/api.js';
import TechIcon from '../components/ui/TechIcon'


const TechStackWidget = ({ techs }) => (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            Stack Tecnológica
        </h3>
        {(!techs || techs.length === 0) ? (
            <p className="text-sm text-muted-foreground">Nenhuma tecnologia listada.</p>
        ) : (
            <div className="flex flex-wrap gap-3">
                {techs.map(tech => (
                    <div
                        key={tech.id || tech.name}
                        className="group flex items-center gap-2 bg-secondary/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all px-4 py-2 rounded-xl"
                    >

                        <TechIcon
                            iconName={tech.icon_key}
                            className={`text-lg ${tech.color_class ? '' : 'text-primary'}`}
                        />

                        <span className={`text-sm font-medium ${tech.color_class || 'text-foreground'}`}>
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const ProjectActionsWidget = ({ githubLink, deployLink }) => (
    <div className="flex flex-col gap-3">
        {githubLink && (
            <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                <FaGithub /> Repositório
            </a>
        )}
        {deployLink && (
            <a href={deployLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                <FaExternalLinkAlt /> Ver Projeto Online
            </a>
        )}
    </div>
);

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

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
                try {
                    const specificData = await portfolioService.getProjectById(id);
                    if (specificData) {
                        setProject(specificData);
                        return;
                    }
                } catch (e) {
                }

                const data = await portfolioService.getProjects();

                const foundProject = data.find(p =>
                    String(p.id) === String(id) || p.slug === id
                );

                if (!foundProject) {
                    setError("Projeto não encontrado.");
                } else {
                    setProject(foundProject);
                }

            } catch (err) {
                console.error("Erro ao buscar projetos:", err);
                setError("Não foi possível carregar os detalhes.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-muted-foreground">
                <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
                <p>Carregando...</p>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Projeto não encontrado</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Link to="/" className="text-primary hover:underline font-bold">Voltar para Home</Link>
            </div>
        );
    }

    const challenges = project.challenges || [];
    const description = project.long_description || project.short_description || "Sem descrição disponível.";
    const techs = project.technologies || [];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="min-h-screen pb-20 pt-24 transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto px-6 mb-8">
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit group text-sm font-bold uppercase tracking-wide">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar
                </Link>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    variants={fadeInUp}
                    className="relative h-[40vh] md:h-[50vh] w-full rounded-3xl overflow-hidden mb-12 border border-border shadow-2xl shadow-primary/10"
                >
                    <img
                        src={project.image_url || "https://via.placeholder.com/1200x600"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>

                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl pr-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 backdrop-blur-md rounded-lg text-[10px] md:text-xs font-mono uppercase tracking-wider mb-4 inline-block font-bold">
                            {project.category || "Geral"}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight drop-shadow-md">
                            {project.title}
                        </h1>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

                <div className="lg:col-span-2 space-y-12">
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Sobre o Projeto
                        </h2>
                        <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                            {description}
                        </div>
                    </motion.section>

                    {challenges.length > 0 && (
                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                <FaTools className="text-primary" />
                                Desafios & Soluções
                            </h2>
                            <div className="grid gap-4">
                                {challenges.map((challengeObj, index) => (
                                    <div key={index} className="bg-card border border-border p-4 rounded-xl flex gap-3">
                                        <FaCheckCircle className="text-primary mt-1 shrink-0" />
                                        <p className="text-muted-foreground text-sm">{challengeObj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>

                <motion.div
                    variants={fadeInUp}
                    className="space-y-8 lg:sticky lg:top-24 h-fit"
                >
                    <TechStackWidget techs={techs} />
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