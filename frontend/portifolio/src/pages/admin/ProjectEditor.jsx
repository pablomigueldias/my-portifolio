import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaGithub, FaExternalLinkAlt, FaArrowLeft, FaImage, FaSpinner, FaCheck } from 'react-icons/fa';
import { portfolioService } from '../../services/api';

const ProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
        loadData();
    }, [id]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const techs = await portfolioService.getTechnologies();
            setAvailableTechs(techs);

            if (id) {
                const project = await portfolioService.getProjectById(id);
                const techIds = project.technologies ? project.technologies.map(t => t.id) : [];

                setFormData({
                    ...project,
                    technology_ids: techIds
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTech = (techId) => {
        setFormData(prev => {
            const exists = prev.technology_ids.includes(techId);
            if (exists) {
                return { ...prev, technology_ids: prev.technology_ids.filter(id => id !== techId) };
            } else {
                return { ...prev, technology_ids: [...prev.technology_ids, techId] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await portfolioService.updateProject(id, formData);
            } else {
                await portfolioService.createProject(formData);
            }
            navigate('/admin');
        } catch (error) {
            alert("Erro ao salvar projeto. Verifique o console.");
            console.error(error);
        }
    };

    if (isLoading) return <div className="flex h-screen items-center justify-center"><FaSpinner className="animate-spin text-4xl text-primary" /></div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin')} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-2xl font-bold">{id ? 'Editar Projeto' : 'Novo Projeto'}</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:brightness-110 shadow-lg"
                >
                    <FaSave /> Salvar Projeto
                </button>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                <form className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    <div className="md:col-span-8 space-y-6">
                        <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nome do Projeto</label>
                                <input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-3 text-lg font-bold outline-none focus:border-primary"
                                    placeholder="Ex: SaaS Financeiro com AI"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Categoria</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl p-3 outline-none focus:border-primary"
                                    >
                                        <option value="Fullstack">Fullstack</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Data Science">Data Science</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1 mb-2 block">Stack Tecnológica</label>
                                {availableTechs.length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic">Nenhuma tecnologia cadastrada. Vá em "Gerenciar Techs".</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {availableTechs.map(tech => {
                                            const isSelected = formData.technology_ids.includes(tech.id);
                                            return (
                                                <button
                                                    type="button"
                                                    key={tech.id}
                                                    onClick={() => toggleTech(tech.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${isSelected
                                                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                                            : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                                                        }`}
                                                >
                                                    {isSelected && <FaCheck size={10} />}
                                                    {tech.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Descrição Curta</label>
                                <textarea
                                    value={formData.short_description}
                                    onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-3 h-24 resize-none outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Descrição Detalhada</label>
                                <textarea
                                    value={formData.long_description || ''}
                                    onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-3 h-64 font-mono text-sm outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4 space-y-6">
                        <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
                            <h3 className="font-bold flex items-center gap-2"><FaExternalLinkAlt className="text-primary" /> Links</h3>
                            <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2">
                                <FaGithub className="text-muted-foreground" />
                                <input
                                    value={formData.github_link || ''}
                                    onChange={e => setFormData({ ...formData, github_link: e.target.value })}
                                    placeholder="URL do Repositório"
                                    className="bg-transparent w-full outline-none text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2">
                                <FaExternalLinkAlt className="text-muted-foreground" />
                                <input
                                    value={formData.deploy_link || ''}
                                    onChange={e => setFormData({ ...formData, deploy_link: e.target.value })}
                                    placeholder="URL do Projeto Online"
                                    className="bg-transparent w-full outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
                            <h3 className="font-bold flex items-center gap-2"><FaImage className="text-primary" /> Capa</h3>
                            <input
                                value={formData.image_url || ''}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://..."
                                className="w-full bg-background border border-border rounded-xl p-3 text-xs outline-none"
                            />
                            {formData.image_url && (
                                <div className="rounded-xl overflow-hidden border border-border aspect-video">
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ProjectEditor;