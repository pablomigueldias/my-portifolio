import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../data/socialLinks.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 py-8 border-t border-border bg-background transition-colors duration-300 text-center">

      <div className="flex justify-center gap-6 mb-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`text-muted-foreground transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
          >
            <social.icon size={22} />
          </a>
        ))}
      </div>

      <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
        Desenvolvido por <span className="text-foreground font-bold font-mono">Pablo Ortiz</span>
      </p>

      <p className="text-muted-foreground/60 text-xs mt-2">
        © {currentYear} - Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;