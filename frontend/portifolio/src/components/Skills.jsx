import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const SKILLS_DATA = {
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

const Skills = () => {
  return (
    <section id="skills" className="py-20 border-b border-border bg-background transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Minhas Ferramentas
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            Skills Técnicas
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
            Um overview das tecnologias que utilizo diariamente para construir aplicações completas.
            Foco em código limpo e arquitetura escalável.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <SkillCategory title="Frontend Development" skills={SKILLS_DATA.frontend} delay={0.2} />
          <SkillCategory title="Backend & DevOps" skills={SKILLS_DATA.backend} delay={0.4} />
        </div>

      </div>
    </section>
  );
};


const SkillCategory = ({ title, skills, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: delay }}
  >
    <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
      <span className="text-primary">#</span> {title}
    </h3>
    <div className="space-y-8">
      {skills.map((skill, index) => (
        <SkillBar key={index} name={skill.name} percentage={skill.level} index={index} />
      ))}
    </div>
  </motion.div>
);

const SkillBar = ({ name, percentage, index }) => {

  const counterRef = useRef();
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const node = counterRef.current;
      
      const controls = animate(0, percentage, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value) + "%";
        }
      });

      return () => controls.stop();
    }
  }, [isInView, percentage]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">
          {name}
        </span>

        <span ref={counterRef} className="text-muted-foreground text-sm font-mono font-bold opacity-80">
          0%
        </span>
      </div>
      
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="h-full bg-primary rounded-full relative"
        >
          <div className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-[2px]"></div>
        </motion.div>

      </div>
    </div>
  );
};

export default Skills;