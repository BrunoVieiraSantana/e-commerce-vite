"use client";
import React, { useContext } from 'react';
import CartProvider from "../components/cartProvider";
import { CartContext } from "../components/cartProvider";
import { product } from "../../public/data";
import AddToCart from "../components/addToCart";
import 'tailwindcss/tailwind.css';


const MyOrders = () => {
  const { cartItems } = useContext(CartContext); 

  return (
    <CartProvider> 
      <div>
        Meus Pedidos
      </div>
    </CartProvider>
  );
};

export default MyOrders;
