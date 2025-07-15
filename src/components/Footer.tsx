"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='container mx-auto pt-[50px] pl-[1rem] pr-[1rem] pb-[82px]'>
            <div className='flex flex-col md:flex-row justify-between gap-10'>
                {/* logo and soc icons */}
                <div className='flex flex-col md:w-1/3'>
                    <span className='text-[40px] font-extrabold text-black'>SHOP.CO</span>
                    <span className='text-[14px] text-gray-600 pt-[25px] max-w-full pr-[1rem] md:pr-[0px] md:max-w-[248px] leading-[22px]'>
                        We have clothes that suits your style and which you’re proud to wear. From women to men.
                    </span>
                    <div className="flex gap-4 pt-[35px]">
                        <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white hover:bg-black rounded-full p-2 transition-colors duration-200"
                        aria-label="Twitter"
                        >
                        <FaTwitter size={20} />
                        </a>
                        <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white hover:bg-black rounded-full p-2 transition-colors duration-200"
                        aria-label="Facebook"
                        >
                        <FaFacebookF size={20} />
                        </a>
                        <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white hover:bg-black rounded-full p-2 transition-colors duration-200"
                        aria-label="Instagram"
                        >
                        <FaInstagram size={20} />
                        </a>
                        <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white hover:bg-black rounded-full p-2 transition-colors duration-200"
                        aria-label="GitHub"
                        >
                        <FaGithub size={20} />
                        </a>
                    </div>
                </div>
                {/* logo and soc icons */}
                {/* about company */}
                <div className='text-black md:w-2/3'>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] lg:gap-10 xl:gap-25">
                        <div>
                            <h2 className="font-bold mb-2">COMPANY</h2>
                            <div className="flex flex-col gap-5 mt-[20px] text-gray-600">
                            <Link href="#" className="hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent">About</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Features</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Works</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Career</Link>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold mb-2">HELP</h2>
                            <div className="flex flex-col gap-5 mt-[20px] pr-[10px] text-gray-600">
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Customer Support</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Delivery Details</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Terms & Conditions</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Privacy Policy</Link>
                            </div>
                        </div>
                        <div className='mt-[24px] md:mt-[0px]'>
                            <h2 className="font-bold mb-2">FAQ</h2>
                            <div className="flex flex-col gap-5 mt-[20px] pr-[50px] text-gray-600">
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Account</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Manage Deliveries</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Orders</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Payments</Link>
                            </div>
                        </div>
                        <div className='mt-[24px] md:mt-[0px]'>
                            <h2 className="font-bold mb-2">RESOURCES</h2>
                            <div className="flex flex-col gap-5 mt-[20px] text-gray-600">
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Free ebooks</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Development Tutorial</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>How to - Blog</Link>
                            <Link href="#" className='hover:border-b-2 hover:border-black w-fit border-b-2 border-transparent'>Youtube Playlist</Link>
                            </div>
                        </div>
                    </div>
                </div>
            {/* about company */}
            </div>
            {/* copyright and payments */}
            <div className='mt-[75px] flex flex-col md:flex-row items-center justify-between'>
                <span className='text-gray-600'>Shop.co © 2000-2023, All Rights Reserved</span>
                <div className="flex gap-[20px] sm:gap-[35px] mt-4 md:mt-0">
                    <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="Visa"
                    width={50}
                    height={24}
                    style={{ objectFit: 'contain' }}
                    />
                    <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="Mastercard"
                    width={35}
                    height={24}
                    style={{ objectFit: 'contain' }}
                    />
                    <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    width={55}
                    height={40}
                    style={{ objectFit: 'contain' }}
                    />
                    <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                    alt="Apple Pay"
                    width={35}
                    height={35}
                    style={{ objectFit: 'contain' }}
                    />
                    <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                    alt="Google Pay"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
            {/* copyright and payments */}
        </footer>
    )
};

export default Footer;