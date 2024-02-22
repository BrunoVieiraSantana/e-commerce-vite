import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import utils from "./utils.module.css";
import Cart from "./cart";
import "../../src/globals.css";


export default function Header() {
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsNavMenuOpened((prevValue) => !prevValue);
    setIsActive((prevValue) => !prevValue);
  };

  const isSignInOrSignUpRoute = location.pathname === "/signin" || location.pathname === "/signup";

  if (isSignInOrSignUpRoute) {
    return null;
  }

  return (
    <header>
      <div className={`${styles.header} ${utils.flex}`}>
        <button
          className={
            isNavMenuOpened
              ? `${styles.navMenuToggleActive} ${styles.navMenuToggle}`
              : `${styles.navMenuToggle}`
          }
          onClick={() => {
            toggleMenu();
          }}
        >
          <span
            className={`${styles.hamburgerLine1}  ${
              isActive ? styles.active : ""
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine2}  ${
              isActive ? styles.active : ""
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine3}  ${
              isActive ? styles.active : ""
            }`}
          ></span>
        </button>
        <div className={styles.tophome}>
          <div className={styles.logohome}>
            <img src="images/logo.png" alt="logo" />
          </div>
          <div className={styles.inputbox}>
            <input type="text" placeholder="Buscar" />
          </div>
          <a href="/signup" className={styles.signupbutton}>
            Cadastre-se
          </a>
          <a href="/signin" className={styles.signinbutton}>
            Entrar
          </a>
          <nav
            className={
              isNavMenuOpened
                ? `${styles.navMenuMobileActive} ${styles.navMenuMobile}`
                : styles.navMenuMobile
            }
          >
            <ul
              className={`${styles.navMenuMobileLinks} ${utils.flex} ${utils.fw700}`}
            >
              <li>
                <Link to="/" className={`${styles.navMenuMobileLink} ${utils.flex}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`${styles.navMenuMobileLink} ${utils.flex}`}
                  href="#"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  className={`${styles.navMenuMobileLink} ${utils.flex}`}
                  href="#"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="myorders" className={`${styles.navMenuMobileLink} ${utils.flex}`}>
                  Meus Pedidos
                </Link>
              </li>
            </ul>
          </nav>
          <div className={`${styles.navMenuRight} ${utils.flex}`}><Cart /></div>
        </div>
      </div>
      <nav className={`${styles.navMenu} ${styles.navfull}`}>
        <ul className={`${styles.navMenuLinks} ${utils.flex}`}>
          <li>
            <Link className={`${styles.navMenuLink} ${utils.flex}`} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={`${styles.navMenuLink} ${utils.flex}`} href="#">
              Produtos
            </Link>
          </li>
          <li>
            <Link className={`${styles.navMenuLink} ${utils.flex}`} href="#">
              Categorias
            </Link>
          </li>
          <li>
            <Link className={`${styles.navMenuLink} ${utils.flex}`} to="myorders">
              Meus Pedidos
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.inputboxcontainer}>
        <div className={styles.inputboxmobile}>
          <input type="text" placeholder="Buscar" />
        </div>
      </div>
    </header>
  );
}
