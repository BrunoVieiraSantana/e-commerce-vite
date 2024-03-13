import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import utils from "./utils.module.css";
import Cart from "./cart";
import "../../src/globals.css";
import { CiLogout } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();
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

  const handleUserChange = () => {
    const userName = localStorage.getItem("userName");
    setUser({ name: userName });
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("userId");

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setUser(null); 

    navigate('/');
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

    window.addEventListener("storage", handleUserChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  const isSignInOrSignUpRoute = location.pathname === "/signin" || location.pathname === "/signup";

  if (!checkedAuth) {
    return null;
  }

  if (!user && location.pathname === "/myorders") {
    navigate('/signin');
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
        <div className={styles.logohome}>
          <a href="/">
          <img  src="/images/logo.png" alt="logo" />
          </a>
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
          <ul className={`${styles.navMenuMobileLinks} ${utils.flex} ${utils.fw700}`} style={{ width: '245px' }}>
          <li className={`${styles.navMenuMobileLink} ${utils.flex}`}>Páginas</li>
          <hr style={{ borderTop: '1px solid black', width: '85%' }} />
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
            <hr style={{ borderTop: '1px solid black', width: '85%' }} />
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
                  <Link style={{ marginLeft: '20px' }} className={styles.signinbuttonmobile} to="/signin">Entrar</Link>
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
