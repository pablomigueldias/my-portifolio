import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLayerGroup, FaLock, FaClock, FaArrowRight, FaPalette } from 'react-icons/fa';

const UPCOMING_TEMPLATES = [
    {
        id: 1,
        name: "SaaS Dashboard Pro",
        category: "Admin Panel",
        color: "from-blue-500/20 to-cyan-400/20",
        progress: 75
    },
    {
        id: 2,
        name: "E-commerce Starter",
        category: "Shopify Headless",
        color: "from-purple-500/20 to-pink-500/20",
        progress: 40
    },
    {
        id: 3,
        name: "Landing Page V1",
        category: "Marketing Kit",
        color: "from-orange-500/20 to-red-500/20",
        progress: 90
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const TemplatesGallery = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 mt-8"
                >
                    <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                        <FaLayerGroup /> Assets & UI Kits
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
                        Galeria de Templates
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        Componentes profissionais e layouts completos prontos para produção.
                        Desenvolvidos com foco em performance, acessibilidade e design system escalável.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {UPCOMING_TEMPLATES.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="relative group p-1 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >

                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>

                            <div className="bg-card/95 backdrop-blur-sm p-8 rounded-xl h-full flex flex-col items-center justify-center text-center space-y-6 relative z-10 border border-border/50">

                                <div className="absolute top-4 right-4 px-3 py-1 bg-muted border border-border rounded-full flex items-center gap-2">
                                    <FaClock className="text-primary text-xs animate-pulse" />
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Em Breve</span>
                                </div>

                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-2 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 shadow-inner">
                                    <FaLock size={28} />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider bg-muted px-2 py-1 rounded inline-block">
                                        {item.category}
                                    </p>
                                </div>

                                <div className="w-full pt-4">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                                        <span>Progresso</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.progress}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-primary rounded-full relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </motion.div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-card border border-border rounded-3xl text-center relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary rotate-3 group-hover:rotate-6 transition-transform">
                            <FaPalette size={32} />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Precisa de um template exclusivo?</h3>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                            Estou aceitando encomendas para Design Systems, Dashboards Corporativos e Landing Pages de alta conversão.
                        </p>

                        <Link to="/contact">
                            <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                                Solicitar Orçamento <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TemplatesGallery;