import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 py-8 border-t border-border bg-background transition-colors duration-300 text-center">
      
      <div className="flex justify-center gap-6 mb-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
        >
          <FaGithub size={22} />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-[#0077b5] transition-all duration-300 hover:scale-110"
        >
          <FaLinkedin size={22} />
        </a>
      </div>

      <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
        Desenvolvido com <FaHeart className="text-red-500 animate-pulse" /> e muito café por 
        <span className="text-foreground font-bold font-mono">Pablo Ortiz</span>
      </p>

      <p className="text-muted-foreground/60 text-xs mt-2">
        © {currentYear} - Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;