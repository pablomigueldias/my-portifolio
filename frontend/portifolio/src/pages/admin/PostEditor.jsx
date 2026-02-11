import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../../services/api';
import { FaSpinner } from 'react-icons/fa'; // Assumindo que você tem react-icons

import EditorHeader from './components/EditorHeader.jsx';
import NotesSidebar from './components/NotesSidebar.jsx';
import ContentWorkspace from './components/ContentWorkspace.jsx';
import MetadataSidebar from './components/MetadataSidebar.jsx';

const PostEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [notes, setNotes] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado de loading inicial
    const [viewMode, setViewMode] = useState('editor');

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Python',
        published: false,
        published_at: new Date().toISOString().slice(0, 16),
        image_url: ''
    });

    // Load Data
    useEffect(() => {
        if (slug) {
            setIsLoading(true);
            blogService.getPostBySlug(slug)
                .then(setFormData)
                .finally(() => setIsLoading(false));
        }
    }, [slug]);

    // Handlers (Mantidos idênticos à lógica de negócio)
    const handleFileGenerate = async (file) => {
        if (!file) return;
        setIsGenerating(true);
        try {
            const data = new FormData();
            data.append('file', file);
            const draft = await blogService.generateFromFile(data);
            setFormData(prev => ({
                ...prev,
                title: draft.title || prev.title,
                content: typeof draft.content === 'string' ? draft.content : JSON.stringify(draft.content),
                excerpt: draft.excerpt || prev.excerpt,
                category: draft.category || prev.category
            }));
        } catch (error) {
            console.error("DEBUG:", error);
            alert("Erro na IA. Verifique os logs.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAIGenerate = async () => {
        if (!notes.trim()) return;
        const sanitizedNotes = notes.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
        setIsGenerating(true);
        try {
            const draft = await blogService.generateDraft(sanitizedNotes);
            const finalContent = typeof draft.content === 'string' ? draft.content : JSON.stringify(draft.content, null, 2);
            setFormData(prev => ({ ...prev, ...draft, content: finalContent }));
        } catch (error) {
            console.error("Erro na geração:", error);
            alert("Falha na IA.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        try {
            slug ? await blogService.updatePost(slug, formData) : await blogService.createPost(formData);
            navigate('/admin');
        } catch (error) { alert("Erro ao salvar o artigo."); }
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background pb-10">
            {/* 1. HEADER GLOBAL (Fora do Grid) */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-[1800px] mx-auto px-6">
                    <EditorHeader
                        slug={slug}
                        onSave={handleSave}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </div>
            </div>

            {/* 2. LAYOUT CMS (3 Colunas) */}
            <main className="flex-1 max-w-[1800px] mx-auto w-full px-6 py-8">
                <div className="grid grid-cols-12 gap-8 items-start">

                    {/* ESQUERDA: Ferramentas de IA (Sticky) */}
                    <aside className="hidden xl:block col-span-3 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
                                Assistente IA
                            </h3>
                            <NotesSidebar
                                notes={notes}
                                setNotes={setNotes}
                                onGenerate={handleAIGenerate}
                                onFileUpload={handleFileGenerate}
                                isLoading={isGenerating}
                            />
                        </div>
                    </aside>

                    {/* CENTRO: Área de Escrita (Foco Principal) */}
                    <section className="col-span-12 xl:col-span-6 flex flex-col gap-6 min-h-[80vh]">
                        {/* Wrapper para dar destaque ao editor */}
                        <div className={`relative flex-1 bg-card rounded-2xl border border-border shadow-sm transition-all duration-300 ${viewMode === 'editor' ? 'ring-1 ring-primary/10' : ''}`}>
                            <ContentWorkspace
                                formData={formData}
                                setFormData={setFormData}
                                viewMode={viewMode}
                            />
                        </div>
                    </section>

                    {/* DIREITA: Metadados e Configs (Sticky) */}
                    <aside className="col-span-12 xl:col-span-3 xl:sticky xl:top-24 space-y-6">
                        <div className="xl:h-[calc(100vh-8rem)] overflow-y-auto pl-2 custom-scrollbar">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
                                Publicação & SEO
                            </h3>
                            <MetadataSidebar
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    );
};

export default PostEditor;