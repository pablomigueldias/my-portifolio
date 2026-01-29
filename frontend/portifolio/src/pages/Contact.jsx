import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const Contact = () => {
  
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Dados do formulário:", data);
        setSuccess(true);
        reset();

        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Vamos conversar?
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
                        Contato
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        Tem uma ideia de projeto ou quer discutir uma oportunidade?
                        Preencha o formulário ou me chame nas redes sociais. Respondo em até 24h.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >

                        <AnimatePresence mode='wait'>
                            {success ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                        <FaCheckCircle className="text-5xl text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Mensagem Enviada!</h3>
                                    <p className="text-muted-foreground max-w-xs mx-auto">
                                        Obrigado pelo contato. Verifiquei os dados e retornarei em breve.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                    <div className="group">
                                        <label className="block text-sm font-bold text-foreground mb-2">Seu Nome</label>
                                        <input
                                            {...register("name", { required: "O nome é obrigatório" })}
                                            className={`w-full bg-muted/30 border ${errors.name ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50`}
                                            placeholder="Ex: João Silva"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-foreground mb-2">Seu Email</label>
                                        <input
                                            {...register("email", {
                                                required: "O email é obrigatório",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Email inválido"
                                                }
                                            })}
                                            className={`w-full bg-muted/30 border ${errors.email ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50`}
                                            placeholder="Ex: joao@empresa.com"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-foreground mb-2">Mensagem</label>
                                        <textarea
                                            {...register("message", { required: "A mensagem não pode estar vazia" })}
                                            rows="5"
                                            className={`w-full bg-muted/30 border ${errors.message ? 'border-red-500' : 'border-border'} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50`}
                                            placeholder="Conte-me sobre seu projeto..."
                                        ></textarea>
                                        {errors.message && <span className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</span>}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <><FaSpinner className="animate-spin" /> Enviando...</>
                                        ) : (
                                            <><FaPaperPlane /> Enviar Mensagem</>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <ContactCard
                            icon={FaEnvelope}
                            title="Email"
                            description="Para assuntos profissionais e parcerias."
                            value="pablo@dev.com"
                            link="mailto:pablo@dev.com"
                        />

                        <ContactCard
                            icon={FaWhatsapp}
                            title="WhatsApp"
                            description="Para mensagens rápidas."
                            value="+55 (11) 99999-9999"
                            link="https://wa.me/5511999999999"
                        />

                        <ContactCard
                            icon={FaMapMarkerAlt}
                            title="Localização"
                            description="Disponível para trabalho remoto mundial ou presencial em:"
                            value="São Paulo, Brasil"
                            isText
                        />

                        <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 mt-8">
                            <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Status Atual
                            </h4>
                            <p className="text-muted-foreground text-sm">
                                Estou aceitando novos projetos freelance e oportunidades Full-time para Março/2026.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const ContactCard = ({ icon: Icon, title, description, value, link, isText }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-card border border-border p-6 rounded-2xl flex items-start gap-5 hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
    >
        <div className="p-4 bg-muted rounded-xl text-primary text-xl">
            <Icon />
        </div>
        <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{description}</p>
            {isText ? (
                <span className="text-foreground font-mono font-medium block">{value}</span>
            ) : (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary font-mono font-bold hover:underline underline-offset-4 decoration-primary/30 transition-all">
                    {value}
                </a>
            )}
        </div>
    </motion.div>
);

export default Contact;