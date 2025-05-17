
"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const path = usePathname(); // e.g., "/casual"
  const category = path.split('/')[1]; // "casual"

  return <p className='mt-[48px] ml-[1.5rem] md:ml-[1.8rem] lg:ml-[5rem] xl:ml-[7.3rem] text-[#000000]'><Link href={"/"}>Home</Link> &gt; {category}</p>;
}
