import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import CompactProjectCard from '../components/ui/CompactProjectCard';
import FilterButton from '../components/ui/FilterButton';
import EmptyState from '../components/ui/EmptyState';
import { FILTERS } from '../data/projectsData';
import { portfolioService } from '../services/api.js';

const AllProjects = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const data = await portfolioService.getProjects();
                setProjects(data);
            } catch (err) {
                console.error("Erro ao buscar projetos:", err);
                setError("Não foi possível carregar os projetos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        const dbCategoryNormalized = project.category.toLowerCase().replace(/\s+/g, '');
        const filterNormalized = filter.toLowerCase().replace(/\s+/g, '');
        const matchesCategory = filter === 'todos' || dbCategoryNormalized === filterNormalized;
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-20 pt-8 max-w-7xl mx-auto px-4">
            <div className="mb-12 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link to="/" className="text-sm text-primary font-mono hover:underline flex items-center gap-2 mb-2 w-fit">
                        <FaArrowRight className="rotate-180" /> Voltar para Home
                    </Link>
                    <h1 className="text-4xl font-bold text-foreground">Repositório de Projetos</h1>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
                    <div className="relative w-full lg:w-96 group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar projeto, tecnologia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
                        />
                    </div>

                    <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 w-full lg:w-auto scrollbar-hide">
                        {FILTERS.map((f) => (
                            <FilterButton
                                key={f.value}
                                label={f.label}
                                value={f.value}
                                current={filter}
                                setFilter={setFilter}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
                    <p>Carregando projetos do servidor...</p>
                </div>
            )}

            {error && !isLoading && (
                <EmptyState
                    title="Erro de Conexão"
                    message={`${error} (Tentando em: ${API_URL})`}
                    actionLabel="Tentar Novamente"
                    onAction={() => window.location.reload()}
                />
            )}

            {!isLoading && !error && (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <CompactProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <EmptyState
                                title="Nenhum projeto encontrado"
                                message={`Não encontramos nada para "${searchTerm}" na categoria "${filter}".`}
                                actionLabel="Limpar Filtros"
                                onAction={() => { setFilter('todos'); setSearchTerm('') }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default AllProjects;