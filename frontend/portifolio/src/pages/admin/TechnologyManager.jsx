import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaCode } from 'react-icons/fa';
import { portfolioService } from '../../services/api';


const TechnologyManager = () => {
    const [techs, setTechs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(null); 

    const [formData, setFormData] = useState({
        name: '',
        icon_key: '', // Ex: 'FaReact' ou URL SVG
        color_class: 'bg-blue-500/10 text-blue-500'
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await portfolioService.updateTechnology(isEditing, formData);
            } else {
                await portfolioService.createTechnology(formData);
            }
            setFormData({ name: '', icon_key: '', color_class: 'bg-blue-500/10 text-blue-500' });
            setIsEditing(null);
            loadTechs();
        } catch (error) {
            alert("Erro ao salvar tecnologia.");
        }
    };

    const handleEdit = (tech) => {
        setIsEditing(tech.id);
        setFormData({
            name: tech.name,
            icon_key: tech.icon_key,
            color_class: tech.color_class
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza? Isso pode afetar projetos que usam essa tech.")) {
            try {
                await portfolioService.deleteTechnology(id);
                setTechs(techs.filter(t => t.id !== id));
            } catch (error) {
                alert("Erro ao deletar.");
            }
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black">Tecnologias</h1>
                    <p className="text-muted-foreground text-sm">Gerencie as stacks do seu portfólio.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-1">
                    <div className="bg-card border border-border p-6 rounded-2xl sticky top-6">
                        <h2 className="font-bold mb-4 flex items-center gap-2">
                            {isEditing ? <FaEdit className="text-primary"/> : <FaPlus className="text-primary"/>}
                            {isEditing ? 'Editar Tecnologia' : 'Nova Tecnologia'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground">Nome</label>
                                <input 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-background border border-border rounded-xl p-3 outline-none focus:border-primary"
                                    placeholder="Ex: React"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground">Chave do Ícone</label>
                                <input 
                                    value={formData.icon_key}
                                    onChange={e => setFormData({...formData, icon_key: e.target.value})}
                                    className="w-full bg-background border border-border rounded-xl p-3 outline-none focus:border-primary"
                                    placeholder="Ex: SiReact (Simple Icons)"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    Usaremos para mapear o ícone no frontend público.
                                </p>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground">Classes de Cor (Tailwind)</label>
                                <input 
                                    value={formData.color_class}
                                    onChange={e => setFormData({...formData, color_class: e.target.value})}
                                    className="w-full bg-background border border-border rounded-xl p-3 outline-none focus:border-primary font-mono text-xs"
                                    placeholder="bg-blue-500/10 text-blue-500"
                                />

                                <div className={`mt-2 px-3 py-1 rounded text-xs font-bold w-fit ${formData.color_class}`}>
                                    Preview: {formData.name || 'Tech'}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button type="submit" className="flex-1 bg-primary text-primary-foreground py-2 rounded-xl font-bold hover:brightness-110">
                                    <FaSave className="inline mr-2"/> Salvar
                                </button>
                                {isEditing && (
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsEditing(null); setFormData({name: '', icon_key: '', color_class: ''}); }}
                                        className="bg-muted text-muted-foreground px-4 rounded-xl hover:text-red-500"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <p className="text-center text-muted-foreground">Carregando...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {techs.map(tech => (
                                <div key={tech.id} className="group bg-card border border-border p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 relative hover:border-primary/50 transition-all">
                                    
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(tech)} className="p-1.5 bg-background border border-border rounded-lg text-muted-foreground hover:text-primary">
                                            <FaEdit size={12}/>
                                        </button>
                                        <button onClick={() => handleDelete(tech.id)} className="p-1.5 bg-background border border-border rounded-lg text-muted-foreground hover:text-red-500">
                                            <FaTrash size={12}/>
                                        </button>
                                    </div>

                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-1 ${tech.color_class}`}>
                                        <FaCode />
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-bold text-sm">{tech.name}</h3>
                                        <code className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                            {tech.icon_key}
                                        </code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TechnologyManager;