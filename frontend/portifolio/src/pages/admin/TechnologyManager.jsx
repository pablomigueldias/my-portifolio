import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import {
    FaPlus, FaTrash, FaEdit, FaSave, FaTimes,
    FaCode, FaArrowLeft, FaPalette, FaCube
} from 'react-icons/fa';
import { portfolioService } from '../../services/api';

const COLOR_PRESETS = [
    { name: 'Blue', value: 'bg-blue-500/10 text-blue-500 border border-blue-500/20' },
    { name: 'Green', value: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' },
    { name: 'Purple', value: 'bg-purple-500/10 text-purple-500 border border-purple-500/20' },
    { name: 'Orange', value: 'bg-orange-500/10 text-orange-500 border border-orange-500/20' },
    { name: 'Pink', value: 'bg-pink-500/10 text-pink-500 border border-pink-500/20' },
    { name: 'Yellow', value: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' },
    { name: 'Cyan', value: 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' },
    { name: 'Gray', value: 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20' },
];

const TechnologyManager = () => {
    const navigate = useNavigate();
    const [techs, setTechs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        icon_key: '',
        color_class: 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20'
    });

    useEffect(() => {
        loadTechs();
    }, []);

    const loadTechs = async () => {
        try {
            const data = await portfolioService.getTechnologies();
            setTechs(data);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar tecnologias.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("O nome é obrigatório.");
            return;
        }

        setIsSaving(true);
        const actionPromise = isEditing
            ? portfolioService.updateTechnology(isEditing, formData)
            : portfolioService.createTechnology(formData);

        toast.promise(actionPromise, {
            loading: isEditing ? 'Atualizando...' : 'Criando...',
            success: isEditing ? 'Tech atualizada!' : 'Tech criada!',
            error: 'Erro ao salvar.'
        });

        try {
            await actionPromise;
            resetForm();
            loadTechs();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (tech) => {
        setIsEditing(tech.id);
        setFormData({
            name: tech.name,
            icon_key: tech.icon_key,
            color_class: tech.color_class
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza? Projetos que usam essa tech perderão essa referência.")) return;

        try {
            await portfolioService.deleteTechnology(id);
            setTechs(prev => prev.filter(t => t.id !== id));
            toast.success("Tecnologia removida.");
        } catch (error) {
            toast.error("Erro ao deletar.");
        }
    };

    const resetForm = () => {
        setFormData({ name: '', icon_key: '', color_class: COLOR_PRESETS[7].value });
        setIsEditing(null);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Toaster position="top-right" />

            {/* HEADER */}
            <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
                        title="Voltar ao Dashboard"
                    >
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Gerenciar Stacks</h1>
                        <p className="text-xs text-muted-foreground hidden md:block">
                            Adicione ou edite as tecnologias exibidas no portfólio.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold flex items-center gap-2 text-lg">
                                    {isEditing ? <FaEdit className="text-primary" /> : <FaPlus className="text-primary" />}
                                    {isEditing ? 'Editar Tecnologia' : 'Nova Tecnologia'}
                                </h2>
                                {isEditing && (
                                    <button onClick={resetForm} className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1">
                                        <FaTimes /> Cancelar
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Preview Card */}
                                <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-2">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Preview Visual</span>
                                    <div className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${formData.color_class}`}>
                                        <FaCube /> {formData.name || 'Nome da Tech'}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nome</label>
                                    <input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 font-bold placeholder:font-normal"
                                        placeholder="Ex: React.js"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1 flex justify-between">
                                        <span>Icon Key</span>
                                        <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer" className="text-primary hover:underline cursor-pointer">Ver Ícones</a>
                                    </label>
                                    <div className="relative">
                                        <FaCode className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            value={formData.icon_key}
                                            onChange={e => setFormData({ ...formData, icon_key: e.target.value })}
                                            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                                            placeholder="Ex: SiReact, FaPython..."
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground ml-1">
                                        O nome exato do componente do React Icons.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1 flex items-center gap-2">
                                        <FaPalette /> Estilo (Presets)
                                    </label>

                                    <div className="grid grid-cols-4 gap-2">
                                        {COLOR_PRESETS.map((preset) => (
                                            <button
                                                key={preset.name}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, color_class: preset.value })}
                                                className={`h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${preset.value} ${formData.color_class === preset.value ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : ''}`}
                                                title={preset.name}
                                            >
                                                <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                                            </button>
                                        ))}
                                    </div>

                                    <input
                                        value={formData.color_class}
                                        onChange={e => setFormData({ ...formData, color_class: e.target.value })}
                                        className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-[10px] font-mono text-muted-foreground outline-none focus:border-primary"
                                        placeholder="Classes Tailwind customizadas..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-primary/25 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isEditing ? <FaSave /> : <FaPlus />}
                                    {isEditing ? 'Atualizar Tecnologia' : 'Adicionar Tecnologia'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        {isLoading ? (
                            <div className="text-center py-20 opacity-50 animate-pulse">Carregando biblioteca...</div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-2">
                                    <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider">Biblioteca ({techs.length})</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {techs.map(tech => (
                                        <div
                                            key={tech.id}
                                            className="group bg-card border border-border hover:border-primary/50 p-4 rounded-2xl relative transition-all hover:shadow-md flex flex-col gap-3"
                                        >
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <button
                                                    onClick={() => handleEdit(tech)}
                                                    className="p-1.5 bg-background border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-sm"
                                                    title="Editar"
                                                >
                                                    <FaEdit size={10} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(tech.id)}
                                                    className="p-1.5 bg-background border border-border rounded-md text-muted-foreground hover:text-red-500 hover:border-red-500 transition-colors shadow-sm"
                                                    title="Excluir"
                                                >
                                                    <FaTrash size={10} />
                                                </button>
                                            </div>

                                            <div className="flex justify-center py-2">
                                                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${tech.color_class}`}>
                                                    <FaCube /> {tech.name}
                                                </div>
                                            </div>

                                            <div className="text-center border-t border-border pt-3">
                                                <code className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-md font-mono block truncate">
                                                    {tech.icon_key || 'No Icon'}
                                                </code>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {techs.length === 0 && (
                                    <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl opacity-50">
                                        <p>Nenhuma tecnologia cadastrada.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default TechnologyManager;