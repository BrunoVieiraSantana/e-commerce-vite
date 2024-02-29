import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import utils from "./utils.module.css";
import Cart from "./cart";
import "../../src/globals.css";
import { CiLogout } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";

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

  const handleLogout = () => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

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

        <div className={styles.tophome}>
        <IoMenu className={styles.iconemenu} onClick={toggleMenu} />
        {/* <button
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
        </button> */}
          <div className={styles.logohome}>
            <img src="images/logo.png" alt="logo" />
          </div>
          <div className={styles.inputbox}>
            <input type="text" placeholder="Buscar" />
          </div>
          {user ? null : (
            <div className={styles.sign}>
              <Link className={styles.signupbutton} to="/signup">Cadastre-se</Link>
              <Link className={styles.signinbutton} to="/signin">Entrar</Link>
            </div>
          )}
          {user && (
              <div className={styles.msg}>
                  <CiLogout className={styles.icone} onClick={handleLogout} />
                  <h1>Olá, {user.name}</h1>
              </div>
          )}
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
                <Link to="/products" className={`${styles.navMenuMobileLink} ${utils.flex}`} >
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/categories" className={`${styles.navMenuMobileLink} ${utils.flex}`} >
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/myorders" className={`${styles.navMenuMobileLink} ${utils.flex}`}>
                  Meus Pedidos
                </Link>
              </li>
              <li>
                {user && (
                <div className={styles.msgmobile}>
                    <CiLogout className={styles.iconemobile} onClick={handleLogout} />
                    <h1>Olá, {user.name}</h1>
                </div>
                )}
              </li>
              {!user && (
                <>
                  <li>
                    <Link className={styles.signupbuttonmobile} to="/signup">Cadastre-se</Link>
                  </li>
                  <li>
                    <Link className={styles.signinbuttonmobile} to="/signin">Entrar</Link>
                  </li>
                </>
              )}
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
            <Link to="/products" className={`${styles.navMenuLink} ${utils.flex}`} >
              Produtos
            </Link>
          </li>
          <li>
            <Link to="/categories" className={`${styles.navMenuLink} ${utils.flex}`} >
              Categorias
            </Link>
          </li>
          <li>
            <Link to="myorders" className={`${styles.navMenuLink} ${utils.flex}`} >
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
