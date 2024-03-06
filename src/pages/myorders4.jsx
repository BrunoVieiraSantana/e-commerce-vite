import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const MyOrders = () => {
  const [purchases, setPurchases] = useState([]);
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`https://e-commerce-api-bay.vercel.app/api/v1/purchases/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const data = await response.json();
        setPurchases(data.purchases);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [userId]);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  function handleOpcao(event){
      setOpcaoSelecionada(event.target.value)
  }
  useEffect(()=>{
  },[opcaoSelecionada])



  const handleCheckout = () => {
    alert("Compra finalizada!");
    setCartItems([]);
  };

  return (
    
    <main className="">          
    <div className=" flex flex-col md:flex-row  md:my-20 md:mx-20 items-center md:items-baseline   justify-center md:justify-normal ">          
        <section className="hidden  md:flex flex-col bg-slate-100 rounded-lg py-8 h-32 gap-3 w-64 p-8	">
            <button href="" onClick={handleOpcao} value="pedido" className="focus:text-laranja"> Meus Pedidos</button>
            <div className="border-t border-stone-500"></div>
            <button href="" onClick={handleOpcao} value="informacao" className="focus:text-laranja ">Minhas Informações</button>
        </section>
        <section className="md:hidden  mt-8">
            <form action="">
            <select name="" id="" className="bg-laranja text-white h-12 w-60 font-Inter font-semibold text-base rounded-lg" value={opcaoSelecionada} onChange={handleOpcao}>
                <option  value="pedido"  selected className="h-10 w-64">Meus Pedidos</option>
                <option   value="informacao"  className="h-12 w-64">Minhas Informações</option>
            </select>
            </form>
        </section>
        
        <div className="flex flex-col  bg-slate-100 my-10  md:mx-10 py-8  w-4/5 p-4 md:p-10 rounded-lg   ">
            {!opcaoSelecionada || opcaoSelecionada==="pedido"?
                <section className=" ">
                    <div className="flex justify-between">
                        <h2 className="text-black md:text-stone-500 text-base font-semibold ">Meus Pedidos</h2>
                        <span className="flex">
                            <p className="hidden md:flex">Status</p>
                        </span>
                    </div>

                    <div>
                      {purchases.map((purchase, index) => (
                        <div className="my-5 flex flex-col gap-5" key={index}> 
                          <div className="flex justify-between">
                            <h2 className="text-black md:text-stone-500 text-base font-semibold">{purchase.purchase_date_formatted}</h2>
                            <span className="flex">
                              <p className="hidden md:flex">{purchase.status}</p>
                            </span>
                          </div>
                          {purchase.product_title}
                          <br/>
                          R${purchase.purchase_price}
                          <br/>
                          Quantidade:{purchase.quantity}
                        </div>
                      ))}
                    </div>
               
                                    
                </section>    
                :
                <section className=" ">
                    <h1>Nome: {userName}</h1>
                    <h1>E-mail: {userEmail}</h1>
                </section>}
        </div>                 
        
    </div>

    </main>
  );
};

export default MyOrders;
