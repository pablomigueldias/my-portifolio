import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaTag, FaClock } from 'react-icons/fa';
import { fadeInUp } from '../../utils/animations';

const BlogCard = ({ post }) => {

    if (!post) return null;

    return (
        <motion.article
            layout
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 h-full"
        >
            <Link to={`/blog/${post.slug}`} className="h-48 md:h-52 overflow-hidden relative block cursor-pointer shrink-0">
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

                    <Link to={`/blog/${post.slug}`} className="text-primary text-sm font-bold flex items-center gap-2 group/link">
                        Ler Artigo
                        <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export default BlogCard;