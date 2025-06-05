import { useState } from 'react';

interface MobileMenuProps {
    items: Array<{
        href: string;
        text: string;
    }>;
}

export default function MobileMenu({ items }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Botón hamburguesa */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#f0123f] p-2 border-2 border-[#f0123f] rounded-lg transition-colors duration-300 hover:bg-[#f0123f]/5"
                aria-label="Menú"
            >
                <div className="relative w-8 h-8">
                    {/* Línea superior */}
                    <span className={`absolute left-1/2 top-[30%] -translate-x-1/2 block w-6 h-0.5 bg-current transform transition-all duration-300 origin-center ${
                        isOpen ? 'rotate-45 translate-y-[0.33rem]' : ''
                    }`}></span>
                    {/* Línea media */}
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-6 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? 'opacity-0 scale-0' : ''
                    }`}></span>
                    {/* Línea inferior */}
                    <span className={`absolute left-1/2 bottom-[30%] -translate-x-1/2 block w-6 h-0.5 bg-current transform transition-all duration-300 origin-center ${
                        isOpen ? '-rotate-45 -translate-y-[0.33rem]' : ''
                    }`}></span>
                </div>
            </button>

            {/* Menú desplegable */}
            <div className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out ${
                isOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
                <ul className="space-y-4 text-right py-4 px-4">
                    {items.map((item, index) => (
                        <li 
                            key={item.href}
                            className={`transform transition-all duration-300 delay-[${index * 100}ms] ${
                                isOpen 
                                    ? 'opacity-100 translate-x-0' 
                                    : 'opacity-0 translate-x-4'
                            }`}
                        >
                            <a
                                href={item.href}
                                className="block text-[#f0123f] hover:text-[#ec6f60] py-2 transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 