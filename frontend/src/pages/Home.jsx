import { ShoppingCart, Heart, Star, Truck, RotateCcw, Lock, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config/env'
import FilterSidebar from '../components/FilterSidebar'
import SortDropdown from '../components/SortDropdown'
import Pagination from '../components/Pagination'

export default function Home() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState(new Set())
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter & Sort State
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    category: ''
  })
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    fetchProducts()
    fetchLikedProducts()
  }, [searchQuery, filters, sortBy, sortOrder, currentPage])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.minRating > 0) params.append('minRating', filters.minRating)
      if (filters.category) params.append('category', filters.category)
      params.append('sortBy', sortBy)
      params.append('sortOrder', sortOrder)
      params.append('page', currentPage)
      params.append('limit', 12)

      const res = await fetch(`${API_BASE_URL}/api/products?${params.toString()}`)
      const data = await res.json()

      if (data.products) {
        setProducts(data.products)
        setTotalPages(data.pagination.totalPages)
      } else {
        setProducts(data) // Fallback for old API response structure if any
      }
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

  const addToCart = async (product) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add items to cart')
      return
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      })
      if (res.ok) {
        // Dispatch event to update navbar cart count
        window.dispatchEvent(new Event('cartUpdated'))
        alert('Added to cart!')
      }
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
  }

  const handleSortChange = (field, order) => {
    setSortBy(field)
    setSortOrder(order)
    setCurrentPage(1) // Reset to first page on sort change
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={20} />
              Filters
            </button>

            <div className="text-gray-600">
              Showing {products.length} products
            </div>

            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Product Image */}
                  <div className="relative bg-gray-100 overflow-hidden h-48 group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300"
                    >
                      <Heart
                        size={20}
                        className={wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">{product.category}</p>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 text-lg">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 h-8">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">({product.reviews})</span>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-blue-200 hover:shadow-lg"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* Features Section (Moved to bottom) */}
      <section className="py-12 px-4 bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4 p-6 rounded-lg bg-blue-50">
              <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-lg bg-purple-50">
              <RotateCcw className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day money back guarantee</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-lg bg-pink-50">
              <Lock className="w-8 h-8 text-pink-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
