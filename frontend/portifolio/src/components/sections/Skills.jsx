import React from 'react';
import { motion } from 'framer-motion';

import SectionTitle from '../ui/SectionTitle';
import SkillBar from '../ui/SkillBar';
import { SKILLS_DATA } from '../../data/skillsData';
import { fadeInUp } from '../../utils/animations';

const Skills = () => {
  return (
    <section id="skills" className="py-20 border-b border-border bg-background transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-12">
          <SectionTitle subtitle="Minhas Ferramentas" title="Skills Técnicas" />

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-muted-foreground -mt-8 md:-mt-10 max-w-2xl text-lg"
          >
            Um overview das tecnologias que utilizo diariamente para construir aplicações completas.
            Foco em código limpo e arquitetura escalável.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <SkillCategory
            title="Frontend Development"
            skills={SKILLS_DATA.frontend}
            delay={0.2}
          />
          <SkillCategory
            title="Backend & DevOps"
            skills={SKILLS_DATA.backend}
            delay={0.4}
          />
          <SkillCategory
            title="Infraestrutura"
            skills={SKILLS_DATA.infrastructure}
            delay={0.4}
          />
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
        <SkillBar key={index} name={skill.name} percentage={skill.level} />
      ))}
    </div>
  </motion.div>
);

export default Skills;