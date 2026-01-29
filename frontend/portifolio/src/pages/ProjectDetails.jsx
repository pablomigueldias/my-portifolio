import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaLayerGroup, FaTools } from 'react-icons/fa';

const PROJECTS_DB = [
  {
    id: 1,
    title: "WikiFans FullStack",
    category: "Full Stack Web App",
    description: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo markdown fosse renderizado e sanitizado em tempo real para evitar XSS.",
    image: "https://placehold.co/1200x600/111/emerald?text=WikiFans+Dashboard",
    techs: ["React", "FastAPI", "PostgreSQL", "Docker", "Render", "Vercel"],
    challenges: [
      "Implementar autenticação JWT segura com Refresh Tokens entre domínios diferentes (CORS).",
      "Otimizar as queries do SQLAlchemy (Eager Loading) para reduzir o tempo de resposta em 40%.",
      "Criar um sistema de cache no frontend (React Query) para evitar chamadas redundantes."
    ],
    github: "https://github.com",
    deploy: "https://vercel.com"
  },
  {
    id: 2,
    title: "Budget Manager",
    category: "Fintech Dashboard",
    description: "Sistema de controle financeiro pessoal. Permite categorização de gastos, gráficos mensais e exportação de relatórios.",
    image: "https://placehold.co/1200x600/111/emerald?text=Budget+Manager",
    techs: ["React", "Python", "SQLAlchemy", "Chart.js"],
    challenges: [
      "Modelagem de banco de dados complexa para lidar com recorrência de despesas.",
      "Renderização de gráficos pesados sem travar a thread principal do navegador."
    ],
    github: "#",
    deploy: "#"
  },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ProjectDetails = () => {
  const { id } = useParams();
  
  const project = PROJECTS_DB.find(p => p.id === parseInt(id));


  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">Projeto não encontrado.</h2>
        <Link to="/projects" className="text-primary hover:underline flex items-center gap-2">
            <FaArrowLeft /> Voltar para lista
        </Link>
      </div>
    );
  }

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
                src={project.image} 
                alt={project.title} 
                fetchPriority="high"
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
                <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                    {project.description}
                </p>
            </motion.section>

            <motion.section variants={fadeInUp}>
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                     <FaTools className="text-primary" />
                     Desafios & Soluções
                </h2>
                <div className="grid gap-4">
                    {project.challenges.map((challenge, index) => (
                        <div key={index} className="flex gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors shadow-sm group">
                            <span className="text-primary font-bold font-mono text-lg opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                            <p className="text-muted-foreground group-hover:text-foreground transition-colors">{challenge}</p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>

        <motion.div 
            variants={fadeInUp}
            className="space-y-8 lg:sticky lg:top-8 h-fit"
        >
            <div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-foreground">
                    <FaLayerGroup className="text-primary"/> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg border border-border">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-xl font-bold transition-all"
                >
                    <FaGithub size={20} /> Ver Código
                </a>
                <a 
                    href={project.deploy} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1"
                >
                    <FaExternalLinkAlt size={18} /> Acessar Projeto
                </a>
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectDetails;