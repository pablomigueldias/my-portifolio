import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaLayerGroup } from 'react-icons/fa';
import DynamicIcon from './DynamicIcon';

export const TechStackWidget = ({ techs = [] }) => (
    <div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-foreground">
            <FaLayerGroup className="text-primary" /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
                <span
                    key={tech.id}
                    className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg border border-border flex items-center gap-2"
                >
                    {/* 1. Usamos tech.icon_key conforme descobrimos no banco */}
                    {/* 2. Fallback para 'Sicodesignal' ou similar da lib Si se o ícone falhar */}
                    <DynamicIcon
                        iconName={tech.icon_key || 'SiCodeforces'}
                        className="w-4 h-4 text-primary"
                    />
                    {/* 3. Renderizamos a string do nome, não o objeto */}
                    {tech.name}
                </span>
            ))}
        </div>
    </div>
);

export const ProjectActionsWidget = ({ githubLink, deployLink }) => (
    <div className="flex flex-col gap-4">
        <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-xl font-bold transition-all"
        >
            <FaGithub size={20} /> Ver Código
        </a>
        {deployLink && (
            <a
                href={deployLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1"
            >
                <FaExternalLinkAlt size={18} /> Acessar Projeto
            </a>
        )}
    </div>
);

export const ChallengeCard = ({ challenge, index }) => (
    <div className="flex gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors shadow-sm group">
        <span className="text-primary font-bold font-mono text-lg opacity-50 group-hover:opacity-100 transition-opacity">
            0{index + 1}
        </span>
        <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
            {challenge}
        </p>
    </div>
);