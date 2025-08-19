export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  stars: "3-stars.png" | "3-5-stars.png" | "4-stars.png" | "4-5-stars.png" | "5-stars.png";
}

export const products: Product[] = [
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
  {
    id: 5,
    name: "Vertical Striped Shirt",
    image: "/green-b-up.png",
    price: 212,
    originalPrice: 232,
    discount: "20%",
    stars: "5-stars.png",
  },
  {
    id: 6,
    name: "Courage Graphic T-Shirt",
    image: "/orange-t.png",
    price: 145,
    stars: "4-stars.png",
  },
  {
    id: 7,
    name: "Loose Fit Shorts",
    image: "/jorts.png",
    price: 80,
    stars: "3-stars.png",
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    image: "/b-jeans.png",
    price: 210,
    stars: "4-5-stars.png",
  },
];