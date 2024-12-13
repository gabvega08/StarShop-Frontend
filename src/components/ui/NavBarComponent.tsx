"use client"

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUserRound, Menu, X } from 'lucide-react'
import Image from 'next/image';
const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Products",
        href: "/products",
    },
    {
        name: "Settings",
        href: "/settings",
    },
]

const NavbarComponent: FC = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <nav className="flex items-center justify-between sm:px-10 lg:px-16">
            <div className="flex items-center px-4">
                <Link href="/">
                    <Image src="/starshop-logos/StarShop-Logo.svg" alt="Logo" width={120} height={120} />
                </Link>
            </div>
            <div className={`
                fixed md:relative
                top-0 md:top-auto 
                left-0 h-full w-64
                md:w-auto md:h-auto
                bg-black md:bg-transparent
                transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                flex flex-col md:flex-row
                pt-20 md:pt-0
                px-6 md:px-6
                gap-4 md:gap-8
                shadow-lg md:shadow-none
                z-40
                md:mr-auto
            `}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-white hover:text-gray-300 relative pb-1 ${
                            pathname === item.href ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#9354FF]' : ''
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="hidden md:flex items-center">
                <button className="flex items-center border border-white rounded-full px-4 py-2">
                    <CircleUserRound className="text-white" />
                    <span className="text-white ml-2">aguilar1x</span>
                </button>
            </div>
            <button 
                className="md:hidden p-2 text-white z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </nav>
    );
};

export default NavbarComponent;