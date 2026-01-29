import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

// --- DADOS (Mock) ---
const MOCK_POST = {
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
    # Se essa linha for muito longa ela vai criar uma barra de rolagem interna agora.
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

// --- COMPONENTES MARKDOWN BLINDADOS ---
const MarkdownComponents = {
    // Títulos e Textos com word-break forçado
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

    // CORREÇÃO DO CÓDIGO COM GRID LAYOUT
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            // Grid + min-w-0 força o filho a encolher se necessário
            <div className="rounded-xl my-8 border border-border shadow-lg group bg-card w-full grid grid-cols-1 min-w-0">

                {/* Cabeçalho do Código */}
                <div className="bg-muted/80 px-4 py-2 flex items-center justify-between border-b border-border backdrop-blur-sm">
                    <span className="text-xs text-muted-foreground font-mono uppercase font-bold">{match[1]}</span>
                    <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                </div>

                {/* Container do SyntaxHighlighter com overflow */}
                <div className="overflow-x-auto w-full">
                    <SyntaxHighlighter
                        {...props}
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        // wrapLongLines={true} // Se preferir quebrar linha, descomente aqui
                        customStyle={{
                            margin: 0,
                            background: '#18181b',
                            padding: '1.5rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                            width: '100%', // Força largura 100%
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
        // Trava final no container principal
        <div className="min-h-screen pb-20 pt-8 transition-colors duration-300 w-full overflow-hidden">

            <div className="max-w-4xl mx-auto mb-8 px-4">
                <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit font-medium group text-sm uppercase tracking-wider">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Blog
                </Link>
            </div>

            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 w-full"
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
                    <img src={post.image} alt="Capa" loading="eager" className="w-full h-full object-cover" />
                </div>

                {/* Conteúdo com Grid para evitar overflow */}
                <div className="text-foreground min-h-[300px] w-full grid grid-cols-1 min-w-0">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

            </motion.article>

        </div>
    );
};

export default BlogPost;