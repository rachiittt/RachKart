import { CheckCircle, Users, Zap, Globe } from 'lucide-react'

export default function About() {
  const values = [
    {
      title: 'Quality Products',
      description: 'We curate and offer only the highest quality tech products.',
      icon: Zap
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our top priority and mission.',
      icon: Users
    },
    {
      title: 'Best Prices',
      description: 'We guarantee the most competitive prices in the market.',
      icon: Globe
    },
    {
      title: 'Fast Shipping',
      description: 'Quick and reliable delivery to your doorstep.'
    }
  ]

  const team = [
    {
      name: 'Rachit Singh',
      role: 'Founder & CEO',
      bio: 'Tech enthusiast with a passion for e-commerce'
    },
    {
      name: 'Alex Kumar',
      role: 'Product Manager',
      bio: 'Expert in tech products and customer experience'
    },
    {
      name: 'Sarah Chen',
      role: 'Operations Lead',
      bio: 'Ensuring smooth operations and logistics'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About RachKart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted destination for premium tech products at unbeatable prices. We believe in quality, customer satisfaction, and innovation.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 border-b border-gray-200 pb-16">
          <div className="animate-slideInLeft">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              RachKart was founded in 2024 with a vision to revolutionize online shopping for tech products.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We noticed that finding quality tech products at reasonable prices was challenging. We decided to create a platform where customers can shop with confidence and trust.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, RachKart serves thousands of satisfied customers who trust us for their tech needs.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-96 flex items-center justify-center animate-bounce-slow">
            <div className="text-8xl">🛒</div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all bg-white">
                <div className="flex items-start gap-4">
                  <CheckCircle size={24} className="flex-shrink-0 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 border-b border-gray-200 pb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mx-auto mb-4 flex items-center justify-center text-4xl">👤</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Ready to shop with us?</h3>
          <p className="text-blue-100 mb-6">Explore our amazing collection of tech products</p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start Shopping
          </button>
        </div>
      </main>
    </div>
  )
}
