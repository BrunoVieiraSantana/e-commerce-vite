import React, { useState, useEffect } from 'react';
import styles from "../page.module.css";
import cardStyles from './card.module.css';
import utils from "../components/utils.module.css";
import { Link, useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { search } = useLocation();
  const categoryId = new URLSearchParams(search).get('category');

  useEffect(() => {
    async function fetchProductsAndCategories() {
      try {
        const productsResponse = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/products');
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        setProducts(productsData.data);

        const categoriesResponse = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        const allCategories = [{ id_category: null, category_name: "Todas as categorias" }, ...categoriesData.data];
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      const filtered = categoryId === "null" ? products : products.filter(product => product.category_id === parseInt(categoryId));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [categoryId, products]);

  return (
    <div className={utils.flex}>
      <div className={styles.filter}>
        <h2>Filtrar por Categoria</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id_category}>
              <Link to={`/products?category=${category.id_category}`} className={categoryId === category.id_category ? styles.active : ''}>
                {category.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.productDetail}>
        <span className={`${styles.companyName} ${utils.upperCase} ${utils.textOrange400} ${utils.fs300} ${utils.fw700}`}>
          Produtos
        </span>
        <div className={cardStyles.cardContainer}>
          {filteredProducts.map((item) => (
            <Link key={item.id_product} to={`/details/${item.id_product}`} className={cardStyles.link}>
              <div className={cardStyles.card}>
                <img src={item.mainimg} className={cardStyles.img} alt={item.title}/> 
                <div className={cardStyles.content}>
                  <h1>{item.title}</h1>
                  <span>R${item.currentprice}</span> 
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
