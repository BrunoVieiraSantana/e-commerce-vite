import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://e-commerce-api-bay.vercel.app/api/v1/categories');
        setCategories(response.data.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categorias</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id_category}>
            <Link to={`/products?category=${category.id_category}`}>{category.category_name}</Link>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default Categories;
