import styles from "../page.module.css";
import cardStyles from './card.module.css';
import utils from "../components/utils.module.css";
import AddToCart from "../components/addToCart";
import { product } from "../../public/data";
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"



export default function Home() {
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
      
        <span
          className={`${styles.companyName} ${utils.upperCase} ${utils.textOrange400} ${utils.fs300} ${utils.fw700}`}
        >
          Destaques
          </span>
          {product.map((item) => (
            <div key={item.id} className={cardStyles.card}>
              <img src={item.images.mainImgs[0]} className={cardStyles.img} /> 
              <div className={cardStyles.content}>
                <h1>{item.title}</h1>
                <p>{item.description}</p> 
                <span>R${item.currentPrice.toFixed(2)}</span> 
                <AddToCart
                name={item.title}
                price={item.currentPrice}
                thumbnail={item.images.thumbnails[0]} 
              />
              </div>

              {/* <div className={cardStyles.card}>
                <img src={item.images.mainImgs[0]} alt="card produto" className={cardStyles.img} />
                <div className={cardStyles.content}>
                  <h1>Camisa</h1>
                  <span>Esporte</span>
                  <h3>60,00R$</h3>
                  <button>Comprar</button>
                </div>
              </div> */}
              

            </div>
      ))}
      </div>
    </div>
    </div>
  );
}
