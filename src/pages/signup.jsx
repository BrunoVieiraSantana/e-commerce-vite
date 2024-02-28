// SignUp.jsx
import React, { useState } from 'react';
import styles from './sign.module.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      alert('Usuário cadastrado com sucesso');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={styles.containerGeral}>
    <main className={styles.container}>
      <a href="/">
        <div className={styles.hiddenlarge}>
          <img className="w-[120px] mx-auto block pt-6 pb-6" src="/images/logo.png" alt="Logo" />
        </div>
      </a>
      <form className={styles['form-container']} onSubmit={handleSubmit}>
        <h1 className="text-black text-2xl font-semibold pt-2">Cadastre-se</h1>
        <div>
          <label className={styles['form-input']}>
            <h1 className="w-full font-bold">Nome*</h1>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Digite seu nome" required className={styles['form-input']} />
          </label>
          <label className={styles['form-input']}>
            <h1 className="w-full font-bold">Email*</h1>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" required type="email" className={styles['form-input']} />
          </label>
          <label className={styles['form-input']}>
            <h1 className="w-full font-bold">Senha*</h1>
            <input name="password" value={formData.password} onChange={handleChange} placeholder="Digite sua senha" required type="password" className={styles['form-input']} />
          </label>
        </div>
        <button type="submit" className={styles.btn}>
          Cadastrar
        </button>
        <a href="/signin" className={styles.link}>
          Já possui cadastro?
          <span className={styles.link2}>Clique Aqui</span>
        </a>
      </form>
    </main>
    <a href="/">
    <div className={styles.hiddensmall}>
      <img className="w-[620px]" src="/images/logolarge.png" alt="LogoLarge" />
    </div>
    </a>
    </div>
  );
};

export default SignUp;
