"use client";

// import Cart from "./cart";
import styles from "./nav.module.css";
import utils from "./utils.module.css";
import { useState } from "react";

export default function Header() {
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsNavMenuOpened((prevValue) => !prevValue);
    setIsActive((prevValue) => !prevValue);
  };

  return (
      <header >
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
              isActive ? styles.active : ''
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine2}  ${
              isActive ? styles.active : ''
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine3}  ${
              isActive ? styles.active : ''
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
          <a href="/signup" className={styles.signupbutton}>Cadastre-se</a>
          <a href="/signin" className={styles.signinbutton}>Entrar</a>
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
              <a
                className={`${styles.navMenuMobileLink} ${utils.flex}`}
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={`${styles.navMenuMobileLink} ${utils.flex}`}
                href="#"
              >
                Produtos
              </a>
            </li>
            <li>
              <a
                className={`${styles.navMenuMobileLink} ${utils.flex}`}
                href="#"
              >
                Categorias
              </a>
            </li>
            <li>
              <a
                className={`${styles.navMenuMobileLink} ${utils.flex}`}
                href="myorders"
              >
                Meus Pedidos
              </a>
            </li>
            <li>
              <a href="/signup" className={styles.signupbuttonmobile}>Cadastre-se</a>
              <a href="/signin" className={styles.signinbuttonmobile}>Entrar</a>
            </li>

          </ul>
        </nav>
        <div className={`${styles.navMenuRight} ${utils.flex}`}>
          {/* <Cart /> */}

        </div>
        </div>

        </div>
        
        <nav className={`${styles.navMenu} ${styles.navfull}`}>
          <ul className={`${styles.navMenuLinks} ${utils.flex}`}>
            <li>
              <a className={`${styles.navMenuLink} ${utils.flex}`} href="/">
                Home
              </a>
            </li>
            <li>
              <a className={`${styles.navMenuLink} ${utils.flex}`} href="#">
                Produtos
              </a>
            </li>
            <li>
              <a className={`${styles.navMenuLink} ${utils.flex}`} href="#">
                Categorias
              </a>
            </li>
            <li>
              <a className={`${styles.navMenuLink} ${utils.flex}`} href="myorders">
                Meus Pedidos
              </a>
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
