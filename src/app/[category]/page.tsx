/* page 2 (clothe listings)  */
"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactSlider from 'react-slider';


export default function CategoryPage() {
  const path = usePathname(); // e.g., "/casual"
  const category = path.split("/")[1]; // "casual"

  const [isFilterOpen, setIsFilterOpen] = useState(false);


{/* ///////////// mobile filter ////////////// */}
  {/* ///////////// no scroll when filters open ////////////// */}
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
  {/* ///////////// no scroll when filters open ////////////// */}


  {/* ///////////// mobile price dropdown  ////////////// */}
  const [isPriceDropDownOpen, setisPriceDropDownOpen] = useState(false);
 
  const togglePriceDropdown = () => {
    setisPriceDropDownOpen(prev => !prev);
  }
  


  {/* ///////////// mobile price dropdown  ////////////// */}



{/* ///////////// mobile filter ////////////// */}


  return (
    <main className="flex flex-col min-h-screen">
      <p className="mt-[140px] ml-[1rem] md:ml-[1.8rem] lg:ml-[5rem] xl:ml-[7.3rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; {category}
      </p>



      {/* ///////////// mobile filter ////////////// */}
      <section  id='' className="relative container md:hidden">
        <div className="flex justify-between items-center px-[0.8rem] mt-[12px]">
          <div>
            <span className="text-black font-bold text-[24px]">{category}</span>
            <span className="text-gray-500 text-[14px] ml-[10px]">
              Showing 1–10 of 100 Products
            </span>
          </div>

          {/* filter button */}
          <button onClick={() => setIsFilterOpen(true)}>
            <Image
              src="/filter-btn.png"
              alt="filter-btn"
              width={32}
              height={32}
              className="w-[40px] h-[40px]"
            />
          </button>
          {/* filter button */}
        </div>

        {/* filter dropdown */}
        <div
          ref={panelRef}
          className={`
            fixed -mt-[6rem] z-40 h-screen w-full  bg-white border-l rounded-l-lg shadow-md
            transition-transform duration-500 ease-in-out
            ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div
            className={`
              transition-opacity duration-300 h-full overflow-y-auto
              ${isFilterOpen ? 'opacity-100 mr-[8px]' : 'opacity-0'}
            `}>

            {/* X button */}
            <div className="flex justify-between items-center px-4 pt-4">
              <span className="font-bold text-[20px] text-black">Filters</span>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-[20px] font-bold text-gray-600"
              >
                ✕
              </button>
            </div>
            {/* X button */}
            

            {/*/////////////////// filter elements ///////////////////*/}
            <div>
              {/* first filter elements */}
              <div className="flex flex-col gap-3 text-[18px] mt-[35px] px-4">
                {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((item) => (
                  <label key={item} className="flex justify-between items-center gap-2">
                    <span className="text-gray-600">{item}</span>
                    <input type="checkbox" className="accent-black mr-[3px]" />
                  </label>
                ))}
              </div>
              {/* first filter elements */}
              
              
              {/* second filter elements */}
              <div className='mt-[44px] px-[15px]'>
                <div className='flex justify-between'> 
                  <span className='text-black text-[23px] font-bold'>Price</span>
                  <Image
                    className={`hover:cursor-pointer transition-transform duration-100 h-[20px] w-[20px] mt-[9px]  ${isPriceDropDownOpen ? 'rotate-180' : ''}`}
                    onClick={togglePriceDropdown}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* price range */}
                <div className={`px-[20px] ${isPriceDropDownOpen ? 'block' : 'hidden'}`}>
                  <ReactSlider
                    className="horizontal-slider w-full h-2 rounded mt-[30px] mx-auto"
                    trackClassName="example-track bg-black rounded h-full"
                    defaultValue={[0, 100]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    pearling
                    minDistance={15}
                    renderThumb={(props, state) => {
                      const { key, ...rest } = props;
                      return (
                        <div key={key} {...rest} className="relative flex flex-col items-center -mt-2">
                          <div className="h-6 w-6 bg-black rounded-full cursor-grab shadow-md" />
                          <div className="mt-[10px] text-[20px] font-[500] text-black select-none">${state.valueNow}</div>
                        </div>
                      );
                    }}
                  />
                </div>
               {/* price range */}
              </div>
              {/* second filter elements */}
            
            

              {/*/////////////////// third filter elements ///////////////////*/}
              
              {/*/////////////////// third filter elements ///////////////////*/}


            
            </div>
            {/*/////////////////// filter elements ///////////////////*/}
          
          
          </div>
        </div>
        {/* filter dropdown */}
      </section>
      {/* ///////////// mobile filter ////////////// */}
    
    
    
    </main>
  );
}
