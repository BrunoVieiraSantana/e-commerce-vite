import styles from "./cart.module.css";
import utils from "./utils.module.css";
import { CartContext } from "./cartProvider";
import { useContext, useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Cart() {
  const contextValue = useContext(CartContext);
  const { cartItems, setCartItems } = contextValue;
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const MySwal = withReactContent(Swal)

  useEffect(() => {
    const calculateTotalValue = () => {

      let total = 0;
      cartItems.forEach((item) => {

        total += item.subTotal;
      });

      setTotalValue(total);
    };

    calculateTotalValue();
  }, [cartItems]);

  const toggleIsCartOpened = () => {
    setIsCartOpened((prev) => !prev);
  };

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem('userId');


      for (const item of cartItems) {

        const response = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/purchases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: userId, ...item })
        });

        if (!response.ok) {
          console.error('Erro ao realizar compra:', response.status);
          alert('Erro ao realizar compra. Por favor, tente novamente mais tarde.');
          return;
        }
      }

      setCartItems([]);
      localStorage.removeItem('cartItems');
      MySwal.fire({
        title: "Compra realizada com sucesso!",
        icon: "success"
      })
      // alert('Compra realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar compra:', error);
      alert('Erro ao realizar compra. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <>
      <button className={styles.cart} onClick={toggleIsCartOpened}>
        <img src="/images/icon-cart.svg" alt="icon cart" aria-label="Cart"/>
        {cartItems.length ? (
          <div className={styles.cartItemCount}>{cartItems.length}</div>
        ) : null}
      </button>
      {isCartOpened ? (
        <div className={`${styles.cartPopup} ${utils.flex}`}>
          <h4 className={utils.textNeutral700}>Carrinho</h4>
          <div className={`${styles.cartPopupBottom} ${utils.flex}`}>
            {cartItems.length ? (
              <>
                <CartList items={cartItems} setCartItems={setCartItems} />
                <hr style={{marginTop: '20px', marginBottom: '20px'}}></hr>
                <div className={`${utils.fw700} ${utils.textNeutral700}`}>Valor total: R${totalValue}</div>
                <button
                  className={`${styles.btnCheckout} ${utils.fw700} ${utils.textNeutral100}`}
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </button>
              </>
            ) : (
              <CartEmpty />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

const CartEmpty = () => {
  return (
    <div className={`${styles.cartEmpty} ${utils.grid} ${utils.fw700}`}>
      Seu carrinho está vazio.
    </div>
  );
};

const CartList = ({ items, setCartItems }) => {
  const removeItem = (id) => {
    const newCartItems = items.filter((item, index) => index !== id);
    setCartItems(newCartItems);
  };

  return (
    <ul className={`${styles.cartItems} ${utils.flex}`}>
      {items.map((item, index) => (
        <CartItem key={index} id={index} item={item} removeItem={removeItem} />
      ))}
    </ul>
  );
};

const CartItem = ({ item, id, removeItem }) => {
  return (
    <li className={`${styles.cartItem} ${utils.flex}`}>
      <img src={item.thumbnail} alt="cart item icon" />

      <div className={`${styles.cartItemDesc} ${utils.flex}`}>
        <span>{item.name}</span>
        <span>
          <span>{"R$" + item.price}</span>
          <span>{" x " + item.qty + " "}</span>
          <span className={`${utils.fw700} ${utils.textNeutral700}`}>
            {"R$" + item.subTotal}
          </span>
        </span>
      </div>

      <button
        className={styles.cartItemDelete}
        onClick={() => removeItem(id)}
      >
        <img src="/images/icon-delete.svg" alt="cart item delete" />
      </button>
    </li>
  );
};
