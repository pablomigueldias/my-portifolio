import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {

        if (!hash) {
            window.scrollTo(0, 0);
        } 
        else {
            const timer = setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;