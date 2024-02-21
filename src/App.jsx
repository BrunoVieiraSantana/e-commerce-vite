import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./pages/home"
import MyOrders from "./pages/myorders"
import SignIn from "./pages/signin"
import SignUp from "./pages/signup"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/myorders" element={<MyOrders/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
