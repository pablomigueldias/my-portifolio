import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { FaDownload, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Hero = () => {
    const handleDownloadCV = () => {
        alert("Funcionalidade de Download será implementada na Sprint de Assets")
    }
    return (
        <section id='home' className='min-h-80 flex flex-col justify-center items-start'>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-emerald-900/10 border border-emerald-500/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-100/90 text-[11px] font-semibold tracking-widest uppercase">
                    Disponível para projetos
                </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Olá, eu sou <span className="text-zinc-500">Pablo</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-zinc-400 mb-8 h-20">
                Eu construo{' '}
                <span className="text-white font-semibold border-b-4 border-emerald-500">
                    <Typewriter
                        words={['Sistemas Escaláveis', 'Interfaces Modernas', 'APIs Robustas', 'Full Stack Solutions']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h2>
            <p className="max-w-xl text-lg text-zinc-500 mb-10 leading-relaxed">
                Especialista em transformar ideias complexas em código limpo usando
                <strong className="text-zinc-300"> Python (FastAPI)</strong> e
                <strong className="text-zinc-300"> React</strong>.
                Focado em performance, arquitetura e boa documentação.
            </p>

            <div className="flex flex-wrap gap-4">
                <button
                    onClick={handleDownloadCV}
                    className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-900/20 transform hover:-translate-y-1"
                >
                    <FaDownload />
                    Download CV
                </button>

                <Link
                    to="/projects"
                    className="flex items-center gap-3 px-8 py-4 bg-transparent border border-zinc-700 text-white hover:bg-zinc-800 rounded-xl font-bold transition-all duration-300"
                >
                    Meus Projetos
                    <FaArrowRight className="text-xs" />
                </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-900 w-full">
                <p className="text-zinc-600 text-sm mb-4 uppercase tracking-widest font-bold">Tech Stack Principal</p>
                <div className="flex gap-6 text-zinc-500 grayscale hover:grayscale-0 transition-all duration-500">

                    <span className="hover:text-yellow-400 transition-colors cursor-default font-mono">Python</span>
                    <span className="hover:text-blue-400 transition-colors cursor-default font-mono">React</span>
                    <span className="hover:text-teal-400 transition-colors cursor-default font-mono">FastAPI</span>
                    <span className="hover:text-orange-600 transition-colors cursor-default font-mono">Git</span>
                    <span className="hover:text-blue-600 transition-colors cursor-default font-mono">Docker</span>
                </div>
            </div>



        </section>
    )
}

export default Hero