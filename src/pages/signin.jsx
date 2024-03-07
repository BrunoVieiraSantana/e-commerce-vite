import React, { useState } from 'react';
import styles from './sign.module.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const MySwal = withReactContent(Swal)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        
        document.cookie = `token=${data.token}; path=/`;

        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', data.name); 
        localStorage.setItem('userId', data.id); 

        // alert('Usuário logado com sucesso');
        
        MySwal.fire({
          title: "Usuário logado com sucesso",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/"
          }
        });
        
        // window.location.href = "/";
      } else {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
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
          <h1 className="text-black text-2xl font-semibold pt-2">Fazer Login</h1>
          <div>
            <label className={styles['form-input']}>
              <h1 className="w-full font-bold">Email*</h1>
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" required type="email" className={styles['form-input']} />
            </label>
            <label className={styles['form-input']}>
              <h1 className="w-full font-bold">Senha*</h1>
              <input name="password" value={formData.password} onChange={handleChange} placeholder="Digite sua senha" required type="password" className={styles['form-input']} />
            </label>
          </div>
          <button className={styles.btn} type="submit">
            Fazer Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <Link to="/signup" className={styles.link}>
            Não possui cadastro?<span className={styles.link2}>Clique Aqui</span>
          </Link>
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

export default SignIn;
