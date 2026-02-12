import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTag, FaTimes, FaSpinner } from 'react-icons/fa';

import BlogCard from '../components/ui/BlogCard';
import EmptyState from '../components/ui/EmptyState';
import SectionTitle from '../components/ui/SectionTitle';
import { RecentPostsWidget } from '../components/ui/BlogWidgets';

import { blogService } from '../services/api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const data = await blogService.getAllPosts();

                const formattedPosts = data.map(post => ({
                    ...post,
                    image: post.image_url,
                    date: new Date(post.create_at).toLocaleDateString('pt-BR'), // 
                    readTime: post.read_time
                }));

                setPosts(formattedPosts);
            } catch (err) {
                console.error("Erro na API:", err);
                setError("Falha ao carregar os artigos. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const categories = useMemo(() => {
        return ["Todas", ...new Set(posts.map(post => post.category))];
    }, [posts]);

    const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory;

    const isPublished = post.published === true;
    
    return matchesSearch && matchesCategory && isPublished; 
});

    const recentPosts = posts.slice(0, 3);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <FaSpinner className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-20 px-4 bg-background">
                <EmptyState title="Oops!" message={error} actionLabel="Tentar novamente" onAction={() => window.location.reload()} />
            </div>
        );
    }

    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300 bg-background">
            <div className="max-w-6xl mx-auto px-4">

                <div className="mt-8">
                    <SectionTitle subtitle="Knowledge Base" title="Blog Técnico" />
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed -mt-10 mb-12">
                        Artigos, tutoriais e notas de estudo sobre desenvolvimento de software.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="lg:col-span-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredPosts.length > 0 ? (
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                    layout
                                >
                                    {filteredPosts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </motion.div>
                            ) : (
                                <EmptyState
                                    title="Nenhum artigo encontrado"
                                    message={`Não encontramos artigos para "${searchQuery}" em "${selectedCategory}".`}
                                    actionLabel="Limpar busca"
                                    onAction={() => { setSearchQuery(""); setSelectedCategory("Todas") }}
                                />
                            )}
                        </AnimatePresence>
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
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
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
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedCategory === cat
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <RecentPostsWidget posts={recentPosts} />

                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Blog;