import React from 'react';
import LoginForm from './LoginForm';

interface LoginModalProps {
    isOpen: boolean; // Indica si el modal debe estar visible
    onClose: () => void; // Función para cerrar el modal
    onLoginSuccess: (user: any) => void; // Función que se llama cuando el login es exitoso
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    // Si isOpen es false, no renderizamos nada (el modal está oculto)
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative animate-fade-in-up">
                {/* Botón para cerrar el modal */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none font-bold"
                    aria-label="Cerrar modal"
                >
                    &times; {/* Esto es una 'x' grande */}
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

                {/* Aquí es donde irá el formulario de login. Por ahora, un placeholder. */}
                <p className="text-center text-gray-600">
                    [Aquí irá el formulario de login que crearemos en el siguiente paso]
                </p>

                <LoginForm onLoginSuccess={onLoginSuccess} />

            </div>
        </div>
    );
};

export default LoginModal;
