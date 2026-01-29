import React from 'react'
import { Routes, Route } from 'react-router-dom' // Importe o Routes
import Sidebar from './layout/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import ProjectDetails from './pages/ProjectDetails'
import TemplatesGallery from './pages/TemplatesGallery'
import AllProjects from './pages/AllProjects'



const Home = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Portfolio />
  </>
);

function App() {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-white">
      <Sidebar />

      <main className="flex-1 ml-72 p-8 md:p-12 lg:p-20 bg-zinc-950 min-h-screen">
        <div className="max-w-5xl mx-auto">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/projeto/:id" element={<ProjectDetails />} />
            <Route path="/templates" element={<TemplatesGallery />} />
          </Routes>

        </div>
      </main>
    </div>
  )
}

export default App