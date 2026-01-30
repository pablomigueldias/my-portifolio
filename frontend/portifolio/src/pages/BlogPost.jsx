import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';


import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import { RecentPostsWidget, TopicsWidget, NewsletterWidget } from '../components/ui/BlogWidgets';
import EmptyState from '../components/ui/EmptyState';
import { BLOG_POSTS, BLOG_TAGS, POST_CONTENT_MOCK } from '../data/blogData';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = BLOG_POSTS.find(p => p.id === Number(id));
        
        if (foundPost) {
            setPost({ ...foundPost, content: POST_CONTENT_MOCK });
        }
        
        window.scrollTo(0, 0);
    }, [id]);

    if (!post && id) {

         const exists = BLOG_POSTS.some(p => p.id === Number(id));
         if(!exists) return (
            <div className="pt-20 max-w-4xl mx-auto px-4">
                <EmptyState 
                    title="Artigo não encontrado" 
                    message="O artigo que você procura não existe ou foi removido."
                    actionLabel="Voltar ao Blog"
                    onAction={() => window.history.back()}
                />
            </div>
         );
    }

    if (!post) return null;

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

                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-border shadow-2xl shadow-primary/5 bg-muted relative z-0">
                            <img src={post.image} alt="Capa" className="w-full h-full object-cover" />
                        </div>

                        <MarkdownRenderer content={post.content} />

                    </motion.article>

                    <aside className="lg:col-span-4 space-y-8 mt-12 lg:mt-0">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <RecentPostsWidget posts={BLOG_POSTS.slice(0, 3)} />
                            <TopicsWidget tags={BLOG_TAGS} />
                            <NewsletterWidget />
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    );
};

export default BlogPost;