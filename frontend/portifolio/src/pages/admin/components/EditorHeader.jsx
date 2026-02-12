import React from 'react';
import { FaArrowLeft, FaSave, FaEye, FaPen, FaSpinner } from 'react-icons/fa';

const EditorHeader = ({ isEditing, onSave, isSaving, viewMode, setViewMode, onBack }) => {
    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack} 
                    className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">
                        {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
                    </h1>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
                    <button
                        onClick={() => setViewMode('editor')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'editor' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                    >
                        <FaPen size={10} /> Editor
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                    >
                        <FaEye size={10} /> Preview
                    </button>
                </div>

                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg active:scale-95 transition-all disabled:opacity-70"
                >
                    {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </div>
    );
};

export default EditorHeader;