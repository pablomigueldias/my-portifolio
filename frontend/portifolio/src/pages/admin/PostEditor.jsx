import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; // Notificações Profissionais
import { FaSpinner, FaMagic, FaSave, FaArrowLeft } from 'react-icons/fa';

import { blogService } from '../../services/api';
import EditorHeader from './components/EditorHeader';
import NotesSidebar from './components/NotesSidebar';
import ContentWorkspace from './components/ContentWorkspace';
import MetadataSidebar from './components/MetadataSidebar';

const PostEditor = () => {
    // --- Routing & Hooks ---
    const { slug } = useParams();
    const navigate = useNavigate();

    // --- State Management ---
    const [notes, setNotes] = useState('');
    const [viewMode, setViewMode] = useState('editor');
    
    // Loading States Granulares
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);

    // Form Data Inicial
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Python',
        published: false,
        image_url: ''
    });

    // --- 1. Carregamento de Dados ---
    useEffect(() => {
        if (!slug) return;

        const loadPost = async () => {
            setIsLoadingData(true);
            try {
                const data = await blogService.getPostBySlug(slug);
                setFormData(data);
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

    // --- 2. Handlers de Inteligência Artificial ---
    
    // Geração via Arquivo (Upload)
    const handleFileGenerate = async (file) => {
        if (!file) return;
        
        const loadingToast = toast.loading("Lendo arquivo e gerando rascunho...");
        setIsGeneratingAI(true);

        try {
            const data = new FormData();
            data.append('file', file);
            
            const draft = await blogService.generateFromFile(data);
            
            // Merge inteligente dos dados
            setFormData(prev => ({
                ...prev,
                title: draft.title || prev.title,
                content: typeof draft.content === 'object' 
                    ? JSON.stringify(draft.content) 
                    : draft.content,
                excerpt: draft.excerpt || prev.excerpt,
                category: draft.category || prev.category
            }));

            toast.success("Rascunho gerado com sucesso!", { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error("Erro ao processar arquivo.", { id: loadingToast });
        } finally {
            setIsGeneratingAI(false);
        }
    };

    // Geração via Texto (Notas)
    const handleAIGenerate = async () => {
        if (!notes.trim()) {
            toast('Escreva algumas notas primeiro.', { icon: '✍️' });
            return;
        }

        const loadingToast = toast.loading("A IA está escrevendo...");
        setIsGeneratingAI(true);

        try {
            // Sanitização básica
            const sanitizedNotes = notes.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
            
            const draft = await blogService.generateDraft(sanitizedNotes);
            
            const finalContent = typeof draft.content === 'object' 
                ? JSON.stringify(draft.content, null, 2) 
                : draft.content;

            setFormData(prev => ({ ...prev, ...draft, content: finalContent }));
            
            toast.success("Conteúdo gerado!", { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error("Falha na geração via IA.", { id: loadingToast });
        } finally {
            setIsGeneratingAI(false);
        }
    };

    // --- 3. Salvamento (Create / Update) ---
    const handleSave = async () => {
        if (!formData.title) {
            toast.error("O título é obrigatório.");
            return;
        }

        setIsSaving(true);
        // Toast com Promise (Loading -> Success/Error automático)
        const savePromise = slug 
            ? blogService.updatePost(slug, formData) 
            : blogService.createPost(formData);

        toast.promise(savePromise, {
            loading: 'Salvando alterações...',
            success: () => {
                // Se for criação, redireciona. Se for update, só avisa.
                if (!slug) navigate('/admin'); 
                return <b>Artigo salvo com sucesso!</b>;
            },
            error: <b>Erro ao salvar artigo.</b>,
        });

        try {
            await savePromise;
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    // --- Renderização de Loading Inicial ---
    if (isLoadingData) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background gap-4">
                <FaSpinner className="animate-spin text-4xl text-primary" />
                <p className="text-muted-foreground animate-pulse">Carregando editor...</p>
            </div>
        );
    }

    // --- Renderização Principal ---
    return (
        <div className="min-h-screen flex flex-col bg-background pb-20">
            {/* Notificações flutuantes */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* HEADER FIXO */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
                <div className="max-w-[1920px] mx-auto px-6">
                    <EditorHeader
                        slug={slug}
                        onSave={handleSave}
                        isSaving={isSaving} // Passamos o estado para desabilitar o botão
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        onBack={() => navigate('/admin')}
                    />
                </div>
            </div>

            {/* LAYOUT GRID DE 3 COLUNAS */}
            <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 md:px-6 py-8">
                <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* COLUNA 1: FERRAMENTAS & IA (Esquerda) */}
                    <aside className="hidden xl:block col-span-3 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-4 border-b border-border pb-2">
                                <FaMagic /> Assistente IA
                            </div>
                            <NotesSidebar
                                notes={notes}
                                setNotes={setNotes}
                                onGenerate={handleAIGenerate}
                                onFileUpload={handleFileGenerate}
                                isLoading={isGeneratingAI}
                            />
                        </div>
                    </aside>

                    {/* COLUNA 2: EDITOR PRINCIPAL (Centro) */}
                    <section className="col-span-12 xl:col-span-6 flex flex-col gap-6 min-h-[80vh]">
                        <div className={`relative flex-1 bg-card rounded-3xl border border-border shadow-sm transition-all duration-300 overflow-hidden ${viewMode === 'editor' ? 'ring-1 ring-primary/20' : ''}`}>
                            {/* Loading Overlay para IA */}
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

                    {/* COLUNA 3: METADADOS & SEO (Direita) */}
                    <aside className="col-span-12 xl:col-span-3 xl:sticky xl:top-24 space-y-6">
                        <div className="xl:h-[calc(100vh-8rem)] overflow-y-auto pl-2 custom-scrollbar">
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