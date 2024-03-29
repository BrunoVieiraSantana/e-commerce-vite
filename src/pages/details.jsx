import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from "../components/cartProvider";
import AddToCartD from "../components/addToCartD";

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contextValue = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://e-commerce-api-bay.vercel.app/api/v1/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setProduct(data.data[0]);
          setLoading(false);
        } else {
          setError(`Nenhum produto encontrado com o ID ${productId}`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Erro ao buscar o produto');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    contextValue.setCartItems(cartItemsFromStorage);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : product ? (
        <div>
          <main className=" flex justify-center items-center  ">
            <div className="flex flex-col md:flex-row md:items-center mt-14 md:m-40 shadow-lg bg-slate-100 p-6 md:p-7 gap-2 md:gap-16 font-Inter">
              <section className="w-[350px]">
                <img className="w-[223px] md:w-[309px] h-[172px] md:h-[342px]" src={product.mainimg} alt="Imagem Principal" />
                <span className="text-2xl hidden md:flex flex-col gap-6 mt-10">
                  <p className="text-[#1E3A8A] font-semibold ">Quantidade Disponível</p>
                  <p className="font-medium text-stone-500 ">{product.stock === 0 ? 'Produto esgotado' : `${product.stock} Itens Disponíveis`}</p>
                </span>
              </section>
              <section className="flex flex-col ">

                <article className="flex flex-col  gap-7 my-10">
                  <h3 className="font-semibold text-[#1E3A8A] text-4xl">{product.title}</h3>
                  <p className=" text-black text-2xl">R${product.currentprice ? product.currentprice : 'N/A'}</p>
                  <p className="w-[224px] md:w-[514px] text-wrap ">{product.description}</p>
                </article>
                  <AddToCartD
                        name={product.title}
                        price={product.currentprice}
                        thumbnail={product.thumbnail} 
                        product_id={productId}
                      />
              </section>
            </div>
          </main>
        </div>
      ) : (
        <p>Nenhum produto encontrado com o ID {productId}</p>
      )}
    </div>
  );
};

export default Details;
