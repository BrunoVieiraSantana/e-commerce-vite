import React, { useState, useEffect } from 'react';
import styles from "../page.module.css";
import cardStyles from './card.module.css';
import utils from "../components/utils.module.css";
import AddToCart from "../components/addToCart";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProductsAndCategories() {
      try {
        // Fetch products
        const productsResponse = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/products');
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        setProducts(productsData.data);

        // Fetch categories
        const categoriesResponse = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    // Filter products based on selected category
    if (selectedCategory) {
      const filtered = products.filter(product => product.category_id === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={utils.flex}>
      <div className={styles.filter}>
        <h2>Filtrar por Categoria</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id_category} onClick={() => handleCategoryClick(category.id_category)}>
              {category.category_name}
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
            <div key={item.id_product} className={cardStyles.card}>
              <img src={item.mainimg} className={cardStyles.img} alt={item.title}/> 
              <div className={cardStyles.content}>
                <h1>{item.title}</h1>
                <p>{item.description}</p> 
                <span>R${item.currentprice.toFixed(2)}</span> 
                <AddToCart
                  name={item.title}
                  price={item.currentprice}
                  thumbnail={item.thumbnail} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
