import React from 'react';
import { FaMagic, FaLightbulb } from 'react-icons/fa';

const NotesSidebar = ({ notes, setNotes, onGenerate, isLoading }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-card border border-border p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-yellow-600">
                    <FaLightbulb />
                    <span className="text-xs font-bold uppercase">Ideias & Tópicos</span>
                </div>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-64 bg-background border border-border rounded-xl p-3 text-sm resize-none outline-none focus:border-primary"
                    placeholder="Digite aqui suas ideias soltas, tópicos ou cole um texto base..."
                />
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !notes.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <span className="animate-pulse">✨ Criando Mágica...</span>
                ) : (
                    <>
                        <FaMagic /> Gerar com IA
                    </>
                )}
            </button>
            <p className="text-[10px] text-center text-muted-foreground">
                Powered by Gemini AI
            </p>
        </div>
    );
};

export default NotesSidebar;