import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

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
        
        // Armazenando o token de autenticação em um cookie
        document.cookie = `token=${data.token}; path=/`;

        // Armazenando o email, nome do usuário no localStorage
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', data.name);

        alert('Usuário logado com sucesso');
        // Redirecionando para a página inicial após o login bem-sucedido
        window.location.href = "/";
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
    <div className='bg-[#1E3A8A]'>
      <main className="bg-[#1E3A8A] min-h-screen">
        <a href="/">
          <img className="w-[120px] mx-auto block pt-6 pb-6" src="/images/logo.png" alt="Logo" />
        </a>
        <form className="flex flex-col justify-center items-center bg-white mr-6 ml-6" onSubmit={handleSubmit}>
          <h1 className="text-black text-2xl font-semibold pt-2">Fazer Login</h1>
          <div className="">
            <label className="text-black flex flex-col w-full justify-center items-center pb-4 pt-4">
              <h1 className="w-full font-bold">Email*</h1>
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" required type="email" className="bg-slate-100 p-3 rounded-md outline-none" />
            </label>
            <label className="text-black flex flex-col w-full justify-center items-center  pb-4 pt-4">
              <h1 className="w-full font-bold">Senha*</h1>
              <input name="password" value={formData.password} onChange={handleChange} placeholder="Digite sua senha" required type="password" className="bg-slate-100 p-3 rounded-md outline-none" />
            </label>
          </div>
          <button className="flex items-center justify-center bg-orange-500 w-[260px] h-[60px] rounded-lg font-bold text-white" type="submit">
            Fazer Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <a href="/signup" className="pb-6 pt-8">
            Não possui cadastro?<span className="text-orange-500">Clique Aqui</span>
          </a>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
