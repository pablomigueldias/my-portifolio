import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    const [filter, setFilter] = useState('todos');

    const projects = [
        {
            id: 1,
            title: "WikiFans",
            category: "fullstack",
            image: "https://placehold.co/600x400/111/emerald?text=WikiFans",
            tech: ["React", "FastAPI", "PostgreSQL", "Render"],
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

    const filteredProjects = filter === 'todos'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="portfolio" className="py-20 border-b border-zinc-900">

            <div className="mb-12">
                <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
                    Meu Trabalho
                </span>
                <h2 className="text-4xl font-bold text-white mt-2 mb-6">
                    Projetos Recentes
                </h2>

                <div className="flex flex-wrap gap-4">
                    <FilterBtn label="Todos" value="todos" current={filter} setFilter={setFilter} />
                    <FilterBtn label="Full Stack" value="fullstack" current={filter} setFilter={setFilter} />
                    <FilterBtn label="Backend / API" value="backend" current={filter} setFilter={setFilter} />
                    <FilterBtn label="Frontend" value="frontend" current={filter} setFilter={setFilter} />
                    <FilterBtn label="Automação & IA" value="automacao" current={filter} setFilter={setFilter} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

        </section>
    );
};

const FilterBtn = ({ label, value, current, setFilter }) => (
    <button
        onClick={() => setFilter(value)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
      ${current === value
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/50'
                : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
            }
    `}
    >
        {label}
    </button>
);

const ProjectCard = ({ project }) => (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-900/10">

        <Link to={`/projeto/${project.id}`} className="block">
            <div className="relative h-48 overflow-hidden cursor-pointer">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-90"></div>

                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    {project.category}
                </div>
            </div>
        </Link>

        <div className="p-6">
            <Link to={`/projeto/${project.id}`} className="block w-fit">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                </h3>
            </Link>

            <p className="text-zinc-400 text-sm mb-4 line-clamp-3 min-h-[60px]">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] rounded hover:bg-zinc-700 transition-colors cursor-default">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                    <FaGithub /> Code
                </a>
                {project.deployLink && (
                    <a href={project.deployLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 text-sm font-medium transition-colors ml-auto">
                        Live Demo <FaExternalLinkAlt className="text-xs" />
                    </a>
                )}
            </div>
        </div>
    </div>
);

export default Portfolio;