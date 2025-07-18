/* page 2 (clothe listings)  */
"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";


export default function CategoryPage() {
  const path = usePathname(); // e.g., "/casual"
  const category = path.split("/")[1]; // "casual"

  const [isFilterOpen, setIsFilterOpen] = useState(false);


{/* ///////////// mobile filter (no scroll when filters open) ////////////// */}
const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isFilterOpen, setIsFilterOpen]);
{/* ///////////// mobile filter (no scroll when filters open) ////////////// */}


  return (
    <main className="flex flex-col min-h-screen">
      <p className="mt-[140px] ml-[1rem] md:ml-[1.8rem] lg:ml-[5rem] xl:ml-[7.3rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; {category}
      </p>



      {/* ///////////// mobile filter ////////////// */}
      <section className="relative container block md:hidden">
        <div className="flex justify-between items-center px-[0.8rem] mt-[12px]">
          <div>
            <span className="text-black font-bold text-[24px]">{category}</span>
            <span className="text-gray-500 text-[14px] ml-[10px]">
              Showing 1–10 of 100 Products
            </span>
          </div>

          <button onClick={() => setIsFilterOpen(true)}>
            <Image
              src="/filter-btn.png"
              alt="filter-btn"
              width={32}
              height={32}
              className="w-[40px] h-[40px]"
            />
          </button>
        </div>

        {/* first filter and main dropdown */}
        <div
          ref={panelRef}
          className={`
            fixed my-[7rem] pr-[8px] top-0 right-0 z-40 h-screen bg-white border-l rounded-l-lg shadow-md
            overflow-hidden transition-[width] duration-500 ease-in-out
            ${isFilterOpen ? 'w-full' : 'w-0'}
          `}
        >
          <div className={`transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0'} 
                            h-full overflow-y-auto`}>
            <div className="flex justify-between items-center px-4 pt-4">
              <span className="font-bold text-[20px] text-black">Filters</span>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-[20px] font-bold text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Type of clothes */}
            <div className="flex flex-col gap-3 text-[18px] mt-[35px] px-4">
              {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((item) => (
                <label key={item} className="flex justify-between items-center gap-2">
                  <span className="text-gray-600">{item}</span>
                  <input type="checkbox" className="accent-black mr-[3px]" />
                </label>
              ))}
            </div>
            {/* Type of clothes */}
          </div>
        </div>
        {/* first filter and main dropdown */}
            

        {/*
        <div>
        
        </div>
        */}


      </section>
      {/* ///////////// mobile filter ////////////// */}
    
    
    
    </main>
  );
}
