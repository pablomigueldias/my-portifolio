import { FaMagic, FaSpinner, FaFileUpload, FaTrashAlt } from 'react-icons/fa';

const NotesSidebar = ({ notes, setNotes, onGenerate, onFileUpload, isLoading }) => {

    // Handler para capturar o arquivo arrastado do Obsidian
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.md')) {
            onFileUpload(file);
        }
    };

    return (
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <FaMagic className="text-primary animate-pulse" /> Brain Dump
                </span>
                {notes && (
                    <button onClick={() => setNotes('')} className="text-muted-foreground hover:text-destructive transition-colors">
                        <FaTrashAlt size={12} />
                    </button>
                )}
            </div>

            {/* Área de Drop/Input Blindada */}
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="group relative flex-1 flex flex-col gap-2"
            >
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Cole notas ou arraste seu .md aqui..."
                    className="flex-1 w-full p-5 bg-card/50 backdrop-blur-sm border border-border rounded-3xl resize-none focus:ring-4 ring-primary/5 outline-none font-mono text-sm leading-relaxed transition-all scrollbar-hide hover:border-primary/30"
                />

                {/* Overlay de Upload Visual */}
                {!notes && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-muted-foreground/40 opacity-100 group-hover:text-primary/40 transition-colors">
                        <FaFileUpload size={32} className="mb-2" />
                        <p className="text-[10px] font-medium">DROP YOUR MARKDOWN</p>
                    </div>
                )}
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || (!notes.trim() && !isLoading)}
                className={`w-full py-5 rounded-3xl font-black text-xs tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 ${isLoading
                        ? "bg-muted text-muted-foreground cursor-wait"
                        : "bg-primary text-primary-foreground hover:shadow-primary/20 hover:-translate-y-1"
                    }`}
            >
                {isLoading ? (
                    <FaSpinner className="animate-spin text-lg" />
                ) : (
                    <>
                        <FaMagic /> GERAR ARTIGO
                    </>
                )}
            </button>

            <p className="text-[9px] text-center text-muted-foreground/60 leading-tight px-4">
                A IA usará o modelo <b>Gemini 2.5 Flash</b> para estruturar seu pensamento.
            </p>
        </aside>
    );
};

export default NotesSidebar;