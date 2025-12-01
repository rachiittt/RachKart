import { useState, useEffect } from 'react'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { API_BASE_URL } from '../config/env'

export default function LikedProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLikedProducts()
    }, [])

    const fetchLikedProducts = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API_BASE_URL}/api/likes`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json()
                setProducts(data)
            }
        } catch (err) {
            console.error('Error fetching liked products:', err)
        } finally {
            setLoading(false)
        }
    }

    const unlikeProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API_BASE_URL}/api/likes/${productId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
            if (res.ok) {
                setProducts(products.filter(p => p.id !== productId))
                // Dispatch event to update navbar
                window.dispatchEvent(new Event('likesUpdated'))
            }
        } catch (err) {
            console.error('Error unliking product:', err)
        }
    }

    if (loading) return <div className="text-center py-20">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Liked Products</h1>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">You haven't liked any products yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                                <div className="relative h-48">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => unlikeProduct(product.id)}
                                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                                    >
                                        <Heart size={20} className="fill-red-500 text-red-500" />
                                    </button>
                                </div>

                                <div className="p-4">
                                    <p className="text-xs text-blue-600 font-semibold mb-1">{product.category}</p>
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

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

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                                        )}
                                    </div>

                                    <button className="w-full btn-primary flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg">
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
