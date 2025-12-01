import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function SortDropdown({ sortBy, sortOrder, onSortChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const options = [
        { label: 'Featured', value: 'id', order: 'asc' },
        { label: 'Price: Low to High', value: 'price', order: 'asc' },
        { label: 'Price: High to Low', value: 'price', order: 'desc' },
        { label: 'Name: A-Z', value: 'name', order: 'asc' },
        { label: 'Name: Z-A', value: 'name', order: 'desc' },
        { label: 'Top Rated', value: 'rating', order: 'desc' },
    ]

    const currentOption = options.find(opt => opt.value === sortBy && opt.order === sortOrder) || options[0]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
                <span className="text-sm text-gray-600">Sort by:</span>
                <span className="text-sm font-medium text-gray-900">{currentOption.label}</span>
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-30 animate-fadeIn">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={`${option.value}-${option.order}`}
                                onClick={() => {
                                    onSortChange(option.value, option.order)
                                    setIsOpen(false)
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${currentOption.label === option.label ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
