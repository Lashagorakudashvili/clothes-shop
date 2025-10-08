/* page 4 (cart)  */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  discount?: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);


  /* cart logic */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  /* cart logic */


  /* total and discount logic */
  useEffect(() => {
    /* total logic */
    const subtotalValue = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    /* total logic */


    /* discount logic */
    const discountValue = cart.reduce((acc, item) => {
      let discountNum = 0;
      if (item.discount) {
        discountNum = parseFloat(item.discount.replace("%", ""));
      }
      return acc + (item.price * item.quantity * discountNum) / 100;
    }, 0);
    /* discount logic */

    setSubtotal(subtotalValue);
    setDiscountTotal(discountValue);
  }, [cart]);
  /* total and discount logic */


  /* remove item logic */
  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  /* remove item logic */


  /* plus logic */
  const plus = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  /* plus logic */


  /* minus logic */
  const minus = (id: number) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  /* minus logic */



  const deliveryFee = 15;
  const total = subtotal - discountTotal + deliveryFee;
  


  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-20 text-black">
      {/* Breadcrumb */}
      <p className="mt-[120px] ml-0 md:ml-[5px] lg:ml-[0rem] xl:ml-[2.3rem] sm:mt-[140px] text-black text-[1rem] sm:text-[1.1rem]">
        <Link href={"/"}>Home</Link> &gt; Cart
      </p>
      {/* Breadcrumb */}

      {/* Page Title */}
      <section className="container mt-6">
        <div className="text-black">
          <span className="text-[2.2rem] ml-0 md:ml-[5px] lg:ml-[0rem] xl:ml-[2.3rem] sm:text-[2.7rem] font-extrabold">
            YOUR CART
          </span>
        </div>
      </section>
      {/* Page Title */}

      {/* CART ITEMS + SUMMARY */}
      <section className="xl:px-[35px] flex flex-col lg:flex-row justify-between mt-8 gap-8 w-full max-w-[1200px] mx-auto">
        {/* LEFT: Items */}
        <div className="flex-1 flex flex-col gap-6">
          {cart.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row justify-between border border-gray-200 rounded-lg p-3 sm:p-5 shadow-sm bg-white gap-3 sm:gap-5"
              >
                {/* Image + Info */}
                <div className="flex w-full sm:w-auto gap-3 sm:gap-5">
                  {/* Item image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover flex-shrink-0 sm:w-[140px] sm:h-[140px]"
                  />
                  {/* Item image */}

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-10 sm:pr-12 md:pr-14">
                    <h3 className="font-semibold text-black text-[16px] sm:text-[20px] break-words leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-gray-600 text-[0.75rem] sm:text-[0.95rem] truncate">
                      Size: {item.size || "Large"}
                    </p>
                    <p className="text-gray-600 text-[0.75rem] sm:text-[0.95rem] truncate">
                      Color: {item.color || "White"}
                    </p>
                    <p className="text-black font-bold mt-1 sm:mt-2 text-[18px] sm:text-[24px] truncate">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  {/* Info */}
                </div>
                {/* Image + Info */}

                {/* Delete Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="hover:cursor-pointer absolute top-3 sm:top-5 right-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition"
                >
                  <Image
                    src="/delete-btn.png"
                    alt="delete"
                    width={22}
                    height={22}
                    className="hover:opacity-70"
                  />
                </button>
                {/* Delete Button */}

                {/* Quantity controls */}
                <div className="absolute bottom-3 right-4 flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() =>
                      item.quantity === 1 ? removeItem(item.id) : minus(item.id)
                    }
                    className="hover:cursor-pointer border border-gray-400 rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] hover:bg-black hover:text-white transition"
                  >
                    −
                  </button>
                  <span className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => item.quantity <= 9 ? plus(item.id) : ''}
                    className="hover:cursor-pointer border border-gray-400 rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] hover:bg-black hover:text-white transition"
                  >
                    +
                  </button>
                </div>
                {/* Quantity controls */}
              </div>
            ))
          )}
        </div>
        {/* LEFT: Items */}


        {/* RIGHT: Summary */}
        {cart.length > 0 && (
          /* pricing */
          <div className="lg:w-[350px] border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-4 h-fit bg-white shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-700 text-[0.9rem] sm:text-[1.1rem]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700 text-[0.9rem] sm:text-[1.1rem]">
              <span>
                Discount ({subtotal ? ((discountTotal / subtotal) * 100).toFixed(0) : 0}%)
              </span>
              <span className="text-red-500 font-semibold">
                -${discountTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-700 text-[0.9rem] sm:text-[1.1rem]">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-black font-bold text-xl sm:text-2xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {/* pricing */}

            {/* Promo code */}
            <div className="flex items-center gap-2 mt-3 w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full border rounded-full pl-10 pr-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src="/promo-code.png" alt="promo" width={20} height={20} />
                </div>
              </div>
              <button className="hover:cursor-pointer bg-black text-white px-3 sm:px-4 py-2 rounded-full hover:scale-105 transition-all text-sm sm:text-base flex-shrink-0">
                Apply
              </button>
            </div>
            {/* Promo code */}

            {/* Checkout */}
            <button className="hover:cursor-pointer mt-4 bg-black text-white rounded-full py-3 text-base sm:text-lg flex items-center justify-center gap-2 hover:scale-105 transition-all">
              Proceed to Checkout
              <Image src="/arrow-rght.png" alt="arrow" width={18} height={18} />
            </button>
            {/* Checkout */}
          </div>
        )}
        {/* RIGHT: Summary */}
      </section>
      {/* CART ITEMS + SUMMARY */}
    </main>
  );
}