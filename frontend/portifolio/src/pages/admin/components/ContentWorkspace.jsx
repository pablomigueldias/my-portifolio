import { motion, AnimatePresence } from 'framer-motion';
import MarkdownRenderer from '../../../components/ui/MarkdownRenderer';

const ContentWorkspace = ({ formData, setFormData, viewMode }) => (
    <main className="col-span-12 lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
            {viewMode === 'editor' ? (
                <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 h-full flex flex-col">
                    <input 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="Título do Artigo"
                        className="w-full text-3xl font-black bg-transparent border-b border-border/50 pb-4 outline-none"
                    />
                    <textarea 
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        placeholder="Conteúdo em Markdown..."
                        className="w-full flex-1 bg-transparent resize-none outline-none font-mono text-base min-h-[400px]"
                    />
                </motion.div>
            ) : (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
                    <h1 className="text-4xl font-black mb-8">{formData.title}</h1>
                    <MarkdownRenderer content={formData.content} />
                </motion.div>
            )}
        </AnimatePresence>
    </main>
);
export default ContentWorkspace;