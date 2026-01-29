import React from 'react';
import { FaLayerGroup, FaLock, FaClock } from 'react-icons/fa';

const TemplatesGallery = () => {
    
  const upcomingTemplates = [
    {
      id: 1,
      name: "SaaS Dashboard Pro",
      category: "Admin Panel",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      name: "E-commerce Starter",
      category: "Shop",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Landing Page V1",
      category: "Marketing",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="text-white min-h-screen pb-20">
      
      <div className="mb-16 mt-8">
        <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
          <FaLayerGroup /> Assets & UI Kits
        </span>
        <h1 className="text-5xl font-bold mt-2 mb-4">Galeria de Templates</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Componentes profissionais e layouts completos prontos para produção. 
          Desenvolvidos com foco em performance, acessibilidade e design system escalável.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingTemplates.map((item) => (
          <div key={item.id} className="relative group p-1 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800 opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-not-allowed">
            
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
            
            <div className="bg-zinc-950 p-8 rounded-xl h-full flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
              
              <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-2">
                <FaClock className="text-emerald-500 text-xs" />
                <span className="text-[10px] uppercase font-bold text-zinc-500">Em Desenvolvimento</span>
              </div>

              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <FaLock size={24} />
              </div>

              <h3 className="text-xl font-bold text-zinc-300">{item.name}</h3>
              <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{item.category}</p>
              
              <div className="pt-6 w-full">
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-800 w-2/3 animate-pulse"></div>
                </div>
                <p className="text-xs text-zinc-600 mt-2">Progresso: 60%</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Precisa de um template exclusivo?</h3>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          Estou aceitando encomendas para Design Systems e Dashboards personalizados em React.
        </p>
        <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20">
          Entrar em Contato
        </button>
      </div>

    </div>
  );
};

export default TemplatesGallery;