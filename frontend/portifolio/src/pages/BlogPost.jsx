import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaTag, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { RecentPostsWidget, TopicsWidget, NewsletterWidget } from '../components/ui/BlogWidgets';
import EmptyState from '../components/ui/EmptyState';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import { blogService } from '../services/api';

const BlogPost = () => {

    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const data = await blogService.getPostBySlug(slug);

                setPost({
                    ...data,
                    image: data.image_url,
                    date: new Date(data.create_at).toLocaleDateString('pt-BR'),
                    readTime: data.read_time
                });
            } catch (err) {
                console.error("Erro ao carregar o artigo:", err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
        window.scrollTo(0, 0);
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <FaSpinner className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="pt-20 max-w-4xl mx-auto px-4 bg-background min-h-screen">
                <EmptyState
                    title="Artigo não encontrado"
                    message="O artigo que você procura não existe ou foi removido."
                    actionLabel="Voltar ao Blog"
                    onAction={() => window.history.back()}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 pt-8 transition-colors duration-300 w-full overflow-hidden bg-background">

            <div className="max-w-7xl mx-auto mb-8 px-4">
                <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit font-medium group text-sm uppercase tracking-wider">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Blog
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-8 w-full min-w-0"
                    >
                        <header className="mb-10 text-center w-full">
                            <div className="flex justify-center mb-6">
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                                    <FaTag /> {post.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight break-words hyphens-auto">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground font-mono border-y border-border py-4 w-full mx-auto">
                                <span className="flex items-center gap-2"><FaCalendar className="text-primary" /> {post.date}</span>
                                <span className="flex items-center gap-2"><FaUser className="text-primary" /> {post.author}</span>
                                <span className="flex items-center gap-2"><FaClock className="text-primary" /> {post.readTime}</span>
                            </div>
                        </header>

                        {post.image && (
                            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-border shadow-2xl shadow-primary/5 bg-muted relative z-0">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="w-full">
                            <MarkdownRenderer content={post.content} />
                        </div>

                    </motion.article>
                    <aside className="lg:col-span-4 space-y-8 mt-12 lg:mt-0">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <TopicsWidget tags={["Banco de Dados", "Python"]} />
                            {/* <NewsletterWidget />*/}
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    );
};

export default BlogPost;