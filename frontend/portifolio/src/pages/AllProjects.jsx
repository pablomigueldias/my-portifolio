import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllProjects = () => {
    const [filter, setFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allProjects = [
        {
            id: 1,
            title: "WikiFans FullStack",
            category: "fullstack",
            image: "https://placehold.co/600x400/111/emerald?text=WikiFans",
            tech: ["React", "FastAPI", "PostgreSQL"],
            description: "Wiki completa com autenticação e gestão de conteúdo.",
            githubLink: "#",
            deployLink: "#"
        },
        {
            id: 2,
            title: "Budget Manager",
            category: "fullstack",
            image: "https://placehold.co/600x400/111/emerald?text=Budget",
            tech: ["React", "Python", "SQLAlchemy"],
            description: "Sistema de controle financeiro pessoal.",
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
            description: "Bot de automação de candidaturas.",
            githubLink: "#",
            deployLink: null
        },
        {
            id: 6,
            title: "Linux Setup Scripts",
            category: "devops",
            image: "https://placehold.co/600x400/111/emerald?text=Bash+Scripts",
            tech: ["Bash", "Shell", "Linux"],
            description: "Scripts de automação para configuração de ambiente Linux Mint.",
            githubLink: "#",
            deployLink: null
        },
        {
            id: 7,
            title: "Python Data Structures",
            category: "backend",
            image: "https://placehold.co/600x400/111/emerald?text=Algorithms",
            tech: ["Python", "Unittest"],
            description: "Implementação de estruturas de dados e algoritmos fundamentais.",
            githubLink: "#",
            deployLink: null
        }
    ];

    const filteredProjects = allProjects.filter(project => {
        const matchesCategory = filter === 'todos' || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="text-white min-h-screen pb-20">

            <div className="mb-12 mt-8">
                <h1 className="text-4xl font-bold mb-6">Todos os Projetos</h1>

                <div className="flex flex-col md:flex-row gap-6 justify-between items-end md:items-center">

                    <div className="relative w-full md:w-96 group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou tecnologia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <FilterBtn label="Todos" value="todos" current={filter} setFilter={setFilter} />
                        <FilterBtn label="Full Stack" value="fullstack" current={filter} setFilter={setFilter} />
                        <FilterBtn label="Backend" value="backend" current={filter} setFilter={setFilter} />
                        <FilterBtn label="Frontend" value="frontend" current={filter} setFilter={setFilter} />
                        <FilterBtn label="DevOps/Scripts" value="devops" current={filter} setFilter={setFilter} />
                    </div>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <CompactProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-zinc-500">
                    <p className="text-xl">Nenhum projeto encontrado para essa busca.</p>
                    <button onClick={() => { setFilter('todos'); setSearchTerm('') }} className="mt-4 text-emerald-500 hover:underline">
                        Limpar filtros
                    </button>
                </div>
            )}

        </div>
    );
};

const FilterBtn = ({ label, value, current, setFilter }) => (
    <button
        onClick={() => setFilter(value)}
        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border
      ${current === value
                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50'
                : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
            }
    `}
    >
        {label}
    </button>
);

const CompactProjectCard = ({ project }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all group flex flex-col">
        <Link to={`/projeto/${project.id}`} className="h-40 overflow-hidden relative cursor-pointer block">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-[10px] font-mono text-emerald-400 border border-white/10">
                {project.category}
            </div>
        </Link>

        <div className="p-5 flex-1 flex flex-col">
            <Link to={`/projeto/${project.id}`} className="block">
                <h3 className="text-lg font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
            </Link>
            <p className="text-zinc-500 text-xs mb-4 line-clamp-2">{project.description}</p>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-zinc-400">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-zinc-800/50">
                    <a href={project.githubLink} className="text-zinc-400 hover:text-white text-xs flex items-center gap-1"><FaGithub /> GitHub</a>
                    <Link to={`/projeto/${project.id}`} className="text-emerald-500 hover:text-emerald-400 text-xs font-bold flex items-center gap-1">
                        Detalhes <FaExternalLinkAlt className="text-[10px]" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default AllProjects;