'use client'

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Home() {
  return (
    <section className="font-sans">

      <div className="border mt-[24px] bg-[url('/couple-crop.png')] bg-no-repeat bg-center mx-auto md:bg-right h-[663px] w-[100%] md:w-[90%]">

        <div>
          <Image 
            src="/star.png"
            alt="big star"
            width={104}
            height={104}
            className="hidden md:block  absolute top-[195px] right-[110px]"
          />

          <Image 
            src="/star.png"
            alt="small star"
            width={56}
            height={56}
            className="absolute top-[430px] sm:hidden 2xl:block right-[660px]"
          />
        </div>
        
        <div className="hidden md:block px-[15px] mt-[95px]">
          <h1 className="font-bold text-[64px] leading-[64px] text-black">
            FIND CLOTHES<br />
            THAT MATCHES<br />
            YOUR STYLE
          </h1>

          <p className="ml-[5px] mt-6 max-w-[600px] text-[16px] leading-[22px] text-gray-600 font-normal">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
        </div>

        <button className="hidden md:block bg-black rounded-3xl mt-[32px] ml-[15px] hover:cursor-pointer text-center w-[210px] h-[52px]">Shop Now</button>

        

      </div>

    </section>
  );
}
