import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { } from "module";
import {
    FaSave, FaGithub, FaExternalLinkAlt, FaArrowLeft,
    FaImage, FaSpinner, FaCheck, FaLayerGroup
} from 'react-icons/fa';
import { FILTERS, PROJECT_CATEGORIES } from '../../data/projectsData.js';
import { portfolioService } from '../../services/api';



const ProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [availableTechs, setAvailableTechs] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        short_description: '',
        long_description: '',
        category: 'Fullstack',
        image_url: '',
        github_link: '',
        deploy_link: '',
        technology_ids: []
    });

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                const techsData = await portfolioService.getTechnologies();
                setAvailableTechs(techsData);

                if (id) {
                    const project = await portfolioService.getProjectById(id);

                    const currentTechIds = project.technologies
                        ? project.technologies.map(t => t.id)
                        : [];

                    setFormData({
                        ...project,
                        technology_ids: currentTechIds
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                toast.error("Erro ao carregar projeto.");
                navigate('/admin');
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, [id, navigate]);

    const toggleTech = (techId) => {
        setFormData(prev => {
            const currentIds = prev.technology_ids;
            if (currentIds.includes(techId)) {
                return {
                    ...prev,
                    technology_ids: currentIds.filter(id => id !== techId)
                };
            } else {
                return {
                    ...prev,
                    technology_ids: [...currentIds, techId]
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            toast.error("O projeto precisa de um título.");
            return;
        }

        setIsSaving(true);

        const savePromise = id
            ? portfolioService.updateProject(id, formData)
            : portfolioService.createProject(formData);

        toast.promise(savePromise, {
            loading: 'Salvando projeto...',
            success: 'Projeto salvo com sucesso!',
            error: 'Erro ao salvar projeto.'
        });

        try {
            await savePromise;
            setTimeout(() => navigate('/admin'), 1000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <FaSpinner className="animate-spin text-4xl text-primary" />
                <p className="text-muted-foreground animate-pulse">Carregando editor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <Toaster position="top-right" />

            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
                        title="Voltar"
                    >
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            {id ? 'Editar Projeto' : 'Novo Projeto'}
                        </h1>
                        <p className="text-xs text-muted-foreground hidden md:block">
                            Preencha os detalhes do seu case de sucesso.
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-primary/25 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    {isSaving ? 'Salvando...' : 'Salvar Projeto'}
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-8 space-y-8">

                        <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    Nome do Projeto
                                </label>
                                <input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:font-normal"
                                    placeholder="Ex: SaaS Financeiro com AI"
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    Categoria
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer font-medium"
                                    >
                                        {PROJECT_CATEGORIES.map((cat) => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                    <FaLayerGroup className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex justify-between">
                                    <span>Stack Tecnológica</span>
                                    <span className="text-[10px] font-normal opacity-70">Selecione as techs usadas</span>
                                </label>

                                {availableTechs.length === 0 ? (
                                    <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Nenhuma tecnologia cadastrada.
                                            <br />
                                            <button onClick={() => navigate('/admin/technologies')} className="text-primary hover:underline font-bold mt-1">
                                                Cadastrar Techs agora
                                            </button>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2 p-4 bg-muted/20 rounded-2xl border border-border/50">
                                        {availableTechs.map(tech => {
                                            const isSelected = formData.technology_ids.includes(tech.id);
                                            return (
                                                <button
                                                    type="button"
                                                    key={tech.id}
                                                    onClick={() => toggleTech(tech.id)}
                                                    className={`
                                                        px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 transform active:scale-95
                                                        ${isSelected
                                                            ? 'bg-primary text-primary-foreground border-primary shadow-md ring-2 ring-primary/20'
                                                            : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                                        }
                                                    `}
                                                >
                                                    {isSelected && <FaCheck size={10} />}
                                                    {tech.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    Descrição Curta (Resumo)
                                </label>
                                <textarea
                                    value={formData.short_description}
                                    onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-4 h-24 resize-none outline-none focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed"
                                    placeholder="O que é esse projeto em 2 frases?"
                                    maxLength={200}
                                />
                                <div className="text-right text-[10px] text-muted-foreground">
                                    {formData.short_description.length}/200
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    Descrição Detalhada (Markdown)
                                </label>
                                <textarea
                                    value={formData.long_description || ''}
                                    onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-4 h-80 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/50 custom-scrollbar resize-y"
                                    placeholder="Conte a história do projeto, desafios, soluções..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 sticky top-24">

                        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4">
                                Links & Deploy
                            </h3>

                            <div className="space-y-3">
                                <div className="relative group">
                                    <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                                    <input
                                        value={formData.github_link || ''}
                                        onChange={e => setFormData({ ...formData, github_link: e.target.value })}
                                        placeholder="github.com/usuario/repo"
                                        className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <FaExternalLinkAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={12} />
                                    <input
                                        value={formData.deploy_link || ''}
                                        onChange={e => setFormData({ ...formData, deploy_link: e.target.value })}
                                        placeholder="projeto-incrivel.com"
                                        className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4">
                                Mídia Visual
                            </h3>

                            <div className="relative group">
                                <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    value={formData.image_url || ''}
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="URL da Imagem (https://...)"
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary transition-all truncate"
                                />
                            </div>

                            <div className="rounded-xl overflow-hidden border border-border bg-muted/50 aspect-video flex items-center justify-center relative group cursor-pointer">
                                {formData.image_url ? (
                                    <>
                                        <img
                                            src={formData.image_url}
                                            alt="Preview"
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x200?text=Erro+na+Imagem"; }}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                            Preview da Capa
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-4">
                                        <FaImage className="mx-auto text-3xl text-muted-foreground/30 mb-2" />
                                        <p className="text-[10px] text-muted-foreground">Sem imagem definida</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </form>
            </main>
        </div>
    );
};

export default ProjectEditor;