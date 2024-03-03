"use client";

import styles from "./addToCart.module.css";
import cardStyles from '../pages/card.module.css';
import utils from "./utils.module.css";
import { useState, useContext } from "react";
import { CartContext } from "./cartProvider";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

export default function AddToCart({ name, price, thumbnail }) {
  const contextValue = useContext(CartContext);
  const [count, setCount] = useState(0);

  const onDecrease = () => {
    count && setCount(count - 1);
  };

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onAddToCart = () => {
    if (count) {
      contextValue.setCartItems((prev) => [
        ...prev,
        {
          name: name,
          price: price,
          qty: count,
          subTotal: price * count,
          thumbnail: thumbnail,
        },
      ]);
    } else {
      alert("Por favor, adicione pelo menos 1 item.");
    }
  };

  return (
    <div>
      <article className="flex flex-col md:flex-row items-center gap-7 my-10">
        <span className="flex flex-col items-center">
          <p className="font-semibold text-2xl text-black">Quantidade:</p>
          <div className="flex bg-white border border-black rounded-md h-10 w-24 justify-center items-center gap-3">
            <p className="text-2xl font-semibold text-black">{count}</p>
            <div className="border-black text-black">
            <BiSolidUpArrow onClick={onIncrease} />
            <BiSolidDownArrow onClick={onDecrease}/>
            </div>
          </div>
        </span>
        <button className="bg-[#1E3A8A] text-white w-[222px] md:w-[352px] h-14 md:h-20 rounded-lg font-semibold text-2xl" onClick={onAddToCart}>Comprar</button> 
        </article>
    </div>
  );
}