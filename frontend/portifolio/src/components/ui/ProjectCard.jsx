import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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

export default ProjectCard;