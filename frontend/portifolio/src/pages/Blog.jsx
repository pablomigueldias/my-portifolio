import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaTag, FaClock } from 'react-icons/fa';


const BLOG_POSTS = [
    {
        id: 1,
        title: "Como otimizar APIs com FastAPI e AsyncPG",
        excerpt: "Descubra como reduzir o tempo de resposta da sua API em até 50% usando banco de dados assíncrono e as ferramentas certas do Python.",
        category: "Backend",
        date: "28 Jan, 2026",
        readTime: "5 min",
        image: "https://placehold.co/800x400/111/emerald?text=FastAPI+Async",
        author: "Pablo"
    },
    {
        id: 2,
        title: "Docker para Desenvolvedores: Do Zero ao Deploy",
        excerpt: "Um guia prático para criar Dockerfiles eficientes para aplicações Python e React. Chega de 'na minha máquina funciona'.",
        category: "DevOps",
        date: "15 Jan, 2026",
        readTime: "8 min",
        image: "https://placehold.co/800x400/111/emerald?text=Docker+Guide",
        author: "Pablo"
    },
    {
        id: 3,
        title: "Entendendo o React useEffect de uma vez por todas",
        excerpt: "O ciclo de vida dos componentes explicado de forma simples. Evite loops infinitos e memory leaks nos seus projetos frontend.",
        category: "Frontend",
        date: "10 Jan, 2026",
        readTime: "4 min",
        image: "https://placehold.co/800x400/111/emerald?text=React+Hooks",
        author: "Pablo"
    },
    {
        id: 4,
        title: "Arquitetura Limpa em Python",
        excerpt: "Como estruturar seus projetos para que eles sejam fáceis de manter e escalar no longo prazo.",
        category: "Arquitetura",
        date: "05 Jan, 2026",
        readTime: "12 min",
        image: "https://placehold.co/800x400/111/emerald?text=Clean+Arch",
        author: "Pablo"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

const Blog = () => {
    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 mt-8 md:mb-16"
                >
                    <span className="text-primary font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Knowledge Base
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4 md:mb-6 text-foreground">
                        Blog Técnico
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
                        Artigos, tutoriais e notas de estudo sobre desenvolvimento de software,
                        focados em problemas reais e soluções escaláveis.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {BLOG_POSTS.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

const BlogCard = ({ post }) => (
    <motion.article
        variants={cardVariants}
        whileHover={{ y: -5 }}
        className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
    >
        <Link to={`/blog/${post.id}`} className="h-48 md:h-52 overflow-hidden relative block cursor-pointer">
            <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

            <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-md rounded-lg text-xs font-bold text-primary border border-border flex items-center gap-2 shadow-lg">
                <FaTag className="text-[10px]" />
                {post.category}
            </div>
        </Link>

        <div className="p-5 md:p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-mono">
                <span className="flex items-center gap-1.5"><FaCalendar className="text-primary" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><FaClock className="text-primary" /> {post.readTime}</span>
            </div>

            <Link to={`/blog/${post.id}`} className="block">
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                </h2>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
            </p>

            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <FaUser size={10} />
                    </div>
                    {post.author}
                </div>

                <Link to={`/blog/${post.id}`} className="text-primary text-sm font-bold flex items-center gap-2 group/link">
                    Ler Artigo
                    <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </motion.article>
);

export default Blog;