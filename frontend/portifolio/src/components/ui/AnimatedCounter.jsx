import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ from = 0, to, suffix }) => {
    const nodeRef = useRef();
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (isInView) {
            const node = nodeRef.current;
            const controls = animate(from, to, {
                duration: 1.5,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.floor(value);
                }
            });
            return () => controls.stop();
        }
    }, [isInView, from, to]);

    return (
        <span className="flex items-baseline justify-center">
            <span ref={nodeRef}>{from}</span>
            <span>{suffix}</span>
        </span>
    );
};

export default AnimatedCounter;