import { useState } from 'react'
import './App.css'
import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./pages/home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
     <Home/>
     <Footer/>
    </>
  )
}

export default App
