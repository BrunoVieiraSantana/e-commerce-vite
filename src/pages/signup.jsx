"use client";
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/users', {
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
    <main className="bg-[#1E3A8A] min-h-screen">
      <a href="/">
        <img className="w-[120px] mx-auto block pt-6 pb-6" src="images/logo.png" alt="Logo"></img>
      </a>
      <form className="flex flex-col justify-center items-center bg-white mr-6 ml-6" onSubmit={handleSubmit}>
        <h1 className="text-black text-2xl font-semibold pt-2">Cadastre-se</h1>
        <div className="">
          <label className="text-black flex flex-col justify-center items-center pb-4 pt-4">
            <h1 className="w-full font-bold">Nome*</h1>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Digite seu nome" required className="bg-slate-100 p-3 rounded-md outline-none" />
          </label>
          <label className="text-black flex flex-col w-full justify-center items-center pb-4 pt-4">
            <h1 className="w-full font-bold">Email*</h1>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" required type="email" className="bg-slate-100 p-3 rounded-md outline-none" />
          </label>
          <label className="text-black flex flex-col w-full justify-center items-center  pb-4 pt-4">
            <h1 className="w-full font-bold">Senha*</h1>
            <input name="password" value={formData.password} onChange={handleChange} placeholder="Digite sua senha" required type="password" className="bg-slate-100 p-3 rounded-md outline-none" />
          </label>
        </div>
        <button type="submit" className="flex items-center justify-center bg-orange-500 w-[260px] h-[60px] rounded-lg font-bold text-white">
          Cadastrar
        </button>
        <a href="/signin" className="pb-6 pt-8">
          Já possui cadastro?
          <span className="text-orange-500">Clique Aqui</span>
        </a>
      </form>
    </main>
  );
};

export default SignUp;
