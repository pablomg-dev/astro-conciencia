import React, { useState } from 'react';

interface LoginFormProps {
    onLoginSuccess: (user: { email: string }) => void; // Función a llamar al éxito, pasará un objeto de usuario
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    // Estados para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para los errores de validación
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    // Estado para mostrar un indicador de carga durante el envío
    const [loading, setLoading] = useState(false);

    // Estado para errores que provengan de la API (ej. credenciales incorrectas)
    const [apiError, setApiError] = useState('');

    // Función para validar los campos del formulario
    const validate = () => {
        let newErrors: { email?: string; password?: string } = {};

        // Validación de Email
        if (!email) {
            newErrors.email = 'El correo electrónico es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El formato del correo electrónico no es válido.';
        }

        // Validación de Contraseña
        if (!password) {
            newErrors.password = 'La contraseña es requerida.';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        setErrors(newErrors); // Actualiza el estado de errores
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue

        setApiError(''); // Limpia cualquier error anterior de la API

        if (validate()) { // Si la validación del frontend es exitosa
            setLoading(true); // Activa el estado de carga

            try {
                // --- AQUÍ VA TU LÓGICA DE AUTENTICACIÓN REAL CON SUPABASE O TU BACKEND ---
                // Por ahora, vamos a simular una llamada a una API
                const response = await new Promise((resolve) => setTimeout(() => {
                    if (email === 'test@example.com' && password === 'password123') {
                        // Simula un login exitoso
                        resolve({ success: true, user: { email: 'test@example.com' } });
                    } else {
                        // Simula un login fallido
                        resolve({ success: false, message: 'Credenciales inválidas. Inténtalo de nuevo.' });
                    }
                }, 1500)); // Simula un retraso de 1.5 segundos

                // @ts-ignore: Suponemos que response tiene una propiedad success.
                if (response.success) {
                    // Si el login simulado es exitoso
                    // @ts-ignore: Suponemos que response tiene una propiedad user.
                    onLoginSuccess(response.user); // Llama a la función de éxito que viene de las props
                } else {
                    // Si el login simulado falla
                    // @ts-ignore: Suponemos que response tiene una propiedad message.
                    setApiError(response.message); // Muestra el error de la API
                }
            } catch (error) {
                console.error('Error durante el proceso de login:', error);
                setApiError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false); // Desactiva el estado de carga, sin importar el resultado
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={loading} // Deshabilita el campo mientras carga
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={loading} // Deshabilita el campo mientras carga
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && (
                    <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
            </div>

            {/* Muestra errores generales de la API */}
            {apiError && <p className="mt-4 text-sm text-red-600 text-center">{apiError}</p>}

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                disabled={loading} // Deshabilita el botón mientras carga
            >
                {loading ? (
                    // Icono de carga (spinner)
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Iniciar Sesión'
                )}
            </button>
        </form>
    );
};

export default LoginForm;