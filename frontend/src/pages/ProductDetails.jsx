import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Edit2, Trash2, User } from 'lucide-react'
import { API_BASE_URL } from '../config/env'

export default function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [wishlist, setWishlist] = useState(new Set())

    // Review Form State
    const [newReview, setNewReview] = useState({ content: '', rating: 5 })
    const [editingReview, setEditingReview] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    // Function to decode JWT token
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    // Get user ID from JWT token if not in user object
    const decodedToken = token ? parseJwt(token) : null;
    const userId = user?.id || (decodedToken?.sub || decodedToken?.id);

    // Debug logs - only in development
    if (process.env.NODE_ENV === 'development') {
        console.log('User from localStorage:', user);
        console.log('Decoded token:', decodedToken);
        console.log('Resolved userId:', userId);
    }

    useEffect(() => {
        fetchProduct()
        fetchReviews()
        if (token) fetchLikedProducts()
    }, [id])

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products/${id}`)
            if (res.ok) {
                const data = await res.json()
                setProduct(data)
            } else {
                navigate('/')
            }
        } catch (err) {
            console.error('Error fetching product:', err)
        } finally {
            setLoading(false)
        }
    }

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews/product/${id}`)
            if (res.ok) {
                const data = await res.json()
                setReviews(data)
            }
        } catch (err) {
            console.error('Error fetching reviews:', err)
        }
    }

    const fetchLikedProducts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/likes`, {
                headers: { 'Authorization': `Bearer ${token}` }
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

    const handleAddReview = async (e) => {
        e.preventDefault()
        if (!token) {
            navigate('/login')
            return
        }
        setIsSubmitting(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...newReview, productId: id })
            })
            if (res.ok) {
                setNewReview({ content: '', rating: 5 })
                fetchReviews()
                fetchProduct() // Update rating
            }
        } catch (err) {
            console.error('Error adding review:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUpdateReview = async (e) => {
        e.preventDefault()
        setIsUpdating(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews/${editingReview.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: editingReview.content,
                    rating: editingReview.rating
                })
            })
            if (res.ok) {
                setEditingReview(null)
                fetchReviews()
                fetchProduct()
            }
        } catch (err) {
            console.error('Error updating review:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                fetchReviews()
                fetchProduct()
            }
        } catch (err) {
            console.error('Error deleting review:', err)
        }
    }

    const toggleWishlist = async () => {
        if (!token) {
            navigate('/login')
            return
        }
        try {
            const res = await fetch(`${API_BASE_URL}/api/likes/${id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                const newWishlist = new Set(wishlist)
                if (data.liked) newWishlist.add(parseInt(id))
                else newWishlist.delete(parseInt(id))
                setWishlist(newWishlist)
            }
        } catch (err) {
            console.error('Error toggling like:', err)
        }
    }

    const addToCart = async () => {
        if (!token) {
            navigate('/login')
            return
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId: id, quantity: 1 })
            })
            if (res.ok) {
                window.dispatchEvent(new Event('cartUpdated'))
                alert('Added to cart!')
            }
        } catch (err) {
            console.error('Error adding to cart:', err)
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    if (!product) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Product Section */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Image */}
                        <div className="relative bg-gray-100 rounded-xl overflow-hidden h-96 group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                            <button
                                onClick={toggleWishlist}
                                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                            >
                                <Heart
                                    size={24}
                                    className={wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                                />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <span className="text-blue-600 font-semibold uppercase tracking-wide mb-2">{product.category}</span>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-500 font-medium">({product.reviews} reviews)</span>
                            </div>

                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="ml-3 text-lg text-gray-400 line-through">${product.originalPrice}</span>
                                    )}
                                </div>
                                <button
                                    onClick={addToCart}
                                    className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-semibold"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Reviews List */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                        {reviews.length === 0 ? (
                            <div className="bg-white p-8 rounded-xl text-center text-gray-500">
                                No reviews yet. Be the first to review!
                            </div>
                        ) : (
                            reviews.map(review => (
                                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    {editingReview?.id === review.id ? (
                                        <form onSubmit={handleUpdateReview} className="space-y-4">
                                            <div className="flex gap-2 mb-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setEditingReview({ ...editingReview, rating: star })}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            size={20}
                                                            className={star <= editingReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                            <textarea
                                                value={editingReview.content}
                                                onChange={e => setEditingReview({ ...editingReview, content: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                rows="3"
                                                required
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={isUpdating}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
                                                >
                                                    {isUpdating ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingReview(null)}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                        {review.user.name?.[0]?.toUpperCase() || <User size={20} />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{review.user.name || 'Anonymous'}</h4>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={14}
                                                                    className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                {console.log('Review ownership check:', { userId: user.id, reviewUserId: review.userId, isOwner: parseInt(user.id) === parseInt(review.userId) })}
                                                {console.log('Review ownership check:', { userId, reviewUserId: review.userId, isOwner: parseInt(userId) === parseInt(review.userId) })}
                                                {parseInt(userId) === parseInt(review.userId) && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingReview(review)}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteReview(review.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-600">{review.content}</p>
                                            <span className="text-xs text-gray-400 mt-4 block">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Add Review Form */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
                            {token ? (
                                <form onSubmit={handleAddReview} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        size={24}
                                                        className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                                        <textarea
                                            value={newReview.content}
                                            onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                                            rows="4"
                                            placeholder="Share your thoughts..."
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md shadow-blue-200 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-gray-600 mb-4">Please login to write a review</p>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                                    >
                                        Login Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
