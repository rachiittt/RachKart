import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products? We're here to help! Reach out to our friendly team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 animate-slideInLeft">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex gap-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">support@rachkart.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (800) 123-4567</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0">
                  <MapPin size={24} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">123 Tech Avenue<br />San Francisco, CA 94105</p>
                </div>
              </div>

              {/* Chat */}
              <div className="flex gap-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0">
                  <MessageSquare size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Live Chat</h3>
                  <p className="text-gray-600">Available 9 AM - 6 PM EST</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-blue-900">⚡ Response time:</span> We typically respond within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fadeInUp">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-fadeInUp">
                ✅ Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 transform hover:scale-105 active:scale-95"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}


// comment
