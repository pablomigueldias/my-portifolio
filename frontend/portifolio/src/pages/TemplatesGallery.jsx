import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import SectionTitle from '../components/ui/SectionTitle';
import TemplateCard from '../components/ui/TemplateCard';
import CtaBox from '../components/ui/CtaBox';
import { TEMPLATES } from '../data/templatesData';
import { staggerContainer } from '../utils/animations';
const TemplatesGallery = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4">

                <div className="mt-8 mb-16">
                    <SectionTitle subtitle="Assets & UI Kits" title="Galeria de Templates" />
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed -mt-10">
                        Componentes profissionais e layouts completos prontos para produção.
                        Desenvolvidos com foco em performance, acessibilidade e design system escalável.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {TEMPLATES.map((item) => (
                        <TemplateCard key={item.id} template={item} />
                    ))}
                </motion.div>

                <CtaBox
                    title="Precisa de um template exclusivo?"
                    description="Estou aceitando encomendas para Design Systems, Dashboards Corporativos e Landing Pages de alta conversão."
                    buttonText="Solicitar Orçamento"
                    link="/contact"
                />

            </div>
        </section>
    );
};

export default TemplatesGallery;