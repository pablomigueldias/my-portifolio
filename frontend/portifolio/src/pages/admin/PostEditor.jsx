import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FaSpinner, FaMagic, FaSave } from 'react-icons/fa';

import { blogService } from '../../services/api';


import EditorHeader from './components/EditorHeader';
import NotesSidebar from './components/NotesSidebar';
import ContentWorkspace from './components/ContentWorkspace';
import MetadataSidebar from './components/MetadataSidebar';

const PostEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [notes, setNotes] = useState('');
    const [viewMode, setViewMode] = useState('editor');

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Geral',
        published: false,
        published_at: null,
        image_url: ''
    });

    useEffect(() => {
        if (!slug) return;

        const loadPost = async () => {
            setIsLoadingData(true);
            try {
                const data = await blogService.getPostBySlug(slug);
                setFormData({
                    ...data,
                    published_at: data.published_at ? data.published_at.split('T')[0] : ''
                });
            } catch (error) {
                console.error("Erro ao carregar post:", error);
                toast.error("Não foi possível carregar o artigo.");
                navigate('/admin');
            } finally {
                setIsLoadingData(false);
            }
        };

        loadPost();
    }, [slug, navigate]);

    const handleAIGenerate = async () => {
        if (!notes.trim()) {
            toast('Escreva algumas notas primeiro.', { icon: '✍️' });
            return;
        }
        const loadingToast = toast.loading("A IA está escrevendo...");
        setIsGeneratingAI(true);
        try {
            const draft = await blogService.generateDraft(notes);
            const contentVal = typeof draft.content === 'object' ? JSON.stringify(draft.content) : draft.content;

            setFormData(prev => ({
                ...prev,
                title: draft.title || prev.title,
                content: contentVal,
                excerpt: draft.excerpt || prev.excerpt,
                category: draft.category || prev.category
            }));
            toast.success("Conteúdo gerado!", { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error("Falha na geração via IA.", { id: loadingToast });
        } finally {
            setIsGeneratingAI(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title) {
            toast.error("O título é obrigatório.");
            return;
        }

        setIsSaving(true);

        const payload = {
            ...formData,
            published_at: formData.published_at ? formData.published_at : null
        };

        delete payload.id;
        delete payload.create_at;
        delete payload.updated_at;

        const savePromise = slug
            ? blogService.updatePost(slug, payload)
            : blogService.createPost(payload);

        toast.promise(savePromise, {
            loading: 'Salvando...',
            success: 'Salvo com sucesso!',
            error: (err) => {
                console.error(err);
                return `Erro: ${err.response?.data?.detail || 'Falha ao salvar'}`;
            }
        });

        try {
            await savePromise;
            if (!slug) setTimeout(() => navigate('/admin'), 1000);
        } catch (err) {
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background gap-4">
                <FaSpinner className="animate-spin text-4xl text-primary" />
                <p className="text-muted-foreground animate-pulse">Carregando editor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background pb-20">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
                <div className="max-w-[1600px] mx-auto px-6">
                    <EditorHeader
                        isEditing={!!slug}
                        onSave={handleSave}
                        isSaving={isSaving}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        onBack={() => navigate('/admin')}
                    />
                </div>
            </div>

            <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-6 py-8">
                <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">

                    <aside className="hidden xl:block col-span-3 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-4 border-b border-border pb-2">
                                <FaMagic /> Assistente IA
                            </div>
                            <NotesSidebar
                                notes={notes}
                                setNotes={setNotes}
                                onGenerate={handleAIGenerate}
                                isLoading={isGeneratingAI}
                            />
                        </div>
                    </aside>

                    <section className="col-span-12 xl:col-span-6 flex flex-col gap-6 min-h-[80vh]">
                        <div className={`relative flex-1 bg-card rounded-3xl border border-border shadow-sm transition-all duration-300 overflow-hidden ${viewMode === 'editor' ? 'ring-1 ring-primary/20' : ''}`}>
                            {isGeneratingAI && (
                                <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                                    <div className="bg-card border border-border px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
                                        <FaMagic className="animate-bounce text-primary" />
                                        <span className="font-medium">Gerando conteúdo mágico...</span>
                                    </div>
                                </div>
                            )}

                            <ContentWorkspace
                                formData={formData}
                                setFormData={setFormData}
                                viewMode={viewMode}
                            />
                        </div>
                    </section>

                    <aside className="col-span-12 xl:col-span-3 xl:sticky xl:top-24 space-y-6">
                        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase text-xs tracking-widest mb-4 border-b border-border pb-2">
                                <FaSave /> Publicação & SEO
                            </div>
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