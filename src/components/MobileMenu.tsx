import { useState } from 'react';

interface MenuItem {
    href?: string;
    text: string;
    isDropdown?: boolean;
    items?: MenuItem[];
}

interface MobileMenuProps {
    items: MenuItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdownClick = (text: string) => {
        setOpenDropdown(openDropdown === text ? null : text);
    };

    return (
        <div className="md:hidden">
            {/* Botón hamburguesa */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#f0123f] p-2 border-2 border-[#f0123f] rounded-lg transition-colors duration-300 hover:bg-[#f0123f]/5 cursor-pointer"
                aria-label="Menú"
            >
                <div className="relative w-8 h-8">
                    {/* Línea superior */}
                    <span className={`absolute left-1/2 top-[30%] -translate-x-1/2 block w-6 h-0.5 bg-current transform transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[0.33rem]' : ''}`}></span>
                    {/* Línea media */}
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
                    {/* Línea inferior */}
                    <span className={`absolute left-1/2 bottom-[30%] -translate-x-1/2 block w-6 h-0.5 bg-current transform transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[0.33rem]' : ''}`}></span>
                </div>
            </button>

            <div className={`fixed inset-x-0 top-[4.5rem] bg-white border-t border-[#f0123f] shadow-lg transform transition-all duration-300 z-40 ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <ul className="space-y-4 text-center py-4">
                    {items.map((item, index) => (
                        <li
                            key={item.text}
                            className={`transform transition-all duration-300 delay-[${index * 100}ms] ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                        >
                            {item.isDropdown ? (
                                <div>
                                    <button
                                        onClick={() => handleDropdownClick(item.text)}
                                        className="inline-block text-[#f0123f] hover:text-[#ec6f60] py-2 transition-colors duration-300 cursor-pointer"
                                    >
                                        {item.text}
                                        <span className={`ml-2 inline-block transform transition-transform ${openDropdown === item.text ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </button>
                                    {openDropdown === item.text && item.items && (
                                        <ul className="mt-2 space-y-2 bg-gray-50 py-2">
                                            {item.items.map((subItem) => (
                                                <li key={subItem.text}>
                                                    <a
                                                        href={subItem.href}
                                                        className="inline-block text-[#f0123f] hover:text-[#ec6f60] py-1 transition-colors duration-300 cursor-pointer"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subItem.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <a
                                    href={item.href}
                                    className="inline-block text-[#f0123f] hover:text-[#ec6f60] py-2 transition-colors duration-300 cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.text}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
