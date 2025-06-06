import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface AuthCheckProps {
    children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setError(error.message);
        } else {
            setIsAuthenticated(true);
            setError('');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        // Chequea la sesión al montar
        supabase.auth.getSession().then(({ data }) => {
            setIsAuthenticated(!!data.session);
        });

        // Escucha cambios de sesión (login/logout)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        // Limpia el listener al desmontar
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    if (isAuthenticated) {
        return (
            <div>
                <button
                    onClick={handleLogout}
                    className="mb-6 bg-gray-200 text-[#f0123f] px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                    Cerrar sesión
                </button>
                {children}
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-[#f0123f] mb-6">Iniciar Sesión</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec6f60]"
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec6f60]"
                        placeholder="********"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#f0123f] text-white py-2 px-4 rounded-lg hover:bg-[#ec6f60] transition-colors"
                >
                    Acceder
                </button>
            </form>
        </div>
    );
}
