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
            <Link to="/myorders">Meus pedidos</Link>
            <br/>
            <Link to="/signin">Login</Link>
            <br/>
            <Link to="/signup">Cadastro</Link>
            <br/>
            <Link to="/">Home</Link>
      <div> 
          <img className={styles.rectanglehomelarge} src="images/rectangle-home-large.png" alt="Rectangle Home Large"/>
      </div>

      <div>
          <img className={styles.rectanglehome} src="images/rectangle-home.jpg" alt="Rectangle Home"/>
      </div>
      <a href="/myorders" className={styles.homebutton}>Aproveite a Oferta</a>
      <h1>Destaques</h1>
    <div className={`${styles.main} ${utils.flex}`}>

      <div className={styles.productDetail}>
      
        <span
          className={`${styles.companyName} ${utils.upperCase} ${utils.textOrange400} ${utils.fs300} ${utils.fw700}`}
        >
          {product.company}
        </span>
        <img src="images/card.png" />
        <h1 className={`${utils.textNeutral700} ${utils.fs800}`}>
          {product.title}
        </h1>
        <p>{product.description}</p>
        <div className={`${styles.productPrice} ${utils.flex}`}>
          <div className={`${styles.newPrice} ${utils.flex} ${utils.fw700}`}>
            <span className={`${utils.textNeutral700} ${utils.fs500}`}>
              R${product.currentPrice.toFixed(2)}
            </span>

          </div>

        </div>
        
        <AddToCart
          name={product.title}
          price={product.currentPrice}
          thumbnail={product.images.thumbnails[0].src}
        />
      </div>
    </div>
    </div>
  );
}
