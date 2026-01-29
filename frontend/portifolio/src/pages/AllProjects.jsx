import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaArrowRight, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS_DATA = [
    {
        id: 1,
        title: "WikiFans FullStack",
        category: "fullstack",
        image: "https://placehold.co/600x400/111/emerald?text=WikiFans",
        tech: ["React", "FastAPI", "PostgreSQL"],
        description: "Wiki completa com autenticação e gestão de conteúdo. Arquitetura robusta.",
        githubLink: "#",
        deployLink: "#"
    },
    {
        id: 2,
        title: "Budget Manager",
        category: "fullstack",
        image: "https://placehold.co/600x400/111/emerald?text=Budget",
        tech: ["React", "Python", "SQLAlchemy"],
        description: "Sistema de controle financeiro pessoal com dashboards.",
        githubLink: "#",
        deployLink: "#"
    },
    {
        id: 3,
        title: "Todo App API",
        category: "backend",
        image: "https://placehold.co/600x400/111/emerald?text=Todo+API",
        tech: ["FastAPI", "JWT", "Docker"],
        description: "API Restful com documentação Swagger automática.",
        githubLink: "#",
        deployLink: null
    },
    {
        id: 4,
        title: "Jokenpo Pro",
        category: "frontend",
        image: "https://placehold.co/600x400/111/emerald?text=Jokenpo",
        tech: ["React", "Vite", "TailwindCSS"],
        description: "Jogo interativo com lógica de estado complexa.",
        githubLink: "#",
        deployLink: "#"
    },
    {
        id: 5,
        title: "AI Job Hunter",
        category: "automacao",
        image: "https://placehold.co/600x400/111/emerald?text=AI+Bot",
        tech: ["Python", "Selenium", "LLM"],
        description: "Bot de automação de candidaturas inteligente.",
        githubLink: "#",
        deployLink: null
    },
    {
        id: 6,
        title: "Linux Setup Scripts",
        category: "devops",
        image: "https://placehold.co/600x400/111/emerald?text=Bash+Scripts",
        tech: ["Bash", "Shell", "Linux"],
        description: "Scripts de automação para configuração de ambiente.",
        githubLink: "#",
        deployLink: null
    },
    {
        id: 7,
        title: "Python DSA",
        category: "backend",
        image: "https://placehold.co/600x400/111/emerald?text=Algorithms",
        tech: ["Python", "Unittest"],
        description: "Implementação de estruturas de dados e algoritmos.",
        githubLink: "#",
        deployLink: null
    }
];

const FILTERS = [
    { label: "Todos", value: "todos" },
    { label: "Full Stack", value: "fullstack" },
    { label: "Backend", value: "backend" },
    { label: "Frontend", value: "frontend" },
    { label: "DevOps", value: "devops" },
    { label: "Automação", value: "automacao" },
];


const AllProjects = () => {
    const [filter, setFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProjects = PROJECTS_DATA.filter(project => {
        const matchesCategory = filter === 'todos' || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-20 pt-8">

            <div className="mb-12 space-y-8">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                    <div>
                        <Link to="/" className="text-sm text-primary font-mono hover:underline flex items-center gap-2 mb-2">
                            <FaArrowRight className="rotate-180" /> Voltar para Home
                        </Link>
                        <h1 className="text-4xl font-bold text-foreground">Repositório de Projetos</h1>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-card p-4 rounded-2xl border border-border shadow-sm">

                    <div className="relative w-full lg:w-96 group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar projeto, tecnologia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <CompactProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <EmptyState reset={() => { setFilter('todos'); setSearchTerm('') }} />
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};

const FilterBtn = ({ label, value, current, setFilter }) => {
    const isActive = current === value;
    return (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border relative
                ${isActive
                    ? 'text-primary-foreground border-primary bg-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }
            `}
        >
            {label}
        </button>
    );
};

const CompactProjectCard = ({ project }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all group flex flex-col shadow-sm hover:shadow-lg hover:shadow-primary/5"
    >
        <Link to={`/projeto/${project.id}`} className="h-40 overflow-hidden relative cursor-pointer block">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />

            <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-md rounded text-[10px] font-mono text-primary border border-border font-bold uppercase shadow-sm">
                {project.category}
            </div>
        </Link>

        <div className="p-5 flex-1 flex flex-col">
            <Link to={`/projeto/${project.id}`} className="block">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
            </Link>
            <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">
                {project.description}
            </p>

            <div className="mt-auto">

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] px-2 py-1 bg-muted border border-border rounded text-muted-foreground font-medium">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border">
                    <a href={project.githubLink} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors">
                        <FaGithub /> GitHub
                    </a>
                    <Link to={`/projeto/${project.id}`} className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-1 transition-colors">
                        Detalhes <FaExternalLinkAlt className="text-[10px]" />
                    </Link>
                </div>
            </div>
        </div>
    </motion.div>
);

const EmptyState = ({ reset }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-card/50 border border-dashed border-border rounded-3xl"
    >
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
            <FaSearch className="text-2xl opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Nenhum projeto encontrado</h3>
        <p className="text-muted-foreground max-w-md mb-6">
            Não encontramos nada com esses termos. Tente buscar por tecnologias como "React" ou "Python".
        </p>
        <button
            onClick={reset}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
            Limpar Filtros
        </button>
    </motion.div>
);

export default AllProjects;