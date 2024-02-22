"use client";
import React, { useContext } from 'react';
import CartProvider, { CartContext } from "../components/cartProvider"; 
import 'tailwindcss/tailwind.css';

const MyOrders = () => {
  const { cartItems, setCartItems } = useContext(CartContext); 
  console.log(cartItems)
  

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.qty;
    });
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    alert("Compra finalizada!");
    setCartItems([]);
  };

  return (
    <CartProvider> 
      <div>
        <h1>Meus Pedidos</h1>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.thumbnail}/> {item.name} - Quantidade: {item.qty} - Preço: R${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: R${calculateTotal()}</p>
        <button onClick={handleCheckout}>Finalizar Compra</button>
      </div>
    </CartProvider>
  );
};

export default MyOrders;
