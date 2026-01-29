import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaLayerGroup } from 'react-icons/fa';

const ProjectDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = {
    title: "WikiFans FullStack",
    category: "Full Stack Web App",
    description: "Uma plataforma completa de Wiki onde fãs podem criar e editar artigos. O desafio principal foi gerenciar o estado global de autenticação e garantir que o conteúdo fosse renderizado markdown em tempo real.",
    image: "https://placehold.co/1200x600/111/emerald?text=WikiFans+Dashboard",
    techs: ["React", "FastAPI", "PostgreSQL", "Docker", "Render", "Vercel"],
    challenges: [
      "Implementar autenticação JWT segura entre domínios diferentes (Frontend na Vercel, Backend no Render).",
      "Otimizar as queries do SQLAlchemy para evitar o problema N+1 ao carregar artigos.",
      "Criar um sistema de cache no frontend para reduzir chamadas à API."
    ],
    github: "#",
    deploy: "#"
  };

  return (
    <div className="text-white min-h-screen pb-20">
      
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors w-fit">
          <FaArrowLeft /> Voltar para Home
        </Link>
      </div>

      <div className="relative h-[40vh] w-full rounded-3xl overflow-hidden mb-12 border border-zinc-800">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
        <div className="absolute bottom-8 left-8">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-mono uppercase tracking-wider mb-3 inline-block">
                {project.category}
            </span>
            <h1 className="text-5xl font-bold">{project.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Sobre o Projeto</h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                    {project.description}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Desafios Técnicos & Soluções</h2>
                <ul className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                            <span className="text-emerald-500 font-bold font-mono">0{index + 1}.</span>
                            <span className="text-zinc-300">{challenge}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>

        <div className="space-y-8">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FaLayerGroup className="text-emerald-500"/> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full border border-zinc-700">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <a href={project.github} className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-800 hover:bg-white hover:text-black text-white rounded-xl font-bold transition-all">
                    <FaGithub size={20} /> Ver Código
                </a>
                <a href={project.deploy} className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
                    <FaExternalLinkAlt size={18} /> Acessar Projeto
                </a>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;