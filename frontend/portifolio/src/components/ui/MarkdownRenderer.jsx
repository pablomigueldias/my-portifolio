import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';


import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';


const MarkdownRenderer = ({ content }) => {
    
    const components = {
        h1: ({ ...props }) => <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-12 mb-6 break-words hyphens-auto" {...props} />,
        h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-primary mt-10 mb-4 pb-2 border-b border-border break-words hyphens-auto" {...props} />,
        h3: ({ ...props }) => <h3 className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 break-words" {...props} />,
        p: ({ ...props }) => <p className="mb-6 leading-relaxed text-base md:text-lg text-muted-foreground break-words" {...props} />,
        ul: ({ ...props }) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground ml-4" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground ml-4" {...props} />,
        li: ({ ...props }) => <li className="marker:text-primary break-words" {...props} />,
        blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 py-2 my-8 bg-muted/50 italic text-foreground rounded-r-lg break-words" {...props} />
        ),
        a: ({ ...props }) => <a className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 break-all font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
        
        img: ({ ...props }) => (
            <span className="flex flex-col items-center my-8">
                <img className="max-w-full rounded-xl border border-border shadow-lg" loading="lazy" {...props} />
                {props.alt && <span className="text-sm text-muted-foreground mt-2 italic">{props.alt}</span>}
            </span>
        ),

        table: ({ ...props }) => <div className="overflow-x-auto my-8"><table className="w-full text-sm text-left border-collapse" {...props} /></div>,
        thead: ({ ...props }) => <thead className="text-xs uppercase bg-muted/50 text-foreground" {...props} />,
        th: ({ ...props }) => <th className="px-6 py-3 border border-border font-bold text-primary" {...props} />,
        td: ({ ...props }) => <td className="px-6 py-4 border border-border text-muted-foreground" {...props} />,

        code({ inline, className, children, ...props }) {
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

    return (
        <div className="text-foreground min-h-[300px] w-full grid grid-cols-1 min-w-0 markdown-body">
            <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}           
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;