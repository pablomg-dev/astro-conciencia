import { useState } from 'react';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    coursePassword: string;
}

export default function PasswordModal({ isOpen, onClose, onSuccess, coursePassword }: PasswordModalProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === coursePassword) {
            setError('');
            onSuccess();
        } else {
            setError('Contraseña incorrecta');
            setPassword('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Cerrar"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-[#f0123f]">Ingresa la Contraseña</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0123f]"
                            placeholder="Contraseña del curso"
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#f0123f] text-white py-2 rounded-lg hover:bg-[#ec6f60] transition-colors cursor-pointer"
                    >
                        Acceder al Curso
                    </button>
                </form>
            </div>
        </div>
    );
}
