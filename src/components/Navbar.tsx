"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    
    const router = useRouter();
    const pathname = usePathname();
    const navbarRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    
    // Add animation keyframes to the component and handle window resizing
    useEffect(() => {
        // Add keyframes for search width expansion animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes widthExpand {
                from { width: 0; opacity: 0; padding-left: 0; }
                to { width: 100%; opacity: 1; padding-left: 1rem; }
            }
            .animate-widthExpand {
                animation: widthExpand 0.3s ease-in-out forwards;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    
    // Handle window resize events - separated from animation effects
    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            // Only clear search input on mobile
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setSearchQuery('');
            }
            
            // Close expanded search on mobile when going to desktop
            if (typeof window !== 'undefined' && window.innerWidth >= 768 && isSearchExpanded) {
                setIsSearchExpanded(false);
            }
        };
        
        // Only add event listener if window is defined (client-side)
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            
            // Clean up the event listener
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isSearchExpanded]);

    // Focus on search input when expanded
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);
    
    // Parse the category from URL and set it in state on component mount AND clear when on homepage
    useEffect(() => {
        // Check if the current path matches a category
        const validCategories = ['casual', 'formal', 'party', 'gym'];
        const currentPath = pathname.substring(1); // Remove leading slash
        
        if (validCategories.includes(currentPath)) {
            setSelectedCategory(currentPath);
        } else if (pathname === '/' || pathname.startsWith('/search')) {
            // Clear selected category when on homepage or search results page
            setSelectedCategory('');
            setSearchQuery('');
        }
    }, [pathname]);
    
    // Close dropdown menus when clicking outside, but with special search behavior
    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            const isSearchContainer = searchContainerRef.current && 
                searchContainerRef.current.contains(event.target);
            
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            
            // For mobile: close everything when clicking outside navbar
            if (isMobile && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsShopDropdownOpen(false);
                setIsSearchExpanded(false);
                setSearchQuery('');
            } 
            // For desktop: only close shop dropdown when clicking outside navbar or search
            else if (!isMobile && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsShopDropdownOpen(false);
                // Don't clear search on desktop as per requirement
            }
            // For desktop: close dropdown when clicking search area
            else if (!isMobile && isSearchContainer && isShopDropdownOpen) {
                setIsShopDropdownOpen(false);
            }
        }
        
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShopDropdownOpen]);
    
    const toggleShopDropdown = () => {
        setIsShopDropdownOpen(!isShopDropdownOpen);
    };

    const toggleMenu = () => {
        // Close shop dropdown when closing the main menu
        if (isMenuOpen) {
            setIsShopDropdownOpen(false);
        }
        setIsSearchExpanded(false);
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        // If search is expanded, perform search
        if (isSearchExpanded) {
            handleSearch();
        } else {
            // Toggle search bar and close other menus
            setIsMenuOpen(false); // Close mobile dropdown when search is clicked
            setIsShopDropdownOpen(false); // Close shop dropdown when search is clicked
            setIsSearchExpanded(!isSearchExpanded);
        }
    };

    // Handle search submission - modified to clear selected category
    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Clear selected category when searching
            setSelectedCategory('');
            
            // Redirect to search results page with the query
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            
            // Only clear search on mobile
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setSearchQuery('');
            }
            // Close the search bar on mobile
            if (isSearchExpanded) {
                setIsSearchExpanded(false);
            }

            if (pathname.length !== 0 && pathname === '/' || '/search?q') {
                setSearchQuery('');
            }
        }
    };

    // Handle Enter key press in search input
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Apply category filter
    const applyFilter = () => {
        if (selectedCategory) {
            router.push(`/${selectedCategory}`);
        } else {
            // Redirect to home when no category is selected
            router.push('/');
        }
        setIsShopDropdownOpen(false);
        setIsMenuOpen(false);
    };

    // Clear filter and navigate to home
    const goToHome = () => {
        setSelectedCategory('');
        router.push('/');
    };


    return (
        <header ref={navbarRef} className="relative shadow-sm py-4">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button
                    type="button"
                    className="md:hidden p-2 rounded-md ml-2"
                    onClick={toggleMenu}
                >
                    <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>

                {/* Logo - positioned with proper padding based on screen size */}
                <Link
                    href="/"
                    onClick={goToHome}
                    className={`
                        ${isSearchExpanded ? 'opacity-0 w-0 md:opacity-100 md:w-auto' : 'opacity-100 w-auto'}
                        transition-all duration-300
                        ml-2 sm:ml-4 md:ml-4 lg:ml-0 md:pl-2 lg:pl-[4.7rem] xl:pl-[7rem] 
                        text-[#000000] font-bold text-2xl md:text-3xl lg:text-4xl flex-shrink-0
                    `}
                >
                    SHOP.CO
                </Link>

                {/* Navigation for desktop */}
                <nav
                    className={`
                        ${isSearchExpanded ? 'md:opacity-0 md:w-0' : 'md:opacity-100 md:w-auto'}
                        transition-all duration-300
                        ml-[20px] md:ml-[30px] hidden md:flex
                        space-x-[25px] md:space-x-[30px]
                        xl:space-x-[42px]
                        lg:space-x-[35px]
                        text-gray-900 font-medium
                    `}
                >
                    <div className="relative group flex items-center space-x-1">
                        <button 
                            onClick={toggleShopDropdown} 
                            className="flex items-center text-gray-900 hover:text-black focus:outline-none font-medium"
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
                                        onClick={() => setSelectedCategory(selectedCategory === 'casual' ? '' : 'casual')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'casual' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Casual
                                    </button>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory(selectedCategory === 'formal' ? '' : 'formal')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'formal' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Formal
                                    </button>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory(selectedCategory === 'party' ? '' : 'party')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'party' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Party
                                    </button>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100">
                                    <button 
                                        onClick={() => setSelectedCategory(selectedCategory === 'gym' ? '' : 'gym')} 
                                        className={`px-4 py-2 cursor-pointer w-full text-left ${
                                            selectedCategory === 'gym' ? 'bg-black text-white rounded-md' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        Gym
                                    </button>
                                </div>
                                <button 
                                    onClick={applyFilter}
                                    className="hover:cursor-pointer w-full mt-2 py-2 px-4 bg-black text-white rounded-md"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link href="#" className="text-gray-900 hover:text-black font-medium">
                        On Sale
                    </Link>
                    <Link href="#" className="text-gray-900 hover:text-black font-medium">
                        New Arrivals
                    </Link>
                    <Link href="#" className="text-gray-900 hover:text-black font-medium">
                        Brands
                    </Link>
                </nav>

                {/* Search */}
                <div 
                    ref={searchContainerRef}
                    className={`
                        relative flex items-center
                        ${isSearchExpanded 
                            ? 'flex-1 z-10 absolute left-0 w-full px-2 md:px-4 md:static md:w-auto md:max-w-md' 
                            : 'hidden md:flex lg:ml-[30px] flex-1 max-w-md'}
                        transition-all duration-300
                        sm:ml-[5px]
                    `}
                >
                    <div className="relative w-full flex items-center">
                        {/* phone search */}
                        {isSearchExpanded && (
                            <button 
                                onClick={toggleSearch}
                                className="block md:hidden mr-2 p-2 text-gray-900">
                                <Search size={22} />
                            </button>
                        )}
                        {/* phone search */}
                        {/* pc search */}
                        {!isSearchExpanded && (
                            <button 
                                onClick={handleSearch}
                                className="hidden md:block absolute left-3 top-2.5 text-gray-800">
                                <Search className='hover:cursor-pointer' size={18} />
                            </button>
                        )}
                        {/* pc search */}
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search"
                            className={`
                                w-full py-2 pr-4 bg-gray-100 rounded-lg focus:outline-none text-gray-900
                                ${isSearchExpanded ? 'pl-0' : 'pl-10'}
                                ${isSearchExpanded ? 'block animate-widthExpand' : 'hidden md:block'}
                            `}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                {/* Mobile Search Icon */}
                <div className={`md:hidden ml-auto ${isSearchExpanded ? 'hidden' : 'flex'}`}>
                    <button 
                        onClick={toggleSearch}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-900"
                    >
                        <Search size={22} />
                    </button>
                </div>

                {/* User Actions - moved to the right with added padding for smaller screens */}
                <div className={`
                    ${isSearchExpanded ? 'hidden md:flex' : 'flex'} 
                    pr-4 md:pr-4 lg:pr-[4.7rem] xl:pr-[7rem] 
                    items-center space-x-2 md:space-x-4 
                    ${isSearchExpanded ? 'md:ml-auto' : 'ml-2 md:ml-auto'}
                    text-gray-900
                `}>
                    <Link href="#" className="p-1 md:p-2 hover:bg-gray-100 rounded-full">
                        <ShoppingCart size={22} strokeWidth={2} />
                    </Link>
                    <Link href="#" className="p-1 md:p-2 hover:bg-gray-100 rounded-full md:mr-[0.5rem] lg:mr-[0.8rem] xl:mr-[1rem]">
                        <User size={22} strokeWidth={2} />
                    </Link>
                </div>
            </div>
            
            {/* Mobile dropdown menu - positioned below the header */}
            <div 
                className={`
                    md:hidden absolute left-0 right-0 bg-white w-full z-40 shadow-lg
                    transition-all duration-700 ease-in-out overflow-hidden
                    ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}
                    text-gray-900 font-medium
                `}
            >
                <ul className="flex flex-col w-full">
                    <li className="border-b border-gray-100">
                        <div>
                            <button 
                                onClick={toggleShopDropdown}
                                className="block w-full text-center py-4 px-4 text-gray-900 hover:text-black font-medium"
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
                                            onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
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
                                        onClick={applyFilter}
                                        className="w-full py-2 px-4 bg-black text-white rounded-md"
                                    >
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link href="#" className="block py-4 px-4 text-center text-gray-900 hover:text-black font-medium">
                            On Sale
                        </Link>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link href="#" className="block py-4 px-4 text-center text-gray-900 hover:text-black font-medium">
                            New Arrivals
                        </Link>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link href="#" className="block py-4 px-4 text-center text-gray-900 hover:text-black font-medium">
                            Brands
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;