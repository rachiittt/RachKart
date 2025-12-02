import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { API_BASE_URL } from '../config/env'

export default function Cart() {
    const navigate = useNavigate()
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchCart()
    }, [])

    const fetchCart = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setCart(data)
            }
        } catch (err) {
            console.error('Error fetching cart:', err)
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            })
            if (res.ok) {
                const data = await res.json()
                setCart(data)
            }
        } catch (err) {
            console.error('Error updating quantity:', err)
        }
    }

    const removeItem = async (itemId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setCart(data)
            }
        } catch (err) {
            console.error('Error removing item:', err)
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                </div>

                {!cart?.items || cart.items.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some products to get started!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.items.map(item => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 flex gap-6">
                                    {/* Product Image */}
                                    <div
                                        className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                                        onClick={() => navigate(`/product/${item.product.id}`)}
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3
                                                    className="font-bold text-lg text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                                                    onClick={() => navigate(`/product/${item.product.id}`)}
                                                >
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{item.product.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.product.description}</p>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-gray-900">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ${item.product.price.toFixed(2)} each
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cart.items.length} items)</span>
                                        <span>${cart.totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-900">
                                            <span>Total</span>
                                            <span>${cart.totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-200 mb-3">
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
