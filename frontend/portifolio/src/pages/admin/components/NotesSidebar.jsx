import React, { useRef } from 'react';
import { FaFileUpload, FaStickyNote } from 'react-icons/fa';

const NotesSidebar = ({ notes, setNotes, onGenerate, onFileUpload, isLoading }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) onFileUpload(file);
    };

    return (
        <div className="space-y-6">

            <div
                className="bg-card border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-6 text-center cursor-pointer group relative overflow-hidden"
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".md,.txt"
                    className="hidden"
                />

                <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                    <div className="p-3 bg-secondary rounded-full group-hover:scale-110 transition-transform text-primary">
                        <FaFileUpload size={20} />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground">
                            Upload de Arquivo
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Arraste seu .md ou clique aqui
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <FaStickyNote /> Notas Rápidas
                </div>

                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Cole ideias soltas, rascunhos ou tópicos aqui para a IA processar..."
                    className="w-full h-48 bg-secondary/30 border border-border/50 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 custom-scrollbar"
                />

                <button
                    onClick={onGenerate}
                    disabled={isLoading || !notes.trim()}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg text-sm shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? "Gerando..." : "✨ Gerar Artigo com IA"}
                </button>
            </div>
        </div>
    );
};

export default NotesSidebar;