"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

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

  return (
    <main className="flex flex-col min-h-screen px-6 lg:px-20">
      <p className="mt-[140px] ml-[1rem] md:ml-[2.2rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; {product.name}
      </p>



      {/* /////////////////////////////// */}  
      <section className="flex flex-col lg:flex-row gap-10 mt-[36px] ml-[35px]">
        {/* Left: product images */}
        <div className="flex flex-row gap-4">
          {/* Thumbnails on the left */}
          <div className="flex flex-col gap-2">
            <Image
              src={product.image}
              alt="thumb1"
              width={130}
              height={130}
              className="rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105"
            />
            <Image
              src={product.image}
              alt="thumb2"
              width={130}
              height={130}
              className="rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105"
            />
            <Image
              src={product.image}
              alt="thumb3"
              width={130}
              height={130}
              className="rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105"
            />
          </div>

          {/* Big main image */}
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Right: product details */}
        <div className="flex flex-col max-w-xl">
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

          {/* Description */}
          <p className="text-gray-600 mb-6">
            This {product.name.toLowerCase()} is crafted with premium materials and offers superior comfort and style.
          </p>

          {/* Size selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-black">Choose Size</h3>
            <div className="flex gap-3">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  className="cursor-pointer px-4 py-2 border rounded-md hover:bg-black hover:text-white transition text-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className="flex items-center gap-4">
            <button className="px-3 py-1 border rounded text-black cursor-pointer">-</button>
            <span className="text-black">1</span>
            <button className="px-3 py-1 border rounded text-black cursor-pointer">+</button>
            <button className="ml-6 px-6 py-2 bg-black text-white rounded-full cursor-pointer transition-all duration-200 transform hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      {/* /////////////////////////////// */}  



    </main>
  );
}
