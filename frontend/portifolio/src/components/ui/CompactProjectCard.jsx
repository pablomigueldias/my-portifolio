import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const CompactProjectCard = ({ project }) => {
    if (!project) return null;

    // Destructuring adaptado para o padrão do Banco de Dados (Snake Case)
    const {
        id,
        title = "Projeto Sem Título",
        category = "Geral",
        image_url = "https://placehold.co/600x400?text=No+Image",
        short_description = "",
        technologies = [], // Agora é um Array de Objetos [{name: "React", ...}]
        github_link = "#",
        deploy_link
    } = project;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all group flex flex-col shadow-sm hover:shadow-lg hover:shadow-primary/5"
        >
            <Link to={`/projeto/${id}`} className="h-40 overflow-hidden relative cursor-pointer block">
                <img
                    src={image_url}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-md rounded text-[10px] font-mono text-primary border border-border font-bold uppercase shadow-sm">
                    {category}
                </div>
            </Link>

            <div className="p-5 flex-1 flex flex-col">
                <Link to={`/projeto/${id}`} className="block">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>
                <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">
                    {short_description}
                </p>

                <div className="mt-auto">

                    {/* Renderização das Tecnologias (Acessando t.name) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-muted border border-border rounded text-muted-foreground font-medium">
                                {tech.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-border">
                        <a href={github_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors">
                            <FaGithub /> GitHub
                        </a>

                        {deploy_link ? (
                            <a href={deploy_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-1 transition-colors">
                                Live Demo <FaExternalLinkAlt className="text-[10px]" />
                            </a>
                        ) : (
                            <Link to={`/projeto/${id}`} className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-1 transition-colors">
                                Detalhes <FaArrowRight className="text-[10px]" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CompactProjectCard;