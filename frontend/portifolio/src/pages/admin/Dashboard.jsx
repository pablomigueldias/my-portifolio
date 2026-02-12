import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    FaPlus, FaEdit, FaTrash, FaSearch,
    FaFileAlt, FaProjectDiagram, FaSpinner,
    FaGithub, FaExternalLinkAlt, FaSyncAlt
} from 'react-icons/fa';
import { blogService, portfolioService } from '../../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const loadData = async () => {
        setIsLoading(true);
        try {
            let res;
            if (activeTab === 'posts') {
                res = await blogService.getAllPosts(0, 100, 'all');
                setData(Array.isArray(res) ? res : res.posts || []);
            } else {
                res = await portfolioService.getProjects();
                setData(res);
            }
        } catch (error) {
            console.error("Erro ao carregar:", error);
            toast.error("Erro ao carregar dados.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [activeTab]);


    const handleEdit = (item) => {
        if (activeTab === 'posts') {
            navigate(`/admin/post/${item.slug}`);
        } else {
            navigate(`/admin/project/${item.id}`);
        }
    };

    const handleDelete = async (item) => {

        if (!window.confirm(`Tem certeza que deseja excluir "${item.title}"?`)) return;

        const deletePromise = activeTab === 'posts'
            ? blogService.deletePost(item.slug)
            : portfolioService.deleteProject(item.id);

        toast.promise(deletePromise, {
            loading: 'Excluindo...',
            success: 'Item excluído com sucesso!',
            error: 'Erro ao excluir item.'
        });

        try {
            await deletePromise;
            setData(prev => prev.filter(i =>
                activeTab === 'posts' ? i.slug !== item.slug : i.id !== item.id
            ));
        } catch (error) {
            console.error(error);
            loadData();
        }
    };

    const filteredData = data.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/50 backdrop-blur-sm p-6 rounded-3xl border border-border shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Painel de Controle</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Gerencie o conteúdo do seu portfólio digital.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/admin/technologies"
                        className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-3 rounded-xl font-bold text-sm hover:brightness-95 transition-all border border-border"
                    >
                        ⚙️ Techs
                    </Link>

                    <Link
                        to={activeTab === 'posts' ? "/admin/new" : "/admin/project/new"}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg shadow-primary/25 active:scale-95 transition-all"
                    >
                        <FaPlus size={12} />
                        {activeTab === 'posts' ? 'Novo Artigo' : 'Novo Projeto'}
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-end md:items-center">

                <div className="flex p-1 bg-muted/50 rounded-xl border border-border/50">
                    <TabButton
                        active={activeTab === 'posts'}
                        onClick={() => setActiveTab('posts')}
                        icon={<FaFileAlt />}
                        label="Blog Posts"
                    />
                    <TabButton
                        active={activeTab === 'projects'}
                        onClick={() => setActiveTab('projects')}
                        icon={<FaProjectDiagram />}
                        label="Projetos"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative group w-full md:w-80">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors text-sm" />
                        <input
                            type="text"
                            placeholder={`Buscar em ${activeTab === 'posts' ? 'artigos' : 'projetos'}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                        />
                    </div>
                    <button
                        onClick={loadData}
                        className="p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                        title="Recarregar dados"
                    >
                        <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <FaSpinner className="animate-spin text-4xl text-primary" />
                        <p className="text-muted-foreground animate-pulse text-sm">Carregando dados...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <ListItem
                                    key={item.id || item.slug}
                                    item={item}
                                    type={activeTab}
                                    onEdit={() => handleEdit(item)}
                                    onDelete={() => handleDelete(item)}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                                <div className="text-6xl opacity-20">
                                    {activeTab === 'posts' ? <FaFileAlt /> : <FaProjectDiagram />}
                                </div>
                                <p>Nenhum item encontrado.</p>
                            </div>
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
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${active
                ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
    >
        {icon} {label}
    </button>
);

const ListItem = ({ item, type, onEdit, onDelete }) => {
    const dateValue = item.create_at || item.created_at || item.published_at;

    const formattedDate = dateValue
        ? new Date(dateValue).toLocaleDateString('pt-BR')
        : 'Sem data';

    return (
        <div className="p-5 hover:bg-muted/30 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-lg bg-secondary/50 border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.image_url ? (
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-2xl opacity-20">
                            {type === 'posts' ? <FaFileAlt /> : <FaProjectDiagram />}
                        </span>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="font-bold text-foreground text-lg leading-tight">{item.title}</h3>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {type === 'posts' ? (
                            <>
                                <StatusBadge published={item.published} />
                                <span>• {formattedDate}</span>
                                <span className="bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium">
                                    {item.category || "Geral"}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2 mr-2">
                                    {item.github_link && <a href={item.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary"><FaGithub /> Repo</a>}
                                    {item.deploy_link && <a href={item.deploy_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary"><FaExternalLinkAlt /> Live</a>}
                                </div>
                                <span className="bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium">
                                    {item.technologies?.length || 0} Techs
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onEdit}
                    className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Editar"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Excluir"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        </div>
    );
};

const StatusBadge = ({ published }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider ${published
            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
            : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
        }`}>
        {published ? 'Publicado' : 'Rascunho'}
    </span>
);

export default Dashboard;