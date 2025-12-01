import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    // Logic to show limited page numbers (e.g., 1, 2, 3 ... 10) can be added here for large page counts
    // For now, simple list is fine as we have ~50 products / 12 per page = 5 pages

    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={20} className="text-gray-600" />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={20} className="text-gray-600" />
            </button>
        </div>
    )
}
