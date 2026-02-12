import React from 'react';
import MarkdownRenderer from '../../../components/ui/MarkdownRenderer';

const ContentWorkspace = ({ formData, setFormData, viewMode }) => {

    if (viewMode === 'preview') {
        return (
            <div className="prose prose-lg dark:prose-invert max-w-none p-8 md:p-12">
                <h1>{formData.title || "Sem Título"}</h1>
                <MarkdownRenderer content={formData.content} />
            </div>
        );
    }
    return (
        <div className="flex flex-col h-full min-h-[600px] p-6 md:p-8">
            <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título do Artigo"
                className="text-4xl md:text-5xl font-black bg-transparent border-none outline-none placeholder:text-muted-foreground/30 text-foreground mb-6 w-full"
            />

            <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Conteúdo em Markdown..."
                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-lg text-muted-foreground/90 font-mono leading-relaxed"
            />
        </div>
    );
};

export default ContentWorkspace;