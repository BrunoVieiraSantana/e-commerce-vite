import styles from "../page.module.css";
import utils from "../components/utils.module.css";
import ProductGallery from "../components//productGallery";
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
        <div key={item.id}>
          <img src={item.images.mainImgs[0]} /> 
          <h1>{item.title}</h1>
          <p>{item.description}</p> 
          <div>
            <span>R${item.currentPrice.toFixed(2)}</span> 
          </div>

          <AddToCart
            name={item.title}
            price={item.currentPrice}
            thumbnail={item.images.thumbnails[0]} 
          />
        </div>
      ))}
      </div>
    </div>
    </div>
  );
}
