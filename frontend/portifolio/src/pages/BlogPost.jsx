import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaTag, FaFire, FaHashtag, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const MOCK_POST = {
    id: 1,
    title: "Como otimizar APIs com FastAPI",
    date: "28 Jan, 2026",
    author: "Pablo",
    category: "Backend",
    readTime: "5 min",
    image: "https://placehold.co/1200x600/111/emerald?text=FastAPI+Code",
    content: `
Quando falamos de alta performance em Python, o **FastAPI** é a escolha natural. Mas você está usando o banco de dados da forma correta?

### O Problema do Bloqueio

Muitos desenvolvedores usam drivers síncronos (como \`psycopg2\`) com FastAPI. Isso mata a performance porque bloqueia o *Event Loop*.

Veja um exemplo do jeito **errado**:

\`\`\`python
# Jeito bloqueante (NÃO FAÇA ISSO)
@app.get("/users")
def get_users():
    # Isso trava o servidor até o banco responder.
    results = db.query("SELECT * FROM users") 
    return results
\`\`\`

### A Solução: AsyncPG

Ao migrar para drivers assíncronos, conseguimos lidar com milhares de requisições.

> "Performance não é sobre fazer mais rápido, é sobre fazer mais coisas ao mesmo tempo."

Aqui está como fazer do jeito **certo**:

\`\`\`python
# Jeito assíncrono (CORRETO)
@app.get("/users")
async def get_users():
    # O servidor continua livre enquanto espera o banco
    results = await db.fetch_all("SELECT * FROM users")
    return results
\`\`\`

Isso aumenta o throughput em até **10x**.
    `
};

const RECENT_POSTS = [
    { id: 2, title: "Docker para Desenvolvedores", date: "15 Jan, 2026", image: "https://placehold.co/150/111/emerald?text=Docker" },
    { id: 3, title: "React useEffect Guia Completo", date: "10 Jan, 2026", image: "https://placehold.co/150/111/emerald?text=React" },
    { id: 4, title: "Clean Architecture em Python", date: "05 Jan, 2026", image: "https://placehold.co/150/111/emerald?text=Clean" }
];

const TAGS = ["Backend", "Frontend", "DevOps", "Mobile", "Carreira", "Database"];

const MarkdownComponents = {
    h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-12 mb-6 break-words hyphens-auto" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-primary mt-10 mb-4 pb-2 border-b border-border break-words hyphens-auto" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 break-words" {...props} />,
    p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-base md:text-lg text-muted-foreground break-words text-justify" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground ml-4" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground ml-4" {...props} />,
    li: ({ node, ...props }) => <li className="marker:text-primary break-words" {...props} />,
    blockquote: ({ node, ...props }) => (
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-8 bg-muted/50 italic text-foreground rounded-r-lg break-words" {...props} />
    ),
    a: ({ node, ...props }) => <a className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 break-all" {...props} />,

    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <div className="rounded-xl my-8 border border-border shadow-lg group bg-card w-full grid grid-cols-1 min-w-0">
                <div className="bg-muted/80 px-4 py-2 flex items-center justify-between border-b border-border backdrop-blur-sm">
                    <span className="text-xs text-muted-foreground font-mono uppercase font-bold">{match[1]}</span>
                    <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <SyntaxHighlighter
                        {...props}
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                            margin: 0,
                            background: '#18181b',
                            padding: '1.5rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                            width: '100%',
                        }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            </div>
        ) : (
            <code {...props} className="bg-muted text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-border font-bold break-all whitespace-normal">
                {children}
            </code>
        )
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const post = MOCK_POST;

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

                        <div className="text-foreground min-h-[300px] w-full grid grid-cols-1 min-w-0">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={MarkdownComponents}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </motion.article>

                    <aside className="lg:col-span-4 space-y-8 mt-12 lg:mt-0">

                        <div className="lg:sticky lg:top-24 space-y-8">

                            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                                <h3 className="text-foreground font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                                    <FaFire className="text-primary" /> Mais Recentes
                                </h3>
                                <div className="space-y-6">
                                    {RECENT_POSTS.map((recent) => (
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

                            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                                <h3 className="text-foreground font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                                    <FaHashtag className="text-primary" /> Tópicos
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {TAGS.map((tag) => (
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

                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                                <h3 className="text-primary font-bold mb-2 text-sm">Gostou do conteúdo?</h3>
                                <p className="text-xs text-muted-foreground mb-4">Receba dicas de desenvolvimento toda semana.</p>
                                <div className="flex gap-2">
                                    <input type="email" placeholder="Seu email" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs" />
                                    <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-bold hover:brightness-110">
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </main>
        </div>
    );
};

export default BlogPost;