import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

import { ContactCard, FormInput, FormTextArea } from '../components/ui/ContactComponents';
import SectionTitle from '../components/ui/SectionTitle';
import { CONTACT_INFO } from '../data/contactData';

import { contactService } from '../services/api';

const Contact = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [success, setSuccess] = useState(false);
    
    const [submitError, setSubmitError] = useState(null);

    const onSubmit = async (data) => {
        setSubmitError(null);
        
        try {
            await contactService.sendMessage(data);

            setSuccess(true);
            reset();
            
            setTimeout(() => setSuccess(false), 5000);
            
        } catch (error) {
            console.error("Erro no envio:", error);
            
            if (error.response && error.response.status === 429) {
                setSubmitError("Muitas tentativas. Por favor, aguarde um minuto antes de enviar novamente.");
            } else {
                setSubmitError("Houve um erro ao enviar sua mensagem. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <section className="min-h-screen pb-20 pt-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">

                <div className="mb-12">
                    <SectionTitle subtitle="Vamos conversar?" title="Contato" />
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed -mt-10">
                        Tem uma ideia de projeto ou quer discutir uma oportunidade?
                        Preencha o formulário ou me chame nas redes sociais. Respondo em até 24h.
                    </p>
                </div>

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

                                    <FormInput
                                        label="Seu Nome"
                                        name="name"
                                        register={register}
                                        error={errors.name}
                                        placeholder="Ex: João Silva"
                                        rules={{ required: "O nome é obrigatório" }}
                                    />

                                    <FormInput
                                        label="Seu Email"
                                        name="email"
                                        type="email"
                                        register={register}
                                        error={errors.email}
                                        placeholder="Ex: joao@empresa.com"
                                        rules={{
                                            required: "O email é obrigatório",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Email inválido"
                                            }
                                        }}
                                    />

                                    <FormTextArea
                                        label="Mensagem"
                                        name="message"
                                        register={register}
                                        error={errors.message}
                                        placeholder="Conte-me sobre seu projeto..."
                                        rules={{ required: "A mensagem não pode estar vazia" }}
                                    />

                                    {submitError && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium"
                                        >
                                            <FaExclamationCircle />
                                            {submitError}
                                        </motion.div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
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
                        {CONTACT_INFO.map((info) => (
                            <ContactCard key={info.id} {...info} />
                        ))}

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

export default Contact;