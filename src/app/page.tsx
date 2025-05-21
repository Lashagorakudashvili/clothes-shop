'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // List of brands to display in the marquee
  const brands = [
    "VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein" 
  ];

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const marqueeContainer = marqueeRef.current;
    const marqueeContent = marqueeContainer.querySelector('.marquee-content');
    if (!marqueeContent) return;
    
    // Clone the brand elements multiple times to ensure continuous infinite scrolling
    for (let i = 0; i < 3; i++) {
      const clone = marqueeContent.cloneNode(true);
      marqueeContainer.appendChild(clone);
    }
    
    let animationId: number;
    let position = 0;
    
    const animate = () => {
      position += 0.5; // Controls the speed
      
      // Reset position seamlessly when needed to create infinite loop
      const firstContentWidth = (marqueeContent as HTMLElement).offsetWidth;
      if (position >= firstContentWidth) {
        position = position - firstContentWidth;
      }
      
      marqueeContainer.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="font-sans">
      <div className="flex flex-col">
        {/* Main content section */}
        <div className="border border-transparent mt-[24px] md:bg-[url('/couple-crop-desktop(no-background).png')] bg-no-repeat bg-center mx-auto md:bg-right md:h-[663px] w-[100%] md:w-[90%]">
          {/* desktop stars */}
          <div>
            <Image 
              src="/star.png"
              alt="big star"
              width={104}
              height={104}
              className="hidden md:block absolute top-[195px] right-[110px]"
            />

            <Image 
              src="/star.png"
              alt="small star"
              width={56}
              height={56}
              className="absolute top-[430px] sm:hidden 2xl:block right-[660px]"
            />
          </div>
          {/* desktop stars */}
          
          {/* desktop models banner info */}
          <div className="hidden md:block px-[15px] mt-[95px]">
            <h1 className="font-bold text-[64px] leading-[64px] text-black">
              FIND CLOTHES<br />
              THAT MATCH<br />
              YOUR STYLE
            </h1>

            <p className="ml-[5px] mt-6 max-w-[600px] text-[16px] leading-[22px] text-gray-600 font-normal">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
          </div>
          {/* desktop models banner info */}

          {/* Mobile content */}
          <div>
            <div className="md:hidden mx-auto flex items-center justify-center">
              <div className="pl-[10px] pr-[30px] mt-[30px]">
                <h1 className="font-bold text-[50px] leading-[50px] text-black">
                  FIND CLOTHES<br />
                  THAT MATCH<br />
                  YOUR STYLE
                </h1>

                <p className="ml-[5px] mt-6 max-w-[530px] text-[14.5px] leading-[22px] text-gray-600 font-normal">
                  Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
              </div>
            </div>
          </div>
          {/* Mobile content */}

          {/* Button container - centered on mobile, left aligned on desktop */}
          <div className="flex justify-center md:justify-start">
            <button className="bg-black rounded-3xl mt-[32px] md:ml-[15px] hover:cursor-pointer text-center w-[358px] md:w-[210px] h-[52px]">
              <span className="text-white font-medium">Shop Now</span>
            </button>
          </div>
          {/* Button container - centered on mobile, left aligned on desktop */}

          {/* Statistics - desktop view */}
          <div className="hidden md:flex text-black mt-[48px] ml-[20px] justify-between max-w-[596px]">
            <div>
              <span className="block font-bold text-[40px]">200+</span>
              <span>International Brands</span>
            </div>
            <div>
              <span className="block font-bold text-[40px]">2000+</span>
              <span>High-Quality Products</span>
            </div>
            <div>
              <span className="block font-bold text-[40px]">30,000+</span>
              <span>Happy Customers</span>
            </div>
          </div>
          {/* Statistics - desktop view */}

          {/* Statistics - mobile view (2 on top, 1 centered below) */}
          <div className="md:hidden text-black mt-[20px] px-4">
            {/* Top row with two items */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <span className="block font-bold text-[40px]">200+</span>
                <span>International Brands</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-[40px]">2000+</span>
                <span>High-Quality Products</span>
              </div>
            </div>
            {/* Bottom row with single centered item */}
            <div className="flex justify-center">
              <div className="text-center">
                <span className="block font-bold text-[40px]">30,000+</span>
                <span>Happy Customers</span>
              </div>
            </div>
          </div>
          {/* Statistics - mobile view (2 on top, 1 centered below) */}
        </div>
        {/* main content section */}
        
        {/* Mobile couple with stars - outside the previous container to avoid margin issues */}
        <div className="block md:hidden w-full">
          <Image 
            src="/couple-stars-mobile(no-background).png"
            alt="couple stars"
            width={1920}
            height={1080}
            className="mt-[20px] w-full h-auto align-bottom"
            style={{ display: 'block', verticalAlign: 'bottom', marginBottom: '0', fontSize: '0', lineHeight: '0' }}
          />
        </div>
        {/* Mobile couple with stars - outside the previous container to avoid margin issues */}

        {/* Brand scrolling bar - directly after the mobile image */}
        <div className="-mt-[1px] w-full bg-black h-[122px] overflow-hidden relative">
          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap absolute h-full"
          >
            <div className="marquee-content flex items-center h-full">
              {brands.map((brand, index) => (
                <div 
                  key={index} 
                  className="mx-16 text-white text-3xl font-bold flex items-center justify-center h-full"
                >
                  {brand === "Calvin Klein" ? (
                    <span className="font-normal">{brand}</span>
                  ) : (
                    <span>{brand}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Brand scrolling bar - directly after the mobile image */}
      </div>
    </section>
  );
}