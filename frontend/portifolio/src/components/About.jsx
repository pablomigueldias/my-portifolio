import React from 'react';
import { FaCode, FaLaptopCode, FaRocket, FaDatabase } from 'react-icons/fa';

const About = () => {

  const personalInfo = [
    { label: 'Nome', value: 'Pablo' },
    { label: 'Residência', value: 'Brasil' },
    { label: 'Freelance', value: 'Disponível' },
    { label: 'Email', value: 'devpablo@gmail.com' },
    { label: 'Stack Principal', value: 'Python & React' },
    { label: 'Experiência', value: 'Full Stack' },
  ];

  const stats = [
    { id: 1, count: '30+', text: 'Projetos GitHub', icon: <FaCode /> },
    { id: 2, count: '240h', text: 'Horas Codando', icon: <FaLaptopCode /> },
    { id: 3, count: '100%', text: 'Entregas no Prazo', icon: <FaRocket /> },
    { id: 4, count: 'SQL', text: 'Database Expert', icon: <FaDatabase /> },
  ];

  return (
    <section id="about" className="py-20 border-b border-zinc-900">
      
      <div className="mb-12">
        <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
          Minha Biografia
        </span>
        <h2 className="text-4xl font-bold text-white mt-2">
          Sobre Mim
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-zinc-200">
            Desenvolvedor focado em <span className="text-emerald-500">Performance</span> e <span className="text-emerald-500">Design</span>
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            Olá! Eu sou um desenvolvedor apaixonado por construir sistemas robustos. 
            Comecei minha jornada explorando os fundamentos do 
            <strong className="text-zinc-200"> Linux</strong> e hoje crio soluções completas (Full Stack).
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Minha especialidade é unir a velocidade do <strong className="text-zinc-200">FastAPI (Python)</strong> no backend 
            com a interatividade do <strong className="text-zinc-200">React</strong> no frontend. 
            Atualmente estou focado em arquitetura de software, Docker e Git Flow profissional.
          </p>
          
          <button className="mt-4 px-6 py-3 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-colors uppercase text-sm font-bold tracking-wider">
            Ver meus repositórios
          </button>
        </div>

        <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800 hover:border-emerald-500/30 transition-colors duration-500">
          <ul className="space-y-4">
            {personalInfo.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
                <span className="text-zinc-500 font-medium">{item.label}</span>
                <span className="text-zinc-200 font-semibold text-right">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {stats.map((stat) => (
          <div key={stat.id} className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="text-3xl text-zinc-600 mb-3 group-hover:text-emerald-500 transition-colors">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.count}</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider font-medium">{stat.text}</div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default About;