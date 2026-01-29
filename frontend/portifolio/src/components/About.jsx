import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { FaCode, FaLaptopCode, FaRocket, FaDatabase, FaArrowRight } from 'react-icons/fa';

const PERSONAL_INFO = [
  { label: 'Nome', value: 'Pablo Ortiz' },
  { label: 'Residência', value: 'Brasil' },
  { label: 'Freelance', value: 'Disponível' },
  { label: 'Email', value: 'devpablo@gmail.com' },
  { label: 'Stack', value: 'Python & React' },
  { label: 'Nível', value: 'Full Stack' },
];

const STATS = [
  { id: 1, value: 30, suffix: '+', text: 'Projetos GitHub', icon: FaCode },
  { id: 2, value: 240, suffix: 'h', text: 'Horas Codando', icon: FaLaptopCode },
  { id: 3, value: 100, suffix: '%', text: 'Entregas no Prazo', icon: FaRocket },
  { id: 4, value: 0, suffix: 'SQL', text: 'Database Expert', icon: FaDatabase, isText: true },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-border bg-background transition-colors duration-300 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16"
        >
          <span className="text-primary font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-[1px] bg-primary"></span> Minha Biografia
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4">
            Sobre Mim
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6 text-base md:text-lg"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground/90 leading-tight">
              Desenvolvedor focado em <span className="text-primary">Performance</span>, <span className="text-primary">Arquitetura</span> e Design.
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              Olá! Eu sou um desenvolvedor apaixonado por construir sistemas robustos.
              Comecei minha jornada explorando os fundamentos do
              <strong className="text-foreground"> Linux</strong> e hoje crio soluções completas (Full Stack).
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Minha especialidade é unir a velocidade do <strong className="text-foreground">FastAPI (Python)</strong> no backend
              com a interatividade do <strong className="text-foreground">React</strong> no frontend.
              Atualmente estou focado em arquitetura de software, Docker e Git Flow profissional.
            </p>

            <div className="pt-4">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Ver Repositórios
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ul className="space-y-4">
              {PERSONAL_INFO.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm md:text-base text-muted-foreground font-medium">{item.label}</span>
                  <span className="text-sm md:text-base text-foreground font-bold text-right font-mono">{item.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

const Counter = ({ from = 0, to, suffix }) => {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.floor(value);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to]);

  return (
    <span className="flex items-baseline justify-center">
      <span ref={nodeRef}>{from}</span>
      <span>{suffix}</span>
    </span>
  );
};

const StatCard = ({ value, suffix, text, icon: Icon, isText }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, borderColor: "rgba(var(--primary), 0.5)" }}
      className="p-4 md:p-6 bg-card rounded-xl border border-border transition-all duration-300 group shadow-sm hover:shadow-lg flex flex-col items-center text-center"
    >
      <div className="text-2xl md:text-3xl text-muted-foreground mb-3 group-hover:text-primary transition-colors transform group-hover:scale-110 duration-300">
        <Icon />
      </div>

      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 font-mono">
        {isText ? (
          <span>{suffix}</span>
        ) : (
          <Counter to={value} suffix={suffix} />
        )}
      </div>

      <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-80 mt-1">
        {text}
      </div>
    </motion.div>
  );
};

export default About;