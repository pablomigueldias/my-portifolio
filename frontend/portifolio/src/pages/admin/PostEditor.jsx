import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

import { blogService } from '../../services/api';
import EditorHeader from './components/EditorHeader';
import ContentWorkspace from './components/ContentWorkspace';
import MetadataSidebar from './components/MetadataSidebar';

const PostEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('editor');
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Geral',
        read_time: '',
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
                    published_at: data.published_at ? data.published_at.split('T')[0] : '',
                    read_time: data.read_time || '' 
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
            error: (err) => `Erro: ${err.response?.data?.detail || 'Falha ao salvar'}`
        });

        try {
            await savePromise;
            if (!slug) setTimeout(() => navigate('/admin'), 1000);
        } catch (err) {
            console.error(err);
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

                    <section className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                        <div className={`relative flex-1 bg-card rounded-3xl border border-border shadow-sm transition-all duration-300 overflow-hidden ${viewMode === 'editor' ? 'ring-1 ring-primary/20' : ''}`}>
                            <ContentWorkspace
                                formData={formData}
                                setFormData={setFormData}
                                viewMode={viewMode}
                            />
                        </div>
                    </section>

                    <aside className="col-span-12 xl:col-span-3 xl:sticky xl:top-24 space-y-6">
                        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
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