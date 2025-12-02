import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Contact from './pages/Contact'

import LikedProducts from './pages/LikedProducts'
import Profile from './pages/Profile'
import Cart from './pages/Cart'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/liked-products" element={<LikedProducts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  )
}
