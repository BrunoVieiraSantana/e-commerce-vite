import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import utils from "./utils.module.css";
import Cart from "./cart";
import "../../src/globals.css";

export default function Header() {
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false); 
  const location = useLocation();
  const navMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsNavMenuOpened((prevValue) => !prevValue);
    setIsActive((prevValue) => !prevValue);
  };

  const handleClickOutside = (event) => {
    if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
      setIsNavMenuOpened(false);
      setIsActive(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (token || userEmail) {
      setUser({ name: userName });
    }

    setCheckedAuth(true);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSignInOrSignUpRoute = location.pathname === "/signin" || location.pathname === "/signup";

  if (!checkedAuth) {
    return null;
  }

  if (!user && location.pathname === "/myorders") {
    window.location.href = "/signin";
    return null; 
  }

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
          onClick={toggleMenu}
        >
          <span className={`${styles.hamburgerLine1} ${isActive ? styles.active : ""}`}></span>
          <span className={`${styles.hamburgerLine2} ${isActive ? styles.active : ""}`}></span>
          <span className={`${styles.hamburgerLine3} ${isActive ? styles.active : ""}`}></span>
        </button>
        <div className={styles.tophome}>
          <div className={styles.logohome}>
            <img src="images/logo.png" alt="logo" />
          </div>
          <div className={styles.inputbox}>
            <input type="text" placeholder="Buscar" />
          </div>

          <Link className={styles.signupbutton} to="/signup">Cadastre-se</Link>

          <Link className={styles.signinbutton} to="/signin">Entrar</Link>

          <nav
            ref={navMenuRef}
            className={
              isNavMenuOpened
                ? `${styles.navMenuMobileActive} ${styles.navMenuMobile}`
                : styles.navMenuMobile
            }
          >
            <ul className={`${styles.navMenuMobileLinks} ${utils.flex} ${utils.fw700}`}>
              <li>
                <Link to="/" className={`${styles.navMenuMobileLink} ${utils.flex}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link className={`${styles.navMenuMobileLink} ${utils.flex}`} href="#">
                  Produtos
                </Link>
              </li>
              <li>
                <Link className={`${styles.navMenuMobileLink} ${utils.flex}`} href="#">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="myorders" className={`${styles.navMenuMobileLink} ${utils.flex}`}>
                  Meus Pedidos2
                </Link>
              </li>
              <li>
                <Link className={styles.signupbuttonmobile} to="/signup">Cadastre-se</Link>
              </li>
              <li>
                <Link className={styles.signinbuttonmobile} to="/signin">Entrar</Link>
              </li>
            </ul>
          </nav>
          <div className={`${styles.navMenuRight} ${utils.flex}`}>
            <Cart user={user} />
          </div>
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
          {user && (
            <li>
              <h1 className={`${styles.ola}`}>Olá, {user.name}</h1>
            </li>
          )}
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
