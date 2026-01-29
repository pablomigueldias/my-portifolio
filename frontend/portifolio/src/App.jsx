import React from 'react'
import Sidebar from './layout/Sidebar'

function App() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      
      <Sidebar />

      <main className="flex-1 ml-72 p-12 bg-zinc-950 min-h-screen">

        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl font-bold mb-6">Bem vindo.</h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Eu sou um desenvolvedor Full-Stack especializado em Python e React.
            Construo soluções escaláveis e interfaces modernas.
          </p>

          <div className="mt-12 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50">
            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Status do Sistema</h3>
            <ul className="space-y-2 text-zinc-300">
              <li>✅ Sidebar Componentizada</li>
              <li>✅ Tailwind v3 Configurado</li>
              <li>✅ React Icons Instalado</li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  )
}

export default App