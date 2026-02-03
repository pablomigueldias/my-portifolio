import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Skills from './components/sections/Skills.jsx'
import Portfolio from './components/sections/Portfolio.jsx'
import ProjectDetails from './pages/ProjectDetails'
import TemplatesGallery from './pages/TemplatesGallery'
import AllProjects from './pages/AllProjects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import ScrollToTop from './components/functional/ScrollToTop.jsx'

const Home = () => (

  <div className="w-full overflow-x-hidden">
    <Hero />
    <About />
    <Skills />
    <Portfolio />
  </div>
);

function App() {
  return (

    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white transition-colors duration-300 overflow-x-hidden">

      <ScrollToTop />

      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-72 p-6 md:p-12 lg:p-20 min-h-screen flex flex-col transition-all duration-300 overflow-x-hidden w-full relative">
        <div className="max-w-6xl mx-auto w-full flex-1">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/projeto/:id" element={<ProjectDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/templates" element={<TemplatesGallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

        </div>

        <Footer />

      </main>
    </div>
  )
}

export default App