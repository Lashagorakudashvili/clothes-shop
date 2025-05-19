"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section className="font-sans bg-black h-[38px] flex items-center justify-between text-center mx-auto px-4">
      <div className="flex justify-between w-full items-center">
        <p className="text-[#FFFFFF] mx-auto text-[14px]">
          Sign up and get 20% off to your first order.{" "}
          <Link
            href="#"
            className="border-b border-white hover:cursor-pointer"
          >
            Sign Up Now
          </Link>
        </p>
        <Image
          className="hover:cursor-pointer mr-[3.5px] md:mr-[1rem] lg:mr-[5rem] xl:mr-[7.5rem]"
          src="/X-Sign.png"
          alt="Close icon"
          width={20}
          height={20}
          onClick={() => setIsVisible(false)}
        />
      </div>
    </section>
  );
}