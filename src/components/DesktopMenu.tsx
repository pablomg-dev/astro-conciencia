import { useState } from 'react';

interface MenuItem {
    href?: string;
    text: string;
    isDropdown?: boolean;
    items?: MenuItem[];
}

interface DesktopMenuProps {
    items: MenuItem[];
}

export default function DesktopMenu({ items }: DesktopMenuProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleMouseEnter = (text: string) => {
        setOpenDropdown(text);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <ul className="hidden md:flex gap-6">
            {items.map((item) => (
                <li
                    key={item.text}
                    className="relative"
                    onMouseEnter={() => item.isDropdown && handleMouseEnter(item.text)}
                    onMouseLeave={handleMouseLeave}
                >
                    {item.isDropdown ? (
                        <div>
                            <button className="text-[#f0123f] hover:text-[#ec6f60] text-base md:text-lg">
                                {item.text}
                                <span className={`ml-1 inline-block transform transition-transform ${openDropdown === item.text ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            {openDropdown === item.text && item.items && (
                                <ul className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                                    {item.items.map((subItem) => (
                                        <li key={subItem.text}>
                                            <a
                                                href={subItem.href}
                                                className="block px-4 py-2 text-[#f0123f] hover:bg-gray-50 hover:text-[#ec6f60]"
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
                            className="text-[#f0123f] hover:text-[#ec6f60] text-base md:text-lg"
                        >
                            {item.text}
                        </a>
                    )}
                </li>
            ))}
        </ul>
    );
} 