import React from 'react';
import { FaCalendarAlt, FaImage, FaTags, FaAlignLeft } from 'react-icons/fa';

const MetadataSidebar = ({ formData, setFormData }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-xs font-bold uppercase text-muted-foreground">Status</label>
                <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg border border-border">
                    <input 
                        type="checkbox" 
                        checked={formData.published}
                        onChange={e => setFormData({...formData, published: e.target.checked})}
                        className="w-4 h-4 text-primary rounded focus:ring-primary cursor-pointer"
                    />
                    <span className={`text-sm font-bold ${formData.published ? 'text-green-500' : 'text-yellow-500'}`}>
                        {formData.published ? 'Publicado' : 'Rascunho'}
                    </span>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <FaCalendarAlt /> Data de Publicação
                    </label>
                    <input 
                        type="date" 
                        value={formData.published_at ? formData.published_at.split('T')[0] : ''}
                        onChange={e => setFormData({...formData, published_at: e.target.value})}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <p className="text-[10px] text-muted-foreground">
                        Se a data for futura, o post será agendado.
                    </p>
                </div>
            </div>

            <hr className="border-border" />

            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <FaTags /> Categoria
                </label>
                <input 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                    placeholder="Ex: Python"
                />
            </div>

            {/* Capa */}
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <FaImage /> URL da Imagem
                </label>
                <input 
                    value={formData.image_url || ''}
                    onChange={e => setFormData({...formData, image_url: e.target.value})}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary truncate"
                    placeholder="https://..."
                />
                {formData.image_url && (
                    <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-border">
                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

             <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <FaAlignLeft /> Resumo
                </label>
                <textarea 
                    value={formData.excerpt || ''}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary h-24 resize-none"
                    placeholder="Um breve resumo para o card..."
                />
            </div>
        </div>
    );
};

export default MetadataSidebar;