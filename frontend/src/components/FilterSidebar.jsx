import { Star, X } from 'lucide-react'

export default function FilterSidebar({
    filters,
    setFilters,
    isOpen,
    onClose,
    categories = [
        'Electronics',
        'Fashion',
        'Home',
        'Books',
        'Sports',
        'Beauty',
        'Toys',
        'Automotive',
        'Tools',
        'Office'
    ]
}) {
    const handlePriceChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const handleRatingChange = (rating) => {
        setFilters(prev => ({
            ...prev,
            minRating: prev.minRating === rating ? 0 : rating
        }))
    }

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? '' : category
        }))
    }

    const clearFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            minRating: 0,
            category: ''
        })
    }

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
        fixed md:sticky top-0 md:top-20 left-0 h-full md:h-[calc(100vh-6rem)] 
        w-64 bg-white shadow-lg md:shadow-none z-50 md:z-0 
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="p-6 space-y-8">
                    <div className="flex justify-between items-center md:hidden">
                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <label key={category} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters.category === category}
                                        onChange={() => handleCategoryChange(category)}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className={`text-sm group-hover:text-blue-600 transition-colors ${filters.category === category ? 'text-blue-600 font-medium' : 'text-gray-600'
                                        }`}>
                                        {category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                    type="number"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handlePriceChange}
                                    placeholder="Min"
                                    className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handlePriceChange}
                                    placeholder="Max"
                                    className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                        <div className="space-y-2">
                            {[4, 3, 2, 1].map(rating => (
                                <button
                                    key={rating}
                                    onClick={() => handleRatingChange(rating)}
                                    className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition-colors ${filters.minRating === rating ? 'bg-blue-50' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">& Up</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className="w-full py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            </aside>
        </>
    )
}
