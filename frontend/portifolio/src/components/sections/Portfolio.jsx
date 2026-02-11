import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { portfolioService } from '../../services/api'; // Importe o service

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await portfolioService.getProjects();
                // Pega apenas os 3 ou 6 primeiros para a Home
                setProjects(data.slice(0, 6));
            } catch (error) {
                console.error("Erro ao carregar projetos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (isLoading) {
        return (
            <section id="portfolio" className="py-20 px-6 bg-secondary/30 flex justify-center">
                <FaSpinner className="animate-spin text-4xl text-primary" />
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-20 px-6 bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                {/* Cabeçalho da Seção */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                        Projetos <span className="text-primary">Recentes</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Uma seleção dos trabalhos que desenvolvi, aplicando tecnologias modernas para resolver problemas reais.
                    </p>
                </div>

                {/* Grid de Projetos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">

                            {/* Imagem */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image_url || "https://via.placeholder.com/400x300?text=Sem+Imagem"}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                    {project.github_link && (
                                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                            <FaGithub size={20} />
                                        </a>
                                    )}
                                    {project.deploy_link && (
                                        <a href={project.deploy_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform">
                                            <FaExternalLinkAlt size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                    {project.short_description}
                                </p>

                                {/* Tecnologias (Pequenos ícones ou texto) */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies?.slice(0, 3).map(tech => (
                                        <span key={tech.id} className="text-[10px] bg-secondary px-2 py-1 rounded text-muted-foreground border border-border">
                                            {tech.name}
                                        </span>
                                    ))}
                                    {project.technologies?.length > 3 && (
                                        <span className="text-[10px] text-muted-foreground self-center">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    to={`/projeto/${project.id}`}
                                    className="w-full text-center py-3 rounded-xl font-bold border border-border hover:bg-primary hover:text-white hover:border-primary transition-all mt-auto"
                                >
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botão Ver Todos */}
                <div className="text-center mt-12">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors border-b-2 border-primary/20 hover:border-primary pb-1"
                    >
                        Ver todos os projetos <FaExternalLinkAlt size={12} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;