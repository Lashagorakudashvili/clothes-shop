"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';

import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');

    const router = useRouter();


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleShopDropdown = () => {
        setIsShopDropdownOpen(!isShopDropdownOpen);
    };

    return (
        <header className="mt-[30px] text-[#000000] w-full mx-auto border-b border-gray-200 relative">
            <div className="mx-auto px-4 flex items-center h-16">
                {/* Mobile Hamburger Menu Button - positioned to the left of the logo */}
                <div className="md:hidden flex items-center">
                    <button 
                        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`h-0.5 w-6 bg-black transition-all duration-500 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`h-0.5 w-6 bg-black transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`h-0.5 w-6 bg-black transition-all duration-500 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Logo - positioned on the left with 16px gap from button */}
                <Link
                    href="/"
                    className="ml-4 md:ml-0 md:pl-[0.5rem] lg:pl-[4.7rem] xl:pl-[7rem] text-[#000000] font-bold text-2xl text-[32px] flex-shrink-0"
                >
                    SHOP.CO
                </Link>

                {/* Navigation for desktop */}
                <nav
                    className="
                        ml-[40px] hidden md:flex
                        space-x-[42px]
                        xl:space-x-[42px]
                        lg:space-x-[42px]
                        max-xl:space-x-[12px]
                    "
                >
                    <div className="relative group flex items-center space-x-1">
                        <button 
                            onClick={toggleShopDropdown} 
                            className="flex items-center hover:text-gray-600 focus:outline-none"
                        >
                            <span className='hover:cursor-pointer'>Shop</span>
                            <div className="ml-1">
                                <Image
                                    className={`hover:cursor-pointer transition-transform duration-500 ${isShopDropdownOpen ? 'rotate-180' : ''}`}
                                    src="/Arrow-Down.png"
                                    alt="Arrow Down"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </button>
                        
                        {/* Desktop Shop dropdown menu */}
                        <div className={`
                            absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50
                            transition-all duration-500 ease-in-out overflow-hidden
                            ${isShopDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
                        `}>
                            <div className="py-2">
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory('casual')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'casual' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Casual
                                    </button>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory('formal')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'formal' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Formal
                                    </button>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory('party')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'party' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Party
                                    </button>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory('gym')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'gym' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Gym
                                    </button>
                                </div>
                               <button 
                                    onClick={() => {
                                        if (selectedCategory) {
                                            router.push(`/${selectedCategory}`);
                                            setIsShopDropdownOpen(false);
                                        }
                                    }}
                                    className="w-full mt-2 py-2 px-4 bg-black text-white rounded-md"
                                    >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link href="#" className="hover:text-gray-600">
                        On Sale
                    </Link>
                    <Link href="#" className="hover:text-gray-600">
                        New Arrivals
                    </Link>
                    <Link href="#" className="hover:text-gray-600">
                        Brands
                    </Link>
                </nav>

                {/* Search */}
                <div className="ml-[40px] hidden md:flex flex-1 max-w-md">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                {/* User Actions - moved to the right */}
                <div className="md:pr-[0.5rem] lg:pr-[4.7rem] xl:pr-[7rem] flex items-center space-x-4 ml-auto">
                    <Link href="#" className="p-2 hover:bg-gray-100 rounded-full">
                        <ShoppingCart size={22} />
                    </Link>
                    <Link href="#" className="p-2 hover:bg-gray-100 rounded-full">
                        <User size={22} />
                    </Link>
                </div>
            </div>
            
            {/* Mobile dropdown menu - positioned below the header */}
            <div 
                className={`
                    md:hidden absolute left-0 right-0 bg-white w-full z-50 shadow-lg
                    transition-all duration-700 ease-in-out overflow-hidden
                    ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}
                `}
            >
                <ul className="flex flex-col w-full">
                    <li className="border-b border-gray-100">
                        <div>
                            <button 
                                onClick={toggleShopDropdown}
                                className="block w-full text-center py-4 px-4 hover:text-gray-600"
                            >
                                Shop
                            </button>
                            
                            {/* Mobile Shop dropdown submenu */}
                            <div 
                                className={`
                                    bg-gray-50 transition-all duration-700 ease-in-out overflow-hidden
                                    ${isShopDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                `}
                            >
                                {['casual', 'formal', 'party', 'gym'].map((category) => (
                                    <div key={category} className="text-center px-8 py-2 transition-all duration-300">
                                        <button 
                                            onClick={() => setSelectedCategory(category)}
                                            className={`block w-full rounded px-4 py-2 ${
                                                selectedCategory === category ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </button>
                                    </div>
                                ))}
                                <div className="px-8 py-3 flex justify-center">
                                    <button 
                                        onClick={() => {
                                            if (selectedCategory) {
                                                router.push(`/${selectedCategory}`);
                                                setIsMenuOpen(false);
                                                setIsShopDropdownOpen(false);
                                            }
                                        }}
                                        className="w-full py-2 px-4 bg-black text-white rounded-md"
                                    >
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link href="#" className="block py-4 px-4 text-center hover:text-gray-600">
                            On Sale
                        </Link>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link href="#" className="block py-4 px-4 text-center hover:text-gray-600">
                            New Arrivals
                        </Link>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link href="#" className="block py-4 px-4 text-center hover:text-gray-600">
                            Brands
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;