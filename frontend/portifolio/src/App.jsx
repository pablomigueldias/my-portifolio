import React from 'react'
import Sidebar from './layout/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
function App() {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-white">
      <Sidebar />

      <main className="flex-1 ml-72 p-8 md:p-12 lg:p-20 bg-zinc-950 min-h-screen">
        <div className="max-w-5xl mx-auto">

          <Hero />

          <About />

          <Skills />

          <Portfolio />



          <div className="h-screen"></div>
        </div>
      </main>
    </div>
  )
}

export default App