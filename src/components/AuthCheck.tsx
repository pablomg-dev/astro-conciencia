import { useState } from 'react';

interface AuthCheckProps {
    children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí irá la lógica de autenticación con Supabase
        // Por ahora, simulamos la autenticación
        if (email && password) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Por favor, completa todos los campos');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
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
