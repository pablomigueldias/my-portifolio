import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaCalendar, FaHashtag, FaChevronRight } from 'react-icons/fa';

export const RecentPostsWidget = ({ posts }) => (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-foreground font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
            <FaFire className="text-primary" /> Mais Recentes
        </h3>
        <div className="space-y-6">
            {posts.map((recent) => (
                <Link key={recent.id} to={`/blog/${recent.id}`} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-border">
                        <img
                            src={recent.image}
                            alt={recent.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                            {recent.title}
                        </h4>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                            <FaCalendar size={10} /> {recent.date}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

export const TopicsWidget = ({ tags }) => (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-foreground font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
            <FaHashtag className="text-primary" /> Tópicos
        </h3>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground text-xs font-medium rounded-lg transition-all border border-transparent hover:border-primary/20"
                >
                    {tag}
                </Link>
            ))}
        </div>
    </div>
);

export const NewsletterWidget = () => (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
        <h3 className="text-primary font-bold mb-2 text-sm">Gostou do conteúdo?</h3>
        <p className="text-xs text-muted-foreground mb-4">Receba dicas de desenvolvimento toda semana.</p>
        <div className="flex gap-2">
            <input type="email" placeholder="Seu email" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary" />
            <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-bold hover:brightness-110">
                <FaChevronRight />
            </button>
        </div>
    </div>
);