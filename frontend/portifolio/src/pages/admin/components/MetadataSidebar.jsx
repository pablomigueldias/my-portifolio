import { FaGlobe, FaCalendarAlt, FaImage } from 'react-icons/fa';

const MetadataSidebar = ({ formData, setFormData }) => (
    <aside className="col-span-12 lg:col-span-3 space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase mb-6 flex items-center gap-2 text-muted-foreground"><FaGlobe /> Status</h3>
            <label className="flex items-center justify-between p-3 bg-background rounded-xl border border-border cursor-pointer">
                <span className="text-sm font-medium">Publicado</span>
                <input 
                    type="checkbox" 
                    checked={formData.published} 
                    onChange={e => setFormData({...formData, published: e.target.checked})}
                    className="w-5 h-5 accent-primary" 
                />
            </label>
            <div className="mt-4">
                <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1 mb-1 block">Agendamento</label>
                <input 
                    type="datetime-local" 
                    value={formData.published_at}
                    onChange={e => setFormData({...formData, published_at: e.target.value})}
                    className="w-full bg-background border border-border rounded-xl p-2.5 text-xs outline-none"
                />
            </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase mb-6 flex items-center gap-2 text-muted-foreground"><FaImage /> SEO & Capa</h3>
            <input 
                placeholder="URL da Imagem"
                value={formData.image_url || ''}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                className="w-full bg-background border border-border rounded-xl p-3 text-xs outline-none mb-4"
            />
            <textarea 
                placeholder="Excerpt (Resumo)..."
                value={formData.excerpt || ''}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                className="w-full bg-background border border-border rounded-xl p-3 text-xs h-24 outline-none resize-none"
            />
        </div>
    </aside>
);
export default MetadataSidebar;