"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import React, { useEffect, useRef, useState, useMemo } from "react";


export default function ClothePage() {
  const { name } = useParams();
  const nameParam = Array.isArray(name) ? name[0] : name; // handle string[]
  const productName = decodeURIComponent(nameParam || "");

  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === productName
  );

  if (!product) {
    return (
      <main className="flex flex-col min-h-screen justify-center items-center">
        <p className="text-xl text-red-500">Product not found</p>
        <Link href="/" className="mt-4 text-blue-500 underline">Go back</Link>
      </main>
    );
  }


    /* colors */
    const colors = [
      { name: 'brown', bg: '#4F4631', activeBg: '#3d381f', border: '#4F4631', activeBorder: '#2c2714' },
      { name: 'green', bg: '#314F4A', activeBg: '#00661a', border: '#314F4A', activeBorder: '#004d13' },
      { name: 'blue', bg: '#31344F', activeBg: '#18205a', border: '#31344F', activeBorder: '#10153a' },
    ];
  
    const [selectedColors, setSelectedColors] = useState<boolean[]>(Array(colors.length).fill(false));
  
    const toggleColor = (index: number) => {
      const updated = [...selectedColors];
      updated[index] = !updated[index];
      setSelectedColors(updated);
    };
    /* colors */


    /* sizes */
    const sizes = [
        'Small', 'Medium', 'Large', 'X-Large',
      ];
    
      const [selectedSizes, setSelectedSizes] = useState<boolean[]>(Array(sizes.length).fill(false));
    
      const toggleSize = (index: number) => {
        const updated = [...selectedSizes];
        updated[index] = !updated[index];
        setSelectedSizes(updated);
      };
    /* sizes */


    /* product add and remove */
    const [productAmount, setpruductAmount] = useState(0);
    
    const plus = () => {
      if (productAmount < 10) {
        setpruductAmount(prev => prev + 1)
      }
    }
    const minus = () => {
      if (productAmount >= 1) {
        setpruductAmount(prev => prev - 1)
      }
    }
    /* product add and remove */


    /* product reviews */
    const cardsData = [
      {
        imgSrc: "/5-stars.png",
        name: "Sarah M.",
        chkMrk: "/green-check-mark.png",
        text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
        date: "Posted on August 14, 2020",
      },
      {
        imgSrc: "/5-stars.png",
        name: "Alex K.",
        chkMrk: "/green-check-mark.png",
        text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
        date: "Posted on August 15, 2021",
      },
      {
        imgSrc: "/5-stars.png",
        name: "James L.",
        chkMrk: "/green-check-mark.png",
        text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
        date: "Posted on August 16, 2022",
      },
      {
        imgSrc: "/5-stars.png",
        name: "Lara T.",
        chkMrk: "/green-check-mark.png",
        text: "Great experience with Shop.co! The clothes arrived fast, fit perfectly, and looked just like the pictures.",
        date: "Posted on August 17, 2023",
      },
      {
        imgSrc: "/5-stars.png",
        name: "David R.",
        chkMrk: "/green-check-mark.png",
        text: "The customer service is outstanding, and the clothes are top-notch quality. I'm a fan!",
        date: "Posted on August 18, 2024",
      },
      {
        imgSrc: "/5-stars.png",
        name: "Emily S.",
        chkMrk: "/green-check-mark.png",
        text: "Stylish, affordable, and comfortable – Shop.co has earned a loyal customer in me.",
        date: "Posted on August 19, 2025",
      }
    ]
    /* product reviews */


    /* card content/styles */
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

    
    const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
      return (
        <Link href={`/shop/${product.name.toLowerCase().replace(/\s+/g, '-')}`} className="cursor-pointer">
          <div className="md:h-full flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-all duration-200 transform hover:scale-105">
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
    /* card content/styles */





  return (
    <main className="flex flex-col min-h-screen px-6 lg:px-20">
      <p className="mt-[140px] -ml-[7px] md:ml-[5px] lg:ml-[0px] xl:ml-[2.3rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; {product.name}
      </p>


      {/* product listing */}  
      <section className="flex flex-col lg:flex-row gap-10 mt-[36px] mx-auto max-w-[1200px] w-full xl:pl-[35px]">
        {/* Left: product images */}
        <div className="flex flex-row gap-4 mx-auto md:ml-[5px]">
          {/* pc same prdct pics */}
          <div className="hidden md:flex flex-col gap-2">
            <Image
              src={product.image}
              alt="thumb1"
              width={230}
              height={230}
              className="lg:max-w-[150px] rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105"
            />
            <Image
              src={product.image}
              alt="thumb2"
              width={230}
              height={230}
              className="lg:max-w-[150px] rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105"
            />
            <Image
              src={product.image}
              alt="thumb3"
              width={230}
              height={230}
              className="lg:max-w-[150px] rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105"
            />
          </div>
          {/* pc same prdct pics */}
          {/* Big main image */}
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
            className="rounded-lg object-cover lg:max-w-[310px] xl:max-w-[400px]"
          />
          {/* Big main image */}
        </div>

        {/* mobile same prdct pics */}
        <div className="flex md:hidden flex-row gap-2 mx-auto -mt-[25px] w-full px-1">
          <Image
            src={product.image}
            alt="thumb1"
            width={180}
            height={180}
            className="flex-1 max-w-full rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 object-cover"
            style={{ minWidth: 0 }}
              />
          <Image
            src={product.image}
            alt="thumb2"
            width={180}
            height={180}
            className="flex-1 max-w-full rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 object-cover"
            style={{ minWidth: 0 }}
          />
          <Image
            src={product.image}
            alt="thumb3"
            width={180}
            height={180}
            className="flex-1 max-w-full rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 object-cover"
            style={{ minWidth: 0 }}
          />
        </div>
        {/* mobile same prdct pics */}
        {/* Left: product images */}


        {/* Right: product details */}
        <div className="flex flex-col md:ml-[10px] lg:ml-[0]">
          <h1 className="text-black text-3xl font-bold mb-2">{product.name}</h1>
          {/* Stars */}
          <div className="flex items-center mb-2">
            <Image
              src={`/${product.stars}`}
              alt="rating"
              width={104}
              height={18}
              className="object-contain"
            />
            <span className="ml-2 text-gray-700">
              {(() => {
                if (product.stars === "5-stars.png") return "5/5";
                if (product.stars === "4-5-stars.png") return "4.5/5";
                if (product.stars === "4-stars.png") return "4/5";
                if (product.stars === "3-5-stars.png") return "3.5/5";
                if (product.stars === "3-stars.png") return "3/5";
                return "";
              })()}
            </span>
          </div>
          {/* Stars */}

          {/* Price */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-black">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-4 text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="ml-4 text-red-500">{product.discount}</span>
            )}
          </div>
          {/* Price */}

          {/* Description */}
          <p className="text-gray-600 mb-6">
            This {product.name.toLowerCase()} is crafted with premium materials and offers superior comfort and style.
          </p>
          {/* Description */}

          {/* colors */}
          <div className="mt-[10px]">
            <span className="text-black">Select Colors</span>
            <div className="flex gap-[12px] mt-[10px]">
              {colors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(index)}
                  className="w-[37px] h-[37px] rounded-full border-[3px] cursor-pointer"
                  style={{
                    backgroundColor: selectedColors[index] ? color.activeBg : color.bg,
                    borderColor: selectedColors[index] ? color.activeBorder : color.border,
                  }}
                >
                </button>
              ))}
            </div>
          </div>
          {/* colors */}

          {/* Size selection */}
          <div className="mb-6 mt-[40px]">
            <h3 className="font-semibold mb-2 text-black">Choose Size</h3>
            <div className="flex flex-wrap gap-[12px]">
              {sizes.map((size, index) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(index)}
                      className={`p-[15px] rounded-full text-sm font-medium transition-all hover:bg-black hover:text-white cursor-pointer
                        ${selectedSizes[index] ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
            </div>
          </div>
          {/* Size selection */}

          {/* Quantity + Cart */}
          <div className="flex items-center gap-4">
            <button 
              className="px-3 py-1 border rounded text-black cursor-pointer transition-all hover:bg-black hover:text-white"
              onClick={minus}
              >
              -
            </button>
              <span className="text-black">{productAmount}</span>
            <button 
              className="px-3 py-1 border rounded text-black cursor-pointer transition-all hover:bg-black hover:text-white"
              onClick={plus}
            >
              +
            </button>
            
            <button className="ml-6 px-6 py-2  bg-black text-white rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105">
              Add to Cart
            </button>
          </div>
          {/* Quantity + Cart */}
        </div>
        {/* Right: product details */}
      </section>
      {/* product listing */}  


      {/* extrs */}
      <section className="mx-auto container mt-[50px] text-black">
        <div className="flex flex-row gap-[30px] md:gap-[10px] justify-center">
          <button className=" w-[414px] h-[50px] hover:cursor-pointer hover:border-b-2 hover:border-black">Product Details</button>
          <button className="w-[414px] h-[50px] hover:cursor-pointer hover:border-b-2 hover:border-black">Rating & Reviews</button>
          <button className="w-[414px] h-[50px] hover:cursor-pointer hover:border-b-2 hover:border-black">FAQs</button>
        </div>
      </section>
      {/* extrs */}


      {/* product reviews */}
      <section className="mt-[32px] mx-auto container md:px-[25px] text-black">
        {/* user review stuff */}
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            <span className="md:text-[24px] text-[15px] font-bold">All Reviews</span>
            <span className="hidden md:block ml-[10px] text-[14px] text-gray-500">(451)</span>
          </div>
          {/* Left side */}

          {/* Right side */}
          <div className="flex items-center ml-[20px] md:ml-[0]">
            <Image
              src="/filter-btn.png"
              alt="filter-btn"
              width={32}
              height={32}
              className="w-[40px] h-[40px] md:mr-[30px] hover:cursor-pointer transition-all duration-200 transform hover:scale-105"
            />

            <div className="hidden md:flex items-center hover:cursor-pointer transition-all duration-200 transform hover:scale-105">
              <span>Latest</span>
              <Image
                className="h-[20px] w-[20px] ml-[21px]"
                src="/Arrow-Down.png"
                alt="Arrow Down"
                width={20}
                height={20}
              />
            </div>

            <button className="ml-[10px] text-[14px] px-[10px] py-[10px] md:ml-[30px] md:px-6 md:py-2 md:text-[16px] bg-black text-white rounded-full hover:cursor-pointer transition-all duration-200 transform hover:scale-105">
              Write a Review
            </button>
          </div>
          {/* Right side */}
        </div>
        {/* user review stuff */}

        <div>
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cardsData.map((card, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Image src={card.imgSrc} alt="stars" width={130} height={16}  className="w-[100px] md:w-[130px]"/>
                    <span className="font-semibold ml-2 text-[16px] md:text-[20px]">{card.name}</span>
                    <Image src={card.chkMrk} alt="verified" width={24} height={18} className="ml-1 w-[20px] md:w-[24px]" />
                  </div>
                  <span className="text-gray-700 text-[18px]">{card.text}</span>
                  <span className="text-gray-700 text-[15px] mt-[24px]">{card.date}</span>
                </div>
              ))}
            </div>
              <div className="flex justify-center mt-[51px]">
                <button className="font-bold border-b-2 border-transparent hover:border-black hover:cursor-pointer">
                  Load More Reviews
                </button>
              </div>
          </div>
        </div>
      </section>
      {/* product reviews */}


      {/* recommendations */}
      <section className="my-12">
        {/* main div */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-[40px] md:text-[40px] lg:text-[50px] xl:text-[60px] text-center mt-[72px] font-extrabold mb-4 text-black">You might also like</h2>
            
          {/* Desktop view: Grid layout */}
          <div className="hidden md:grid grid-cols-4 gap-4 mt-[55px] mb-[78px]">
            {products.slice(0, 4).map((product) => (
              <ProductCard  key={product.id} product={product} />
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
              {products.slice(0, 4).map((product) => (
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
      </section>
      {/* recommendations */}


    </main>
  );
}