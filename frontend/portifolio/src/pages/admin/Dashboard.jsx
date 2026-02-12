import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaPlus, FaEdit, FaTrash, FaSearch,
    FaFileAlt, FaProjectDiagram, FaSpinner, FaGithub, FaExternalLinkAlt
} from 'react-icons/fa';
import { blogService, portfolioService } from '../../services/api';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (activeTab === 'posts') {
                const res = await blogService.getAllPosts();
                setData(res);
            } else {
                const res = await portfolioService.getProjects();
                setData(res);
            }
        } catch (error) {
            console.error("Erro ao carregar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id, slug) => {
        if (!window.confirm('Tem certeza? Esta ação é irreversível.')) return;

        try {
            // Optimistic Update
            setData(prev => prev.filter(item => (activeTab === 'posts' ? item.slug !== slug : item.id !== id)));

            if (activeTab === 'posts') {
                await blogService.deletePost(slug);
            } else {
                await portfolioService.deleteProject(id);
            }
        } catch (error) {
            alert("Erro ao excluir.");
            loadData();
        }
    };

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground">Painel de Controle</h1>
                    <p className="text-muted-foreground text-sm">Gerencie todo o conteúdo do seu portfólio.</p>
                </div>

                <Link
                    to="/admin/technologies"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg active:scale-95 transition-all"
                >
                    Gerenciar Techs
                </Link>

                <Link
                    to={activeTab === 'posts' ? "/admin/new" : "/admin/project/new"}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg active:scale-95 transition-all"
                >
                    <FaPlus size={12} /> {activeTab === 'posts' ? 'Novo Artigo' : 'Novo Projeto'}
                </Link>
            </div>

            <div className="flex gap-4 border-b border-border pb-1">
                <TabButton
                    active={activeTab === 'posts'}
                    onClick={() => setActiveTab('posts')}
                    icon={<FaFileAlt />}
                    label="Blog / Artigos"
                />
                <TabButton
                    active={activeTab === 'projects'}
                    onClick={() => setActiveTab('projects')}
                    icon={<FaProjectDiagram />}
                    label="Portfólio / Projetos"
                />
            </div>

            <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-6 border-b border-border bg-muted/30">
                    <div className="relative max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs" />
                        <input
                            type="text"
                            placeholder={`Buscar ${activeTab === 'posts' ? 'artigos' : 'projetos'}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 ring-primary/20"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center p-12"><FaSpinner className="animate-spin text-2xl text-primary" /></div>
                ) : (
                    <div className="divide-y divide-border">
                        {filteredData.map(item => (
                            <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    {activeTab === 'projects' && item.image_url && (
                                        <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-border" />
                                    )}

                                    <div>
                                        <h3 className="font-bold text-foreground">{item.title}</h3>
                                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                            {activeTab === 'posts' ? (
                                                <span className={`px-2 py-0.5 rounded ${item.published ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                                                    {item.published ? 'Publicado' : 'Rascunho'}
                                                </span>
                                            ) : (
                                                <>
                                                    {item.github_link && <FaGithub />}
                                                    {item.deploy_link && <FaExternalLinkAlt />}
                                                </>
                                            )}
                                            <span className="bg-secondary px-2 rounded">{item.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, item.slug)}
                                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredData.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground text-sm">Nenhum item encontrado.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all ${active
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
    >
        {icon} {label}
    </button>
);

export default Dashboard;