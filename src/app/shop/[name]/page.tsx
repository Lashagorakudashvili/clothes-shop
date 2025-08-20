"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";


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


  
  /* //////////////////////// */
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
    /* //////////////////////// */





  return (
    <main className="flex flex-col min-h-screen px-6 lg:px-20">
      <p className="mt-[140px] -ml-[7px] md:ml-[5px] lg:ml-[0px] xl:ml-[2.3rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; {product.name}
      </p>



      {/* /////////////////////////////// */}  
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
                        ></button>
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
      {/* /////////////////////////////// */}  



    </main>
  );
}
