export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 animate-fadeInUp">
          <div className="hover:translate-y-[-5px] transition-transform duration-300">
            <h4 className="font-bold text-white mb-4 text-lg">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-blue-400 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Best Sellers</a></li>
            </ul>
          </div>
          <div className="hover:translate-y-[-5px] transition-transform duration-300">
            <h4 className="font-bold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div className="hover:translate-y-[-5px] transition-transform duration-300">
            <h4 className="font-bold text-white mb-4 text-lg">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Return Policy</a></li>
            </ul>
          </div>
          <div className="hover:translate-y-[-5px] transition-transform duration-300">
            <h4 className="font-bold text-white mb-4 text-lg">Follow Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">&copy; 2025 RachKart. All rights reserved. | Made with ❤️</p>
        </div>
      </div>
    </footer>
  )
}
