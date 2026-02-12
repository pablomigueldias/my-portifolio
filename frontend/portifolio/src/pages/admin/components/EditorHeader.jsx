import { FaChevronLeft, FaSave, FaCode, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditorHeader = ({ slug, onSave, viewMode, setViewMode }) => {
    const navigate = useNavigate();
    return (
        <header className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin')} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <FaChevronLeft />
                </button>
                <h1 className="text-2xl font-bold tracking-tight">
                    {slug ? 'Refinar Artigo' : 'Nova Automação via Gemini Pro'}
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex bg-muted p-1 rounded-lg">
                    <button onClick={() => setViewMode('editor')} className={`px-4 py-2 rounded-md text-xs font-bold ${viewMode === 'editor' ? 'bg-background shadow-sm' : 'opacity-50'}`}>
                        <FaCode className="inline mr-2" /> EDITOR
                    </button>
                    <button onClick={() => setViewMode('preview')} className={`px-4 py-2 rounded-md text-xs font-bold ${viewMode === 'preview' ? 'bg-background shadow-sm' : 'opacity-50'}`}>
                        <FaEye className="inline mr-2" /> PREVIEW
                    </button>
                </div>
                <button onClick={onSave} className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold hover:brightness-110 shadow-lg">
                    <FaSave /> SALVAR
                </button>
            </div>
        </header>
    );
};
export default EditorHeader;