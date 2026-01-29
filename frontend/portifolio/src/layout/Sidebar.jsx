import React from 'react';
import { FaHome, FaUser, FaCode, FaBlog, FaEnvelope, FaGithub, FaLinkedin, FaLayerGroup } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, to, active = false }) => (
    <Link
        to={to}
        className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group
    ${active
                ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
    >
        <span className="text-lg">{icon}</span>
        <span className="tracking-wide">{label}</span>
    </Link>
);

const SocialIcon = ({ icon }) => (
    <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-white hover:text-black transition-all duration-300">
        {icon}
    </a>
);

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className='fixed left-0 top-0 h-screen w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between p-8 z-50'>

            <div className="text-center">
                <div className="relative inline-block mb-6">
                    <img
                        src="https://github.com/github.png"
                        alt="Profile"
                        className='w-32 h-32 rounded-full border-4 border-zinc-800 mx-auto hover:grayscale-0 transition-all duration-500'
                    />
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
                </div>

                <h2 className='text-2xl font-bold text-white mb-2 tracking-tight'>Pablo Ortiz</h2>
                <span className='px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full uppercase tracking-wider font-semibold'>Full Stack Developer</span>
            </div>

            <nav className='flex-1 flex flex-col justify-center space-y-2'>

                <NavItem to="/" icon={<FaHome />} label="Home" active={location.pathname === '/'} />

                <NavItem to="/templates" icon={<FaLayerGroup />} label="Templates" active={location.pathname === '/templates'} />

                <NavItem to="/#about" icon={<FaUser />} label='Sobre Mim' />
                <NavItem to="/projects" icon={<FaCode />} label='Portfólio' active={location.pathname === '/projects'} />

                <NavItem to="/#blog" icon={<FaBlog />} label='Blog' />
                <NavItem to="/#contact" icon={<FaEnvelope />} label='Contato' />
            </nav>

            <div className="flex justify-center space-x-4 pt-6 border-t border-zinc-800">
                <SocialIcon icon={<FaGithub />} />
                <SocialIcon icon={<FaLinkedin />} />
            </div>

            <div className="text-center mt-8 text-zinc-400 text-xs">
                <p>© 2026 Pablo Ortiz Developer</p>
            </div>

        </aside>
    )
}

export default Sidebar