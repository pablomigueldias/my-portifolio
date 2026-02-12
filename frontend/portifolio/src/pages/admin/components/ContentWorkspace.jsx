import React from 'react';
import ReactMarkdown from 'react-markdown';

const ContentWorkspace = ({ formData, setFormData, viewMode }) => {
    return (
        <div className="flex flex-col h-full min-h-[600px]">
            <div className="p-6 border-b border-border">
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Título do Artigo..."
                    className="w-full text-3xl font-black bg-transparent outline-none placeholder:text-muted-foreground/30"
                />
            </div>

            <div className="flex-1 overflow-hidden relative">
                {viewMode === 'editor' ? (
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full h-full p-6 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed"
                        placeholder="Escreva seu artigo em Markdown aqui..."
                    />
                ) : (
                    <div className="w-full h-full p-8 overflow-y-auto prose prose-invert max-w-none">
                        <ReactMarkdown>{formData.content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentWorkspace;