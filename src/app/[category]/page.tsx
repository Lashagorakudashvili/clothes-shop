/* page 2 (clothe listings)  */
"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import ReactSlider from 'react-slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function CategoryPage() {
  const path = usePathname(); // e.g., "/casual"
  const category = path.split("/")[1]; // "casual"

  const [isFilterOpen, setIsFilterOpen] = useState(false);

{/* mobile/pc filter */}
  {/* no scroll when filters open */}
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
  {/* no scroll when filters open */}

  {/* mobile/pc price dropdown */}
  const [isPriceDropDownOpen, setisPriceDropDownOpen] = useState(false);
 
  const togglePriceDropdown = () => {
    setisPriceDropDownOpen(prev => !prev);
  }
  {/* mobile/pc price dropdown */}

  {/* mobile/pc Color dropdown */}
  const [isColorDropDownOpen, setisColorDropDownOpen] = useState(false);

    const toggleColorDropdown = () => {
      setisColorDropDownOpen(prev => !prev);
    }

  const colors = [
    { name: 'Green', bg: '#00C12B', activeBg: '#009e25', border: '#00C12B', activeBorder: '#007d1d' },
    { name: 'Red', bg: '#F50606', activeBg: '#F50606', border: '#F50606', activeBorder: '#6d0202' },
    { name: 'Yellow', bg: '#FFD700', activeBg: '#e6c200', border: '#FFD700', activeBorder: '#bfa100' },
    { name: 'Orange', bg: '#FFA500', activeBg: '#e69500', border: '#FFA500', activeBorder: '#b36b00' },
    { name: 'Sky Blue', bg: '#87CEEB', activeBg: '#5bc0e7', border: '#87CEEB', activeBorder: '#309ab7' },
    { name: 'Blue', bg: '#0000FF', activeBg: '#0000e6', border: '#0000FF', activeBorder: '#0000b3' },
    { name: 'Purple', bg: '#800080', activeBg: '#660066', border: '#800080', activeBorder: '#4b004b' },
    { name: 'Pink', bg: '#FFC0CB', activeBg: '#f5a5b4', border: '#FFC0CB', activeBorder: '#cc8291' },
    { name: 'White', bg: '#FFFFFF', activeBg: '#f0f0f0', border: '#F7C8DA', activeBorder: '#F19CBB' },
    { name: 'Black', bg: '#000000', activeBg: '#1a1a1a', border: '#000000', activeBorder: '#333333' },
  ];

  const [selectedColors, setSelectedColors] = useState<boolean[]>(Array(colors.length).fill(false));

  const toggleColor = (index: number) => {
    const updated = [...selectedColors];
    updated[index] = !updated[index];
    setSelectedColors(updated);
  };
  {/* mobile/pc Color dropdown */}

  {/* mobile/pc size dropdown */}
  const [isSizeDropDownOpen, setisSizeDropDownOpen] = useState(false);

  const toggleSizeDropDown = () => {
    setisSizeDropDownOpen(prev => !prev)
  }

  const sizes = [
    'XX-Small', 'X-Small', 'Small',
    'Medium', 'Large', 'X-Large',
    'XX-Large', '3X-Large', '4X-Large',
  ];

  const [selectedSizes, setSelectedSizes] = useState<boolean[]>(Array(sizes.length).fill(false));

  const toggleSize = (index: number) => {
    const updated = [...selectedSizes];
    updated[index] = !updated[index];
    setSelectedSizes(updated);
  };
  {/* mobile/pc size dropdown */}

  {/* mobile/pc dress styles */}
  const [isDressStyleOpen, setisDressStyleOpen] = useState(false);

  const toggleDressStyleOpen = () => {
    setisDressStyleOpen(prev => !prev)
  }
  {/* mobile/pc dress styles */}

{/* mobile/pc filter */}


{/* mobile/pc clothes */}
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  // Star rating image filename
  stars: "3-stars.png" | "3-5-stars.png" | "4-stars.png" | "4-5-stars.png" | "5-stars.png";
}

const products: Product[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "/black-t.png",
    price: 120,
    stars: "4-5-stars.png",
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "/blue-jeans.png",
    price: 240,
    originalPrice: 260,
    discount: "20%",
    stars: "3-5-stars.png",
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: "/b-r-b-u.png",
    price: 180,
    stars: "4-5-stars.png",
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "/o-b-t.png",
    price: 130,
    originalPrice: 160,
    discount: "30%",
    stars: "4-5-stars.png",
  },
  {
    id: 5,
    name: "Vertical Striped Shirt",
    image: "/green-b-up.png",
    price: 212,
    originalPrice: 232,
    discount: "20%",
    stars: "5-stars.png",
  },
  {
    id: 6,
    name: "Courage Graphic T-Shirt",
    image: "/orange-t.png",
    price: 145,
    stars: "4-stars.png",
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link href="/coming-soon" className="cursor-pointer">
    <div className="md:h-full flex flex-col items-center bg-white rounded-lg shadow-md px-[15px] h-full md:transition-transform duration-200 hover:scale-105">
      <Image
        src={product.image}
        alt={product.name}
        width={295}
        height={298}
        className="object-cover mb-4 md:w-[250px] lg:w-[300px]"
        />
      <h2 className="text-[15px] md:text-[20px] font-semibold mb-2 text-black text-left w-full">
        {product.name}
      </h2>
      <div className="mb-2 w-full flex justify-start">
        <Image
          src={`/${product.stars}`}
          alt="rating"
          width={104}
          height={18}
          className="object-contain md:w-[70px] lg:w-[104px]"
        />
        {product.stars === "4-5-stars.png" ? (
            <span className="text-[12px] md:text-[15px] mt-[2px] md:mt-[0px] ml-[13px] text-black">4.5/5</span>
          ) : (
            <span className="text-[12px] md:text-[15px] mt-[3.5px] md:mt-[0px] ml-[13px] text-black">3.5/5</span>
          )}
      </div>
      <div className="flex items-center w-full mb-2">
        <div className="text-[20px] md:text-[25px] font-bold text-black text-left">
          ${product.price}
        </div>
        {product.originalPrice && (
          <div
            className="text-[17px] md:text-[23px] line-through text-gray-500 ml-auto"
            style={{ marginLeft: "15px" }}
            >
            ${product.originalPrice}
          </div>
        )}
        {product.discount && (
          <div
            className="text-[14px] md:text-[15px] text-red-500"
            style={{ marginLeft: product.originalPrice ? "20px" : "auto" }}
            >
            {product.discount}
          </div>
        )}
      </div>
    </div>
  </Link>
);


{/* mobile/pc clothes paginator */}
const [currentPage, setCurrentPage] = useState(1);
const totalPages = 3;

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Product[], seed: number) => {
  const shuffled = [...array];
  let random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle products based on current page (using page as seed for consistent shuffling)
const shuffledProducts = useMemo(() => {
  return shuffleArray(products, currentPage * 1000);
}, [currentPage]);

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};

const Paginator: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-[44px] mb-[50px] space-x-2">
      
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border ${
          currentPage === 1
            ? 'border-gray-300 text-gray-400'
            : 'border-gray-300 text-gray-600 hover:cursor-pointer'
        }`}
      >
        <ChevronLeft size={20} />
      </button>
      {/* Previous Button */}

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`hover:cursor-pointer px-4 py-2 rounded-lg ${
            currentPage === pageNum
              ? 'bg-black text-white'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {pageNum}
        </button>
      ))}
      {/* Page Numbers */}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border ${
          currentPage === totalPages
            ? 'border-gray-300 text-gray-400'
            : 'border-gray-300 text-gray-600 hover:cursor-pointer'
        }`}
      >
        <ChevronRight size={20} />
      </button>
      {/* Next Button */}

    </div>
  );
};
{/* mobile/pc clothes paginator */}
{/* mobile/pc clothes */}



  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <p className="mt-[140px] ml-[1rem] md:ml-[1.8rem] lg:ml-[5rem] xl:ml-[7.3rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; {category}
      </p>


      {/*  mobile page */}
      <section className="relative md:hidden">
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
          className={`pb-[25px]
            fixed -left-[18px] -right-[8px] bottom-0 top-[100px] z-40 bg-white shadow-md
            transform transition-transform duration-500 ease-in-out
            overflow-y-auto
            ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
          <div
            className={`px-4 pt-4 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

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
            
            {/* filter elements */}
            <div>

              {/* first filter elements (clothes) */}
              <div className="flex flex-col gap-3 text-[18px] mt-[35px] px-4">
                {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((item) => (
                  <label key={item} className="flex justify-between items-center gap-2">
                    <span className="text-gray-600">{item}</span>
                    <input type="checkbox" className="accent-black mr-[3px]" />
                  </label>
                ))}
              </div>
              {/* first filter elements (clothes) */}
              
              {/* second filter elements (price) */}
              <div className='mt-[44px] px-[15px]'>
                <div className='flex justify-between'> 
                  <span className='text-black text-[23px] font-bold'>Price</span>
                  <Image
                    className={`transition-transform duration-100 h-[20px] w-[20px] mt-[9px]  ${isPriceDropDownOpen ? 'rotate-180' : ''}`}
                    onClick={togglePriceDropdown}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* price range */}
                <div className={`mb-[70px] px-[20px] ${isPriceDropDownOpen ? 'block' : 'hidden'}`}>
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
              {/* second filter elements (price) */}
            
              {/* third filter elements (colors) */}
              <div className='mt-[20px] px-[15px]'>
                <div className='flex justify-between'> 
                    <span className='text-black text-[23px] font-bold'>Colors</span>
                    <Image
                      className={`transition-transform duration-100 h-[20px] w-[20px] mt-[9px]  ${isColorDropDownOpen ? 'rotate-180' : ''}`}
                      onClick={toggleColorDropdown}
                      src="/Arrow-Down.png"
                      alt="Arrow Down"
                      width={20}
                      height={20}
                    />
                </div>

                {/* colors */}
                <div className={`mt-[16px] mb-[30px] flex-wrap gap-[15.5px] ${!isColorDropDownOpen ? 'hidden' : 'flex'}`}>
                  {colors.map((color, index) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(index)}
                      className="w-[37px] h-[37px] rounded-full border-[3px]"
                      style={{
                        backgroundColor: selectedColors[index] ? color.activeBg : color.bg,
                        borderColor: selectedColors[index] ? color.activeBorder : color.border,
                      }}
                    ></button>
                  ))}
                </div>
                {/* colors */}

              </div>
              {/* third filter elements (colors) */}

              {/* fourth filter elements (sizes) */}
              <div className='mt-[20px] px-[15px]'>
                <div className='flex justify-between'> 
                  <span className='text-black text-[23px] font-bold'>Size</span>
                  <Image
                    className={`transition-transform duration-100 h-[20px] w-[20px] mt-[9px]  ${isSizeDropDownOpen ? 'rotate-180' : ''}`}
                    onClick={toggleSizeDropDown}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* sizes */}
                <div className={`mt-[16px] grid-cols-3 gap-[8px] ${!isSizeDropDownOpen ? 'hidden' : 'grid'}`}>
                  {sizes.map((size, index) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(index)}
                      className={`p-[15px] rounded-full text-sm font-medium transition-colors
                        ${selectedSizes[index] ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {/* sizes */}

              </div>
              {/* fourth filter elements (sizes) */}
            
              {/* fifth element (dress styles) */}
              <div className={`mt-[20px] px-[15px] ${isDressStyleOpen ? 'mb-[80px]' : 'mb-[240px]'}`}>
                <div className='flex justify-between'> 
                  <span className='text-black text-[23px] font-bold'>Dress Style</span>
                  <Image
                    className={`transition-transform duration-100 h-[20px] w-[20px] mt-[9px] ${isDressStyleOpen ? 'rotate-180' : ''}`}
                    onClick={toggleDressStyleOpen}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* dress styles */}
                <div className={`flex-col gap-3 text-[18px] mt-[16px] ${!isDressStyleOpen ? 'hidden' : 'flex'}`}>
                  {['Casual', 'Formal', 'Party', 'Gym'].map((item) => (
                    <label key={item} className="flex justify-between items-center gap-2">
                      <span className="text-gray-600">{item}</span>
                      <input type="checkbox" className="accent-black mr-[3px]" />
                    </label>
                  ))}
                </div>
                {/* dress styles */}

              </div>
              {/* fifth element (dress styles) */}

              {/* sixth element (apply button) */}
              <div className='mt-[20px] px-[15px]'>
                  <button className='bg-black w-full h-[48px] rounded-full'
                  onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filter
                  </button>
              </div>
              {/* sixth element (apply button) */}

            </div>
            {/* filter elements */}

          </div>
        </div>
        {/* filter dropdown */}

  
        {/* mobile clothes */}
        <section>
         <div className="mt-[36px] grid grid-cols-2 gap-[10px] justify-items-center">
            {shuffledProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        {/* mobile clothes paginator */}
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {/* mobile clothes paginator */}

        </section>
        {/* mobile clothes */}

      </section>
      {/* mobile page */}



      {/* pc page */}
      <section className="hidden md:flex mt-[50px] md:mb-[10rem] lg:mb-[8rem] xl:mb-[5rem]">
        
        {/* Left: Filters */}
        <section className="md:w-[230px] lg:w-[320px] xl:w-[380] max-h-[1220px]">

            {/* pc filter elements */}
            <div className="md:ml-[13px] lg:ml-[4rem] xl:ml-[100px]">
              <div className="flex justify-between">
                <span className="ml-[17px] font-bold text-[20px] text-black">Filters</span>
                <Image
                  src="/filter-btn.png"
                  alt="filter-btn"
                  width={32}
                  height={32}
                  className="w-[40px] h-[40px] mr-[5px]"
                    />
              </div>

              {/* first filter elements (clothes) */}
              <div className="flex flex-col gap-3 text-[18px] mt-[35px] px-4">
                {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((item) => (
                <label key={item} className="flex justify-between items-center gap-2">
                  <span className="hover:cursor-pointer text-gray-600">{item}</span>
                  <input type="checkbox" className="hover:cursor-pointer accent-black mr-[3px]" />
                </label>
                ))}
              </div>
              {/* first filter elements (clothes) */}
              
              {/* second filter elements (price) */}
              <div className="mt-[44px] px-[15px]">
                <div className="flex justify-between">
                  <span className="text-black text-[23px] font-bold">Price</span>
                  <Image
                    className={`transition-all duration-100 transform hover:scale-105 hover:cursor-pointer h-[20px] w-[20px] mt-[9px]  ${isPriceDropDownOpen ? 'rotate-180' : ''}`}
                    onClick={togglePriceDropdown}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* price range */}
                <div className={`mb-[70px] px-[20px] ${isPriceDropDownOpen ? 'block' : 'hidden'}`}>
                  <ReactSlider
                    className="horizontal-slider w-full h-2 rounded mt-[30px] mx-auto"
                    trackClassName="example-track bg-black rounded h-full"
                    defaultValue={[0, 100]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    pearling
                    minDistance={30}
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
              {/* second filter elements (price) */}
              
              {/* third filter elements (colors) */}
              <div className="mt-[20px] px-[15px]">
                <div className="flex justify-between">
                  <span className="text-black text-[23px] font-bold">Colors</span>
                    <Image
                      className={`transition-all duration-100 transform hover:scale-105 hover:cursor-pointer h-[20px] w-[20px] mt-[9px]  ${isColorDropDownOpen ? 'rotate-180' : ''}`}
                      onClick={toggleColorDropdown}
                      src="/Arrow-Down.png"
                      alt="Arrow Down"
                      width={20}
                      height={20}
                    />
                  </div>

                {/* colors */}
                <div className={`mt-[16px] mb-[30px] flex-wrap gap-[15.5px] ${!isColorDropDownOpen ? 'hidden' : 'flex'}`}>
                  {colors.map((color, index) => (
                    <button
                        key={color.name}
                        onClick={() => toggleColor(index)}
                        className="hover:cursor-pointer w-[37px] h-[37px] rounded-full border-[3px]"
                        style={{
                      backgroundColor: selectedColors[index] ? color.activeBg : color.bg,
                      borderColor: selectedColors[index] ? color.activeBorder : color.border,
                        }}
                      >
                    </button>
                  ))}
                </div>
                {/* colors */}
                
              </div>
              {/* third filter elements (colors) */}
              
              {/* fourth filter elements (sizes) */}
              <div className="mt-[20px] px-[15px]">
                <div className="flex justify-between">
                  <span className="text-black text-[23px] font-bold">Size</span>
                  <Image
                    className={`transition-all duration-100 transform hover:scale-105 hover:cursor-pointer h-[20px] w-[20px] mt-[9px]  ${isSizeDropDownOpen ? 'rotate-180' : ''}`}
                    onClick={toggleSizeDropDown}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* sizes */}
                <div className={`mt-[16px] grid-cols-3 gap-[8px] ${!isSizeDropDownOpen ? 'hidden' : 'grid'}`}>
                  {sizes.map((size, index) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(index)}
                      className={`hover:cursor-pointer p-[15px] rounded-full text-[13px] font-medium transition-colors
                    ${selectedSizes[index] ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {/* sizes */}

              </div>
              {/* fourth filter elements (sizes) */}

                {/* fifth element (dress styles) */}
                <div className={`mt-[20px] px-[15px] ${isDressStyleOpen ? 'mb-[80px]' : 'mb-[240px]'}`}>
                <div className="flex justify-between">
                  <span className="text-black text-[23px] font-bold">Dress Style</span>
                  <Image
                    className={`transition-all duration-100 transform hover:scale-105 hover:cursor-pointer h-[20px] w-[20px] mt-[9px] ${isDressStyleOpen ? 'rotate-180' : ''}`}
                    onClick={toggleDressStyleOpen}
                    src="/Arrow-Down.png"
                    alt="Arrow Down"
                    width={20}
                    height={20}
                  />
                </div>

                {/* dress styles */}
                <div className={`flex-col gap-3 text-[18px] mt-[16px] ${!isDressStyleOpen ? 'hidden' : 'flex'}`}>
                  {['Casual', 'Formal', 'Party', 'Gym'].map((item) => (
                    <label key={item} className="flex justify-between items-center gap-2">
                      <span className="hover:cursor-pointer text-gray-600">{item}</span>
                      <input type="checkbox" className="hover:cursor-pointer accent-black mr-[3px]" />
                    </label>
                  ))}
                </div>
                {/* dress styles */}

              </div>
              {/* fifth element (dress styles) */}
              
              {/* sixth element (apply button) */}
              <div className="mt-[20px] px-[15px]">
                <button
                  className="bg-black w-full h-[48px] rounded-full transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                  onClick={() => setIsFilterOpen(false)}
                    >
                  Apply Filter
                </button>
              </div>
              {/* sixth element (apply button) */}

            </div>
            {/* pc filter elements */}
          
        </section>
        {/* Left: Filters */}
        
        
        {/* Right: Content */}
        <section className="flex-1 ml-[20px] -mt-[5px]">
          
          <div className='flex justify-between'>
            <span className="text-black text-[32px] ml-[15px] font-bold">Casual</span>
            <span className='text-gray-500 text-[16px] md:mr-[35px] lg:mr-[100px] xl:mr-[140px] mt-[17px]'>Showing 1-10 of 100 Products</span>
          </div>

          {/* pc clothes */}
          <div>
            <div className="md:mr-[20px] lg:mr-[80px] xl:mr-[120px] mt-[36px] grid md:grid-cols-2 lg:grid-cols-3 gap-y-[50px] justify-items-center">
              {shuffledProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* pc clothes paginator */}
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {/* pc clothes paginator */}
          </div>
          {/* pc clothes */}

        </section>
        {/* Right: Content */}

      </section>
      {/* pc page */}

    </main>
  );
}