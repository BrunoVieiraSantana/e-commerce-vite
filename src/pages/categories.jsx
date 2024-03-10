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
    <div className="min-h-[200px]"> {/* Definindo a altura mínima da página */}
      <main className="flex justify-center my-14 md:my-20">
        <div className="grid md:grid-cols-4 gap-10">
          {categories.map(category => (
            <main key={category.id_category} className="flex items-center shadow-xl bg-slate-100 rounded-lg w-52 h-24">
              <img src={`/images/${category.id_category}.png`} alt="" className="h-20 w-20" />
              <Link className="mx-3 font-Inter font-semibold text-base text-black" to={`/products?category=${category.id_category}`}>{category.category_name}</Link>
            </main>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Categories;
