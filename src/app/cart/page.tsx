"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import React, { useEffect, useRef, useState, useMemo } from "react";


export default function CartPage() {
    /*/////////////////// logic ///////////////////*/







    /*/////////////////// logic ///////////////////*/





    return (
    <main className="flex flex-col min-h-screen px-6 lg:px-20">
      <p className="mt-[140px] -ml-[7px] md:ml-[5px] lg:ml-[0px] xl:ml-[2.3rem] text-[#000000]">
        <Link href={"/"}>Home</Link> &gt; Cart
      </p>





      <section className="container mx-auto xl:pl-[35px] mt-[24px]">
        <div className="text-black md:ml-[5px]">
            <span className="text-[40px] font-extrabold">Your cart</span>
            
        </div>
      </section>
    </main>  
    )
}