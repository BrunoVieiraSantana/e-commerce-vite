import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import MyOrders from "./pages/myorders";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import CartProvider from "./components/cartProvider";
import Products from "./pages/products"; 
import Categories from "./pages/categories"; 

function App() {
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/products" element={<Products/>}/> 
          <Route path="/categories" element={<Categories/>}/> 
        </Routes>
        <Footer />
      </CartProvider>
      </>
    </BrowserRouter>
  );
}

export default App;
