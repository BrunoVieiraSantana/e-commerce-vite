"use client";
import React, { useContext } from 'react';
import CartProvider from "@/components/cartProvider";
import { CartContext } from "@/components/cartProvider";
import { product } from "@/public/data";
import AddToCart from "@/components/addToCart";
import 'tailwindcss/tailwind.css';


const MyOrdersPage = () => {
  const { cartItems } = useContext(CartContext); 

  return (
    <CartProvider> 
      <div>
        <div className="flex flex-col">
          <div className="bg-white">
          </div>
          <div className="flex flex-row justify-between">
            <div className="ml-4">
              <img className="h-[80px]" src="images/card.png" alt=""></img>
              <h1 className="text-blue-900 font-bold text-2xl">
                {product.title}
              </h1>
              <p className="text-neutral-700 text-lg">{product.description}</p>
              <span className="text-orange-400 font-semibold text-2xl">R${product.currentPrice.toFixed(2)}</span>
              <AddToCart
                name={product.title}
                price={product.currentPrice}
                thumbnail={product.images.thumbnails[0].src}
              />
            </div>
            <div className="mr-4">
              <img className="h-[80px]" src="images/card.png" alt=""></img>
              <h1 className="text-blue-900 font-bold text-2xl">
                {product.title}
              </h1>
              <p className="text-neutral-700 text-lg">{product.description}</p>
              <span className="text-orange-400 font-semibold text-2xl">R${product.currentPrice.toFixed(2)}</span>
              <AddToCart
                name={product.title}
                price={product.currentPrice}
                thumbnail={product.images.thumbnails[0].src}
              />
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default MyOrdersPage;
