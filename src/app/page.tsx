'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Home() {
  // Marquee ref for the brand scrolling bar in Section 1
  const marqueeRef = useRef<HTMLDivElement>(null);
  // Marquee ref for the brand scrolling bar in Section 1

  // Ref for the mobile carousel container (Section 2)
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  // Ref for the mobile carousel container (Section 2)

  // Array of brands for the marquee
  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];
   // Array of brands for the marquee

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marqueeContainer = marqueeRef.current;
    const marqueeContent = marqueeContainer.querySelector(".marquee-content");
    if (!marqueeContent) return;

    // Clone the brand elements multiple times for an infinite scrolling effect.
    for (let i = 0; i < 3; i++) {
      const clone = marqueeContent.cloneNode(true);
      marqueeContainer.appendChild(clone);
    }

    let animationId: number;
    let position = 0;

    const animate = () => {
      position += 0.5; // Adjust the scrolling speed here.
      const firstContentWidth = (marqueeContent as HTMLElement).offsetWidth;
      if (position >= firstContentWidth) {
        position = position - firstContentWidth;
      }
      marqueeContainer.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);


  // Scroll the mobile carousel exactly one product at a time.
  const scrollCarousel = (carouselRef: React.RefObject<HTMLDivElement>, direction: number) => {
    if (carouselRef.current) {
      const productElem = carouselRef.current.querySelector(".snap-center") as HTMLElement;
      if (productElem) {
        const productWidth = productElem.clientWidth + 16; // 16px = space-x-4
        carouselRef.current.scrollBy({
          left: direction * productWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const carouselRef1 = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const carouselRef2 = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
// Scroll the mobile carousel exactly one product at a time.


// Define the Product interface
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  // Star rating image filename
  stars: "3-5-stars.png" | "4-5-stars.png";
}
// Define the Product interface


// Updated products array using the provided image filenames in order
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
];
// Updated products array using the provided image filenames in order


// ProductCard: now fully clickable via wrapping it inside a Link.
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href="/coming-soon" className="cursor-pointer">
      <div className="md:h-full flex flex-col items-center bg-white rounded-lg shadow-md p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={295}
          height={298}
          className="object-cover mb-4"
        />
        <h2 className="text-[15px] md:text-[16.5px] lg:text-[25px] xl:text-[33px] 2xl:text-[41px] text-xl font-semibold mb-2 text-black text-left w-full">{product.name}</h2>
        <div className="mb-2 w-full flex justify-start">
          <Image
            src={`/${product.stars}`}
            alt="rating"
            width={104}
            height={18}
            className="object-contain md:w-[70px] lg:w-[104px]"
          />
          {product.stars === "4-5-stars.png" ? (
            <span className="text-[12px] md:text-[10px] lg:text-[20px] mt-[2px] md:mt-[0px] ml-[13px] text-black">4.5/5</span>
          ) :
            <span className="text-[12px] md:text-[10px] lg:text-[20px] mt-[3.5px] md:mt-[0px] ml-[13px] text-black">3.5/5</span>
          }
        </div>
        <div className="flex items-center w-full mb-2">
          <div className="text-[20px] md:text-[15px] lg:text-[25px] xl:text-[30px] text-2xl font-bold text-black text-left">${product.price}</div>
          {product.originalPrice && (
            <div className="text-[17px] md:text-[12px] lg:text-[22px] xl:text-[27px] text-sm line-through text-gray-500 ml-auto" style={{ marginLeft: "10px" }}>
              ${product.originalPrice}
            </div>
          )}
          {product.discount && (
            <div className="text-[14px] md:text-[12px] lg:text-[18px] xl:text-[21px] text-sm text-red-500" style={{ marginLeft: product.originalPrice ? "10px" : "auto" }}>
              {product.discount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
// ProductCard: now fully clickable via wrapping it inside a Link.


// Define the Product2 interface
interface Product2 {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  // Star rating image filename
  stars: "3-stars.png" | "3-5-stars.png" | "4-stars.png" | "4-5-stars.png" | "5-stars.png";
}
// Define the Product2 interface


// Updated products2 array using the provided image filenames in order
const products2: Product2[] = [
  {
    id: 1,
    name: "Vertical Striped Shirt",
    image: "/green-b-up.png",
    price: 212,
    originalPrice: 232,
    discount: "20%",
    stars: "5-stars.png",
  },
  {
    id: 2,
    name: "Courage Graphic T-Shirt",
    image: "/orange-t.png",
    price: 145,
    stars: "4-stars.png",
  },
  {
    id: 3,
    name: "Loose Fit Shorts",
    image: "/jorts.png",
    price: 80,
    stars: "3-stars.png",
  },
  {
    id: 4,
    name: "Faded Skinny Jeans",
    image: "/b-jeans.png",
    price: 210,
    stars: "4-5-stars.png",
  },
];
// Updated products2 array using the provided image filenames in order


// ProductCard2: now fully clickable via wrapping it inside a Link.
const ProductCard2: React.FC<{ product: Product2 }> = ({ product }) => {
  return (
    <Link href="/coming-soon" className="cursor-pointer">
      <div className="md:h-full flex flex-col items-center bg-white rounded-lg shadow-md p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={295}
          height={298}
          className="object-cover mb-4"
        />
        <h2 className="text-[15px] md:text-[16px] lg:text-[25px] xl:text-[33px] 2xl:text-[41px] text-xl font-semibold mb-2 text-black text-left w-full">{product.name}</h2>
        <div className="mb-2 w-full flex justify-start">
          <Image
            src={`/${product.stars}`}
            alt="rating"
            width={104}
            height={18}
            className="object-contain md:w-[70px] lg:w-[104px]"
          />
          {product.stars === "3-stars.png" ? (
            <span className="text-[12px] md:text-[10px] lg:text-[20px] mt-[7px] md:mt-[0px] ml-[13px] text-black">3/5</span>
            ) : product.stars === "4-stars.png" ? (
            <span className="text-[12px] md:text-[10px] lg:text-[20px] mt-[2px] md:mt-[0px] ml-[13px] text-black">4/5</span>
            ) : product.stars === "4-5-stars.png" ? (
            <span className="text-[12px] md:text-[10px] lg:text-[20px] ml-[13px] md:mt-[0px] text-black">4.5/5</span>
            ) : product.stars === "5-stars.png" ? (
            <span className="text-[12px] md:text-[10px] lg:text-[20px] ml-[13px] md:mt-[0px] text-black">5/5</span>
            ) : null}
        </div>
        <div className="flex items-center w-full mb-2">
          <div className="text-[20px] md:text-[15px] lg:text-[25px] xl:text-[30px] text-2xl font-bold text-black text-left">${product.price}</div>
          {product.originalPrice && (
            <div className="text-[17px] md:text-[12px] lg:text-[22px] xl:text-[27px] text-sm line-through text-gray-500 ml-auto" style={{ marginLeft: "10px" }}>
              ${product.originalPrice}
            </div>
          )}
          {product.discount && (
            <div className="text-[14px] md:text-[12px] lg:text-[18px] xl:text-[21px] text-sm text-red-500" style={{ marginLeft: product.originalPrice ? "10px" : "auto" }}>
              {product.discount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
// ProductCard2: now fully clickable via wrapping it inside a Link.



  return (
    <main className="font-sans">
      {/* Section 1 (Couple Image, Banner Info, and Marquee) */}
      <section>
        {/* main div */}
        <div className="flex flex-col">
          <div
            className="border border-transparent mt-[24px] md:bg-[url('/couple-desktop.png')] bg-no-repeat bg-center mx-auto md:bg-right md:h-[663px] w-full md:w-[90%] relative"
          >
            {/* Desktop stars */}
            <div>
              <Image
                src="/star.png"
                alt="big star"
                width={104}
                height={104}
                className="hidden md:block absolute top-[90px] right-[10px]"
              />
              <Image
                src="/star.png"
                alt="small star"
                width={56}
                height={56}
                className="absolute top-[295px] hidden 2xl:block right-[565px]"
              />
            </div>
            {/* Desktop stars */}
            
            {/* Desktop Banner Info */}
            <div className="hidden md:block px-[15px] mt-[95px]">
              <h1 className="font-bold text-[64px] leading-[64px] text-black">
                FIND CLOTHES
                <br />
                THAT MATCH
                <br />
                YOUR STYLE
              </h1>
              <p className="ml-[5px] mt-6 max-w-[600px] text-[16px] leading-[22px] text-gray-600 font-normal">
                Browse through our diverse range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense of
                style.
              </p>
            </div>
            {/* Desktop Banner Info */}
            
            {/* Mobile Banner Content */}
            <div className="md:hidden">
              <div className="mx-auto flex items-center justify-center">
                <div className="pl-[10px] pr-[30px] mt-[30px]">
                  <h1 className="font-bold text-[50px] leading-[50px] text-black">
                    FIND CLOTHES
                    <br />
                    THAT MATCH
                    <br />
                    YOUR STYLE
                  </h1>
                  <p className="ml-[5px] mt-6 max-w-[530px] text-[14.5px] leading-[22px] text-gray-600 font-normal">
                    Browse through our diverse range of meticulously crafted garments,
                    designed to bring out your individuality and cater to your sense of
                    style.
                  </p>
                </div>
              </div>
            </div>
            {/* Mobile Banner Content */}
            
            {/* Call-to-Action Button (Shop Now) */}
            <div className="flex justify-center md:justify-start">
              <Link href="/view-all">
                <button className="bg-black rounded-3xl mt-[32px] md:ml-[15px] hover:cursor-pointer text-center w-[320px] md:w-[210px] h-[52px]">
                  <span className="text-white font-medium">Shop Now</span>
                </button>
              </Link>
            </div>
            {/* Call-to-Action Button (Shop Now) */}
            
            {/* Statistics for Desktop */}
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
            {/* Statistics for Desktop */}
            
            {/* Statistics for Mobile */}
            <div className="md:hidden text-black mt-[20px] px-4">
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
              <div className="flex justify-center">
                <div className="text-center">
                  <span className="block font-bold text-[40px]">30,000+</span>
                  <span>Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
          {/* Statistics for Mobile */}
          
          {/* Mobile Couple Image */}
          <div className="block md:hidden w-full">
            <Image
              src="/couple-mobile.png"
              alt="couple stars"
              width={1920}
              height={1080}
              className="mt-[20px] w-full h-auto"
              style={{
                display: "block",
                verticalAlign: "bottom",
                marginBottom: "0",
                fontSize: "0",
                lineHeight: "0",
              }}
            />
          </div>
          {/* Mobile Couple Image */}
          
          {/* Brand Scrolling Marquee */}
          <div className="-mt-[1px] w-full bg-black h-[122px] overflow-hidden relative">
            <div ref={marqueeRef} className="flex whitespace-nowrap absolute h-full">
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
          {/* Brand Scrolling Marquee */}
        
        </div>
        {/* main div */}
      
      </section>
      {/* Section 1 (Couple Image, Banner Info, and Marquee) */}


      {/* Section 2 (Product Grid / Carousel for New Arrivals) */}
      <section className="my-12">
        {/* main div */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-[50px] sm:text-[75px] text-center mt-[72px] font-extrabold mb-4 text-black">New Arrivals</h2>
          
          {/* Desktop view: Grid layout */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Desktop view: Grid layout */}
          
          {/* Mobile view: Horizontally scrollable carousel with scroll-snap */}
          <div className="md:hidden relative">
            
            {/* Left Arrow Button */}
            <button
              onClick={() => scrollCarousel(carouselRef1, -1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Left Arrow Button */}
            
            {/* Mobile Carousel Container with scroll-snap and side padding for centering */}
            <div
              ref={carouselRef1}
              className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory px-[10vw]"
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[80vw] snap-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* Mobile Carousel Container with scroll-snap and side padding for centering */}

            {/* Right Arrow Button */}
            <button
              onClick={() => scrollCarousel(carouselRef1, 1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Right Arrow Button */}
          </div>
          {/* Mobile view: Horizontally scrollable carousel with scroll-snap */}
        </div>
        {/* main div */}
      
        {/* "View all" Button below all content */}
        <div className="flex justify-center mt-8">
          <Link href="/view-all" className="cursor-pointer text-black text-lg hover:underline">
            View All
          </Link>
        </div>
        {/* "View all" Button below all content */}
      </section>
      {/* Section 2 (Product Grid / Carousel for New Arrivals) */}

      
      {/* Section 3 (Product Grid / Carousel for Top Selling) */}
      <section className="my-12">
        {/* main div */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-[50px] sm:text-[75px] text-center mt-[128px] font-extrabold mb-4 text-black">TOP SELLING</h2>
          
          {/* Desktop view: Grid layout */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {products2.map((product) => (
              <ProductCard2 key={product.id} product={product} />
            ))}
          </div>
          {/* Desktop view: Grid layout */}
          
          {/* Mobile view: Horizontally scrollable carousel with scroll-snap */}
          <div className="md:hidden relative">
            
            {/* Left Arrow Button */}
            <button
              onClick={() => scrollCarousel(carouselRef2, -1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Left Arrow Button */}
            
            {/* Mobile Carousel Container with scroll-snap and side padding for centering */}
            <div
              ref={carouselRef2}
              className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory px-[10vw]"
            >
              {products2.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[80vw] snap-center">
                  <ProductCard2 product={product} />
                </div>
              ))}
            </div>
            {/* Mobile Carousel Container with scroll-snap and side padding for centering */}

            {/* Right Arrow Button */}
            <button
              onClick={() => scrollCarousel(carouselRef2, 1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Right Arrow Button */}
          </div>
          {/* Mobile view: Horizontally scrollable carousel with scroll-snap */}
        </div>
        {/* main div */}
      
        {/* "View all" Button below all content */}
        <div className="flex justify-center mt-8">
          <Link href="/view-all" className="cursor-pointer text-black text-lg hover:underline">
            View All
          </Link>
        </div>
        {/* "View all" Button below all content */}
      </section>
      {/* Section 3 (Product Grid / Carousel for Top Selling) */}
      

      {/* Section 4 clothe styles  */}
      <section className="mt-[150px] py-8">
        <span className="text-black block text-center px-[3rem] font-extrabold text-[50px] md:text-[50px] xl:text-[65px] 2xl:text-[75px]">
          BROWSE BY DRESS STYLE
        </span>

        <div className="mt-[64px] container mx-auto grid grid-cols-1 grid-rows-4 gap-4 px-4 md:grid-cols-3 md:grid-rows-2">
          
          {/* Casual */}
          <Link href="#" className="relative col-span-1 row-span-1 md:col-span-1 md:row-span-1">
            <span className="absolute top-4 left-4 text-black text-xl text-[36px] font-bold z-10">Casual</span>
            <Image
              src="/casual-img.png"
              alt="casual img"
              width={407}
              height={289}
              className="rounded-3xl w-full h-full object-cover"
            />
          </Link>

          {/* Formal */}
          <Link href="#" className="relative col-span-1 row-span-1 md:col-span-2 md:row-span-1">
            <span className="absolute top-4 left-4 text-black text-xl text-[36px] font-bold z-10">Formal</span>
            <Image
              src="/formal-img.png"
              alt="formal img"
              width={684}
              height={289}
              className="rounded-3xl w-full h-full object-cover"
            />
          </Link>

          {/* Party */}
          <Link href="#" className="relative col-span-1 row-span-1 md:col-span-2 md:row-span-1">
            <span className="absolute top-4 left-4 text-black text-xl text-[36px] font-bold z-10">Party</span>
            <Image
              src="/party-img.png"
              alt="party img"
              width={684}
              height={289}
              className="rounded-3xl w-full h-full object-cover"
            />
          </Link>

          {/* Gym */}
          <Link href="#" className="relative col-span-1 row-span-1 md:col-span-1 md:row-span-1">
            <span className="absolute top-4 left-4 text-black text-xl text-[36px] font-bold z-10">Gym</span>
            <Image
              src="/gym-img.png"
              alt="gym img"
              width={407}
              height={289}
              className="rounded-3xl w-full h-full object-cover"
            />
          </Link>
        </div>
      </section>
      {/* Section 4 clothe styles  */}



      {/*/////////////////////////////////////////////////////*/}
      
      {/*/////////////////////////////////////////////////////*/}



    </main>
  );
}
