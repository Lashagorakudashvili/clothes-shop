"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="mt-[30px] text-[#000000] w-full  mx-auto border-b border-gray-200">
            
            <div className=" mx-auto px-4 flex items-center h-16">
                {/* Logo */}
                <Link
                    href="#"
                    className="md:pl-[0.5rem] lg:pl-[4.7rem] xl:pl-[7rem] text-[#000000] font-bold text-2xl text-[32px] flex-shrink-0"
                >
                    SHOP.CO
                </Link>

                {/* Navigation */}
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
                        <Link href="#" className="hover:text-gray-600">
                            Shop
                        </Link>
                        <Image
                            className="hover:cursor-pointer"
                            src="/Arrow-Down.png"
                            alt="Arrow Down"
                            width={20}
                            height={20}
                        />
                        {/* Dropdown menu could be added here */}
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

                {/* User Actions */}
                <div className="md:pr-[0.5rem] lg:pr-[4.7rem] xl:pr-[7rem] flex items-center space-x-4 ml-auto">
                    <Link href="#" className="p-2 hover:bg-gray-100 rounded-full">
                        <ShoppingCart size={22} />
                    </Link>
                    <Link href="#" className="p-2 hover:bg-gray-100 rounded-full">
                        <User size={22} />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;