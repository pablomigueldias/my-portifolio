import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaTag, FaClock, FaSearch, FaFire, FaTimes } from 'react-icons/fa';

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
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    const categories = useMemo(() => {
        return ["Todas", ...new Set(BLOG_POSTS.map(post => post.category))];
    }, []);

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const recentPosts = BLOG_POSTS.slice(0, 3);

    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300 bg-background">
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
                        Artigos, tutoriais e notas de estudo sobre desenvolvimento de software.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <div className="lg:col-span-8">
                        {filteredPosts.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                key={selectedCategory + searchQuery}
                            >
                                <AnimatePresence mode='popLayout'>
                                    {filteredPosts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                                <p className="text-muted-foreground">Nenhum artigo encontrado para sua busca.</p>
                                <button 
                                    onClick={() => {setSearchQuery(""); setSelectedCategory("Todas")}}
                                    className="mt-4 text-primary font-bold hover:underline"
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        )}
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            
                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                                <h3 className="text-foreground font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <FaSearch className="text-primary" size={14} /> Buscar Artigo
                                </h3>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Ex: Docker, Python..."
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                                <h3 className="text-foreground font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <FaTag className="text-primary" size={14} /> Categorias
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                                selectedCategory === cat 
                                                ? "bg-primary text-primary-foreground border-primary" 
                                                : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Posts Recentes */}
                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                                <h3 className="text-foreground font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <FaFire className="text-primary" size={14} /> Em Destaque
                                </h3>
                                <div className="space-y-6">
                                    {recentPosts.map(post => (
                                        <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-4 group items-start">
                                            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                                                <img 
                                                    src={post.image} 
                                                    alt="" 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                                    {post.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground font-mono">
                                                    <FaCalendar size={8} /> {post.date}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

const BlogCard = ({ post }) => (
    <motion.article
        layout
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