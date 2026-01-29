import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import ProjectDetails from './pages/ProjectDetails'
import TemplatesGallery from './pages/TemplatesGallery'
import AllProjects from './pages/AllProjects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Footer from './pages/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'


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
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white transition-colors duration-300">

      <ScrollToTop />

      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-72 p-6 md:p-12 lg:p-20 min-h-screen flex flex-col transition-all duration-300">
        <div className="max-w-5xl mx-auto w-full flex-1">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/projeto/:id" element={<ProjectDetails />} />
            <Route path="/templates" element={<TemplatesGallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

        </div>

        <Footer />

      </main>
    </div>
  )
}

export default App