import { ShoppingCart, Heart, Star, Truck, RotateCcw, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/env'

export default function Home() {
  const [wishlist, setWishlist] = useState(new Set())
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchLikedProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLikedProducts = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch(`${API_BASE_URL}/api/likes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        const likedIds = new Set(data.map(p => p.id))
        setWishlist(likedIds)
      }
    } catch (err) {
      console.error('Error fetching likes:', err)
    }
  }

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to like products')
      return
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/likes/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })

      if (res.ok) {
        const data = await res.json()
        const newWishlist = new Set(wishlist)
        if (data.liked) {
          newWishlist.add(productId)
        } else {
          newWishlist.delete(productId)
        }
        setWishlist(newWishlist)
        // Dispatch event to update navbar
        window.dispatchEvent(new Event('likesUpdated'))
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    }
  }

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fadeInUp">
              <h1 className="text-5xl font-bold mb-4 leading-tight">Welcome to RachKart</h1>
              <p className="text-xl text-blue-100 mb-6">Discover amazing tech products at unbeatable prices. Shop now and save big!</p>
              <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Start Shopping
              </button>
            </div>
            <div className="animate-bounce-slow">
              <div className="text-8xl text-center">🛍️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-shadow">
              <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-lg bg-gradient-to-br from-purple-50 to-transparent hover:shadow-lg transition-shadow">
              <RotateCcw className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day money back guarantee</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-lg bg-gradient-to-br from-pink-50 to-transparent hover:shadow-lg transition-shadow">
              <Lock className="w-8 h-8 text-pink-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Handpicked selection of top-rated products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-blue-600 font-semibold mb-1">{product.category}</p>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full btn-primary flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 my-8">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h2 className="text-4xl font-bold mb-4">Limited Time Offer!</h2>
          <p className="text-xl text-blue-100 mb-8">Get up to 40% off on selected items. Shop now before stock runs out!</p>
          <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            View All Deals
          </button>
        </div>
      </section>
    </div>
  )
}
