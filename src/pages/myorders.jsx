"use client";

import myorderStyles from '../pages/myorder.module.css';
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
      <div className={`${myorderStyles.container} flex`}>
        <aside className={`${myorderStyles.card} w-full`}>
          <menu className={`${myorderStyles.menu} md:flex`}>
            <a className={myorderStyles.menuLink}>Meus Pedidos</a>
            <hr className={myorderStyles.menuDivider} />
            <a className={myorderStyles.menuLink}>Histórico de Pedidos</a>
          </menu>
        </aside>
        <br />
        <menu className={`${myorderStyles.menu} md:flex`}>
          <a className={myorderStyles.menuLink}>Lista de pedidos - Status Meus Pedidos</a>
          <hr className={myorderStyles.menuDivider} />

          <div>
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


          <a className={myorderStyles.menuLink}></a>
        </menu>
      </div>

      

    </CartProvider>
  );
};

export default MyOrders;
