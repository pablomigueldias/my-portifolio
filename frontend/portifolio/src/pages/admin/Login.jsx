import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [key, setKey] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (key.trim()) {
            login(key);
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-card p-8 rounded-2xl border border-border shadow-xl"
            >
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Access</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-muted-foreground block mb-2">API Key de Administrador</label>
                        <input 
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-primary outline-none transition-all"
                            placeholder="Insira sua MASTER_KEY..."
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:brightness-110 transition-all"
                    >
                        Entrar no Painel
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;