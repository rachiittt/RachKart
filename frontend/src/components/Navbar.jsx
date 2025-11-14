import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, ShoppingCart, Heart } from 'lucide-react'
import { API_BASE_URL } from '../config/env'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuth(Boolean(token))
  }, [])

  return (
    <nav className="border-b border-gray-200 sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slideInLeft">🛒 RachKart</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
            <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
              <Search size={18} className="text-blue-600" />
            </button>
            <button className="relative p-2 hover:bg-blue-100 rounded-full transition-colors">
              <ShoppingCart size={20} className="text-gray-700 hover:text-blue-600" />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
            </button>
            <button className="p-2 hover:bg-blue-100 rounded-full transition-colors">
              <Heart size={20} className="text-gray-700 hover:text-red-500" />
            </button>
            {!isAuth ? (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    isActive('/login') 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={async () => {
                  const token = localStorage.getItem('token')
                  try {
                    await fetch(`${API_BASE_URL}/api/auth/logout`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : ''
                      },
                      body: JSON.stringify({ token })
                    })
                  } catch (err) {
                    console.warn('Logout API error', err)
                  }
                  localStorage.removeItem('token')
                  setIsAuth(false)
                  navigate('/')
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4 space-y-3 animate-fadeInUp">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Shop
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
            {!isAuth ? (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={async () => {
                  const token = localStorage.getItem('token')
                  try {
                    await fetch(`${API_BASE_URL}/api/auth/logout`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : ''
                      },
                      body: JSON.stringify({ token })
                    })
                  } catch (err) {
                    console.warn('Logout API error', err)
                  }
                  localStorage.removeItem('token')
                  setIsAuth(false)
                  navigate('/')
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
