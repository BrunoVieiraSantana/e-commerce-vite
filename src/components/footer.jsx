import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './footer.module.css'; 

export default function Footer() {
  const location = useLocation();

  // Verifica se a rota atual é '/signin' ou '/signup'
  const isSignInOrSignUpRoute = location.pathname === "/signin" || location.pathname === "/signup";

  // Renderiza o componente somente se não estiver em '/signin' ou '/signup'
  if (isSignInOrSignUpRoute) {
    return null;
  }

  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__top}>
          <img className={styles.footer__logo} src="images/logo.png" alt="Logo" />
          <section className={styles.footer__description}>
            Explore nossa variedade de equipamentos esportivos de última geração, roupas confortáveis e estilosas, calçados especializados e acessórios essenciais.
          </section>
        </div>

        <section className={styles.footer__social_i}>
          <img src="images/face.png" alt="Facebook" />
          <img src="images/inst.png" alt="Instagram" />
          <img src="images/what.png" alt="WhatsApp" />
        </section>

        <div className={styles.footer__info}>
          <div className={styles.footer__column}>
            <ul>
              <p>Informações</p>
              <li>Sobre o E-Rede Store</li>
              <li>Segurança</li>
              <li>Lista de desejos</li>
              <li>Trabalhe conosco</li>
            </ul>
          </div>
          <div className={styles.footer__column}>
            <ul>
              <p>Informações</p>
              <li>Tênis</li>
              <li>Camiseta</li>
              <li>Acessórios</li>
              <li>Esportivo</li>
            </ul>
          </div>
        </div>

        <div className={styles.footer__location}>
          <h1 className="font-semibold py-14">Localização</h1>
          <p className="font-regular pb-2">Rua Martinho Rodrigues, 331</p>
          <p className="font-regular pb-2">Bairro de Fátima, Fortaleza-CE</p>
        </div>
        <hr className={styles.footer__hr} />
        <span className={styles.footer__copyright}>2023 Irede</span>
      </div>
    </div>
  );
}
