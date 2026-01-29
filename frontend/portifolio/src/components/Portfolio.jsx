import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
    {
        id: 1,
        title: "WikiFans",
        category: "fullstack",
        image: "https://placehold.co/600x400/111/emerald?text=WikiFans",
        tech: ["React", "FastAPI", "PostgreSQL", "Render", "Docker", "Redis"],
        description: "Wiki completa com autenticação e gestão de conteúdo. Frontend na Vercel e Backend no Render.",
        githubLink: "#",
        deployLink: "#"
    },
    {
        id: 2,
        title: "Budget Manager",
        category: "fullstack",
        image: "https://placehold.co/600x400/111/emerald?text=Budget+Manager",
        tech: ["React", "Python", "SQLAlchemy", "Chart.js"],
        description: "Sistema de controle financeiro pessoal com dashboards visuais e banco de dados relacional.",
        githubLink: "#",
        deployLink: "#"
    },
    {
        id: 3,
        title: "Todo App API",
        category: "backend",
        image: "https://placehold.co/600x400/111/emerald?text=Todo+API",
        tech: ["FastAPI", "JWT Auth", "Alembic", "Docker"],
        description: "Backend robusto com autenticação JWT segura, migrações de banco e rotas documentadas (Swagger).",
        githubLink: "#",
        deployLink: null
    },
    {
        id: 4,
        title: "Jokenpo Pro",
        category: "frontend",
        image: "https://placehold.co/600x400/111/emerald?text=Jokenpo",
        tech: ["React", "Vite", "TailwindCSS", "Game Logic"],
        description: "Jogo interativo Pedra, Papel e Tesoura com gerenciamento de estado complexo e animações.",
        githubLink: "#",
        deployLink: "#"
    },
    {
        id: 5,
        title: "AI Job Hunter",
        category: "automacao",
        image: "https://placehold.co/600x400/111/emerald?text=AI+Bot",
        tech: ["Python", "Selenium", "Ollama LLM", "Web Scraping"],
        description: "Bot inteligente que busca vagas e preenche formulários automaticamente usando IA local.",
        githubLink: "#",
        deployLink: null
    }
];

const FILTERS = [
    { label: "Todos", value: "todos" },
    { label: "Full Stack", value: "fullstack" },
    { label: "Backend", value: "backend" },
    { label: "Frontend", value: "frontend" },
    { label: "Automação", value: "automacao" },
];

const Portfolio = () => {
    const [filter, setFilter] = useState('todos');

    const filteredProjects = filter === 'todos'
        ? PROJECTS
        : PROJECTS.filter(project => project.category === filter);

    return (
        <section id="portfolio" className="py-20 border-b border-border bg-background transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4">

                <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="max-w-xl">
                        <span className="text-primary font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                            <FaLayerGroup /> Meu Trabalho
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                            Projetos Recentes
                        </h2>
                    </div>

                    <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 mask-gradient-right">
                        <div className="flex bg-muted/50 p-1 rounded-full border border-border backdrop-blur-sm whitespace-nowrap">
                            {FILTERS.map((f) => (
                                <FilterBtn
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
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <Link to="/projects">
                        <button className="text-muted-foreground hover:text-primary font-bold text-sm tracking-wider uppercase transition-colors flex items-center gap-2 mx-auto group">
                            Ver arquivo completo
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

const FilterBtn = ({ label, value, current, setFilter }) => {
    const isActive = current === value;

    return (
        <button
            onClick={() => setFilter(value)}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors z-10 flex-shrink-0
            ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
            {isActive && (
                <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md shadow-primary/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            {label}
        </button>
    );
};

const ProjectCard = ({ project }) => {
    const MAX_TAGS = 3;
    const showMoreTags = project.tech.length > MAX_TAGS;
    const displayedTags = project.tech.slice(0, MAX_TAGS);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full"
        >
            <Link to={`/projeto/${project.id}`} className="block relative h-48 overflow-hidden cursor-pointer flex-shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-mono text-emerald-400 uppercase tracking-wider shadow-lg font-bold">
                    {project.category}
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <Link to={`/projeto/${project.id}`} className="block w-fit">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                </Link>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 min-h-[60px]">
                    {project.description}
                </p>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {displayedTags.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-medium rounded border border-border">
                                {tech}
                            </span>
                        ))}
                        {showMoreTags && (
                            <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-[10px] rounded border border-border/50">
                                +{project.tech.length - MAX_TAGS}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider transition-colors">
                            <FaGithub size={14} /> Code
                        </a>
                        {project.deployLink && (
                            <a href={project.deployLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors ml-auto">
                                Live Demo <FaExternalLinkAlt size={12} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Portfolio;