import { Link, useLocation } from "react-router-dom"
import 'tailwindcss/tailwind.css';
import React from 'react';


import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
function LeftInformation() {
    const infosPagina = [
        { id: 1, tittle: "Sobre o E-Rede Store", url: "/sobre" },
        { id: 2, tittle: "Segurança", url: "/segurança" },
        { id: 3, tittle: "Lista de desejos", url: "/lista-de-desejos" },
        { id: 4, tittle: "Trabalhe conosco", url: "/trabalhe-conosco" },
    ]
    return (
        <ul className="font-semibold text-[10px] min-w-32">
            <p className="pb-[14px]">Informações</p>
            {infosPagina.map((info) => (
                <li key={info.id} className="pl-[2px] pb-2">
                    <Link to={info.url} className="text-white font-light">{info.tittle}</Link>
                </li>
            ))}

        </ul>
    )
}
function RightInformation() {
    const infosPagina = [
        { id: 1, tittle: "Tênis", url: "/categoria/tenis" },
        { id: 2, tittle: "Camiseta", url: "/categoria/camiseta" },
        { id: 3, tittle: "Acessórios", url: "/categoria/acessorios" },
        { id: 4, tittle: "Esportivo", url: "/categoria/esportivo" },
    ]
    return (
        <ul className="font-semibold text-[10px] min-w-32">
            <p className="pb-[14px] ">Informações</p>
            {infosPagina.map((info) => (
                <li key={info.id} className="pl-[2px] pb-2">
                    <Link to={info.url} className="text-white font-light">{info.tittle}</Link>
                </li>
            ))}

        </ul>
    )
}

function LogoFooter() {
    return (
        <div className="flex flex-col gap-5 pb-5">
            <div className="flex gap-5">
                <img src="images/logo.png" alt="" className="h-7" />
                <section className="text-[10px]">Explore nossa variedade de equipamentos esportivos de última geração, roupas confortáveis e estilosas, calçados especializados e acessórios essenciais.
                </section>
            </div>

            <section className="flex text-base gap-6">
                <FaFacebook />
                <FaInstagram />
                <FaWhatsapp />
            </section>
        </div>
    )
}
function LocationFooter() {
    return (
        <div className="text-[10px]">
            <h1 className=" font-semibold py-[14px]">Localização</h1>
            <p className="font-regular pb-2">Rua Martinho Rodrigues, 331</p>
            <p className="font-regular pb-2">Bairro de Fátima, Fortaleza-CE</p>
        </div>
    )
}
export default function Footer() {
    const location = useLocation()
    const pathMatches = location.pathname == "/sign-in" || location.pathname == "/sign-up"


    const isSignInOrSignUpRoute = location.pathname === "/signin" || location.pathname === "/signup";

    if (isSignInOrSignUpRoute) {
      return null;
    }
    return (
        <>
            {!pathMatches ?
                <footer className="p-6 flex flex-col justify-center" style={{ backgroundColor: '#1E3A8A' }}>
                    <div className="flex flex-col  pb-0 md:flex-row md:justify-center md:gap-[60px] max-w-[1440px]">
                        <div className="max-w-[292px]">
                            <LogoFooter />
                        </div>
                        <div className="flex md:gap-[60px]">
                            <div className="flex-1">
                                <LeftInformation />

                            </div>
                            <div className="flex-1">
                                <RightInformation />
                            </div>

                        </div>
                        <div className="">
                            <LocationFooter />
                        </div>


                    </div>
                    <hr className="mt-4  px-6" />
                    <span className="mt-4 text-[10px] text-center">2023 Irede</span>
                </footer>
                : <>teste</>
            }
        </>


    )
}