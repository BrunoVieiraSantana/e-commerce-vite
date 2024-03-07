import styles from "./addToCart.module.css";
import cardStyles from '../pages/card.module.css';
import utils from "./utils.module.css";
import { useState, useContext } from "react";
import { CartContext } from "./cartProvider";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const storeCartItemsToLocal = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export default function AddToCart({ name, price, thumbnail, product_id }) {
  const contextValue = useContext(CartContext);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal)

  const onDecrease = () => {
    count && setCount(count - 1);
  };

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onAddToCart = () => {
    if (!document.cookie.includes('token')) { 
      MySwal.fire({
        title: "Você precisa estar logado para comprar.",
        icon: "info"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signin')
        }
      });

      // alert('Você precisa estar logado para comprar.'); 
      // navigate('/signin');
      return; 
    }

    if (count) {
      const newCartItem = {
        name: name,
        price: price,
        qty: count,
        subTotal: price * count,
        thumbnail: thumbnail,
        id: product_id 
      };

      const updatedCartItems = [...contextValue.cartItems, newCartItem];
      contextValue.setCartItems(updatedCartItems);
      storeCartItemsToLocal(updatedCartItems); 

      MySwal.fire({
        title: "Item adicionado ao carrinho com sucesso!",
        icon: "success"
      })
      // alert('Item adicionado ao carrinho com sucesso!');
    } else {
      MySwal.fire({
        title: "Por favor, adicione pelo menos 1 item.",
        icon: "info"
      })
      // alert("Por favor, adicione pelo menos 1 item.");
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
