import React, { useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const ContentWorkspace = ({ formData, setFormData, viewMode }) => {

    const onChange = useCallback((value) => {
        setFormData(prev => ({ ...prev, content: value }));
    }, [setFormData]);

    const editorOptions = useMemo(() => {
        return {
            spellChecker: false,
            maxHeight: "500px",
            autofocus: true,
            placeholder: "Digite seu conteúdo incrível...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: "post_editor_unique_id",
            },
            toolbar: [
                "bold", "italic", "heading", "|",
                "quote", "code", "unordered-list", "|",
                "link", "image", "|",
                "preview", "guide"
            ],
        };
    }, []);

    return (
        <div className="flex flex-col h-full">
            
            <div className="p-6 border-b border-border">
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título do Artigo..."
                    className="w-full text-3xl font-black bg-transparent outline-none placeholder:text-muted-foreground/30 text-foreground"
                />
            </div>

            <div className="flex-1 bg-card p-0">
                {viewMode === 'editor' ? (
                    <SimpleMDE
                        value={formData.content}
                        onChange={onChange}
                        options={editorOptions}
                    />
                ) : (
                    <div className="prose prose-invert max-w-none p-8">
                        <ReactMarkdown>{formData.content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentWorkspace;