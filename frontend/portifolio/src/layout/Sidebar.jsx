import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome, FaUser, FaCode, FaBlog, FaEnvelope,
    FaGithub, FaLinkedin, FaLayerGroup, FaMoon, FaSun, FaBars, FaTimes
} from 'react-icons/fa';

const NAV_ITEMS = [
    { to: "/", icon: FaHome, label: "Home", exact: true },
    { to: "/templates", icon: FaLayerGroup, label: "Templates" },
    { to: "/projects", icon: FaCode, label: "Portfólio" },
    { to: "/blog", icon: FaBlog, label: "Blog", matchStart: true },
    { to: "/#about", icon: FaUser, label: "Sobre Mim" },
    { to: "/contact", icon: FaEnvelope, label: "Contato" },
];

const SOCIAL_LINKS = [
    { href: "https://github.com/seu-user", icon: FaGithub },
    { href: "https://linkedin.com/in/seu-user", icon: FaLinkedin },
];

const Sidebar = () => {
    const location = useLocation();
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme === 'dark' : true;
        }
        return true;
    });

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleNavigation = (e, to) => {
        if (to === '/' && location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (to.includes('#') && location.pathname === '/') {
            e.preventDefault();
            const elementId = to.replace('/#', '');
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileOpen(false);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full justify-between p-8">
            <div className="text-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-block mb-6"
                >
                    <img
                        src="https://github.com/github.png"
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-muted mx-auto transition-all duration-500 hover:border-primary"
                    />
                    <span className="absolute bottom-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-card animate-pulse"></span>
                </motion.div>

                <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Pablo Ortiz</h2>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full uppercase tracking-wider font-semibold border border-border">
                    Full Stack Developer
                </span>
            </div>

            <nav className="flex-1 flex flex-col justify-center space-y-2 mt-8 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = item.matchStart
                        ? location.pathname.startsWith(item.to)
                        : location.pathname + location.hash === item.to || location.pathname === item.to;

                    return (
                        <NavItem
                            key={item.label}
                            {...item}
                            active={isActive}
                            onClick={(e) => handleNavigation(e, item.to)}
                        />
                    );
                })}
            </nav>

            <div className="flex flex-col gap-6 pt-6 border-t border-border mt-auto">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="flex items-center justify-center gap-3 w-full py-2 rounded-lg bg-muted text-foreground hover:bg-border transition-colors text-sm font-medium"
                >
                    {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-purple-500" />}
                    <span>{isDark ? "Modo Claro" : "Modo Escuro"}</span>
                </button>

                <div className="flex justify-center space-x-4">
                    {SOCIAL_LINKS.map((social, index) => (
                        <SocialIcon key={index} {...social} />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* 1. BOTÃO HAMBÚRGUER (Agora aparece até no Tablet -> lg:hidden) */}
            <button
                onClick={() => setIsMobileOpen(true)}
                // MUDANÇA AQUI: md:hidden -> lg:hidden
                className="lg:hidden fixed top-4 right-4 z-[60] p-3 bg-card border border-border rounded-xl shadow-lg text-primary"
            >
                <FaBars size={24} />
            </button>

            {/* 2. SIDEBAR DESKTOP (Agora só aparece em telas Grandes -> hidden lg:flex) */}
            {/* MUDANÇA AQUI: hidden md:flex -> hidden lg:flex */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-card border-r border-border flex-col z-50 shadow-2xl">
                <SidebarContent />
            </aside>

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />

                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-card border-r border-border z-[70] shadow-2xl overflow-y-auto"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>

                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const NavItem = ({ icon: Icon, label, to, active, onClick }) => (
    <Link to={to} onClick={onClick} className="relative block">
        {active && (
            <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary/10 border-l-4 border-primary rounded-r-xl"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}

        <div className={`relative flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group
      ${active
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
        >
            <span className="text-lg"><Icon /></span>
            <span className="tracking-wide">{label}</span>
        </div>
    </Link>
);

const SocialIcon = ({ href, icon: Icon }) => (
    <motion.a
        whileHover={{ y: -3, scale: 1.1 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
    >
        <Icon />
    </motion.a>
);

export default Sidebar;