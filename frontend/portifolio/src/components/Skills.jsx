import React from 'react';

const Skills = () => {

  const skillsData = {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5 & Semantic CSS", level: 100 },
    ],
    backend: [
      { name: "Python", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "SQL / Database", level: 80 },
      { name: "Docker & Linux", level: 75 },
    ]
  };

  return (
    <section id="skills" className="py-20 border-b border-zinc-900">
      
      <div className="mb-12">
        <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">
          Minhas Ferramentas
        </span>
        <h2 className="text-4xl font-bold text-white mt-2">
          Skills Técnicas
        </h2>
        <p className="text-zinc-400 mt-4 max-w-2xl">
          Um overview das tecnologias que utilizo diariamente para construir aplicações completas.
          Foco em código limpo e arquitetura escalável.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-emerald-500">#</span> Frontend Development
          </h3>
          <div className="space-y-8">
            {skillsData.frontend.map((skill, index) => (
              <SkillBar key={index} name={skill.name} percentage={skill.level} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-emerald-500">#</span> Backend & DevOps
          </h3>
          <div className="space-y-8">
            {skillsData.backend.map((skill, index) => (
              <SkillBar key={index} name={skill.name} percentage={skill.level} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const SkillBar = ({ name, percentage }) => {
  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="text-zinc-300 font-medium group-hover:text-emerald-400 transition-colors">
          {name}
        </span>
        <span className="text-zinc-500 text-sm font-mono">
          {percentage}%
        </span>
      </div>
      
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">

        <div 
          className="h-full bg-emerald-600 rounded-full relative group-hover:bg-emerald-500 transition-colors duration-300"
          style={{ width: `${percentage}%` }}
        >
            
          <div className="absolute right-0 top-0 h-full w-2 bg-emerald-300/50 blur-[2px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Skills;