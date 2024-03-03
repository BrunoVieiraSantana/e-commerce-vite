// details.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : product ? (
        <div>
          <h2>Detalhes do Produto {productId}</h2>
          <p>Título: {product.title}</p>
          <p>Descrição: {product.description}</p>
          <p>Preço Atual: R${product.currentprice ? product.currentprice.toFixed(2) : 'N/A'}</p>
          {/* Adicione outros detalhes conforme necessário */}
        </div>
      ) : (
        <p>Nenhum produto encontrado com o ID {productId}</p>
      )}
    </div>
  );
};

export default Details;
