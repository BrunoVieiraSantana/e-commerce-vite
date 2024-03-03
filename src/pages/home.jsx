// home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import styles from "../page.module.css";
import cardStyles from './card.module.css';
import utils from "../components/utils.module.css";
import AddToCart from "../components/addToCart";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <img className={styles.rectanglehomelarge} src="images/rectangle-home-large.png" alt="Rectangle Home Large"/>
      </div>

      <div>
        <img className={styles.rectanglehome} src="images/rectangle-home.jpg" alt="Rectangle Home"/>
      </div>

      <a href="/myorders" className={styles.homebutton}>Aproveite a Oferta</a>

      <div className={`${styles.main} ${utils.flex}`}>
        <div className={styles.productDetail}>
          <span className={`${styles.companyName} ${utils.upperCase} ${utils.textOrange400} ${utils.fs300} ${utils.fw700}`}>
            Destaques
          </span>
          <div className={cardStyles.cardContainer}>
            {products.map((item) => (
              <Link key={item.id_product} to={`/details/${item.id_product}`}> {/* Modificação aqui */}
                <div className={cardStyles.card}>
                  <img src={item.mainimg} className={cardStyles.img} alt={item.title}/> 
                  <div className={cardStyles.content}>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p> 
                    <span>R${item.currentprice.toFixed(2)}</span> 
                    <AddToCart
                      name={item.title}
                      price={item.currentprice}
                      thumbnail={item.thumbnail} 
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
