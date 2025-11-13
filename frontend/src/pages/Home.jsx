import { Heart } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [likedArticles, setLikedArticles] = useState({})

  const newsArticles = [
    {
      id: 1,
      title: 'Tech Giants Report Record Earnings',
      description: 'Major technology companies announce their strongest quarterly results, beating market expectations.',
      category: 'Technology',
      date: 'Nov 12, 2025',
      image: '/images/tech-news.svg',
      author: 'Sarah Chen',
      readTime: '5 min read',
      claps: 2340
    },
    {
      id: 2,
      title: 'Stock Market Reaches All-Time High',
      description: 'Global markets surge as investors gain confidence in economic recovery and growth prospects.',
      category: 'Markets',
      date: 'Nov 12, 2025',
      image: '/images/market-news.svg',
      author: 'James Wilson',
      readTime: '7 min read',
      claps: 1856
    },
    {
      id: 3,
      title: 'Cryptocurrency Volatility Continues',
      description: 'Digital assets experience significant price fluctuations amid regulatory developments.',
      category: 'Crypto',
      date: 'Nov 11, 2025',
      image: '/images/crypto-news.svg',
      author: 'Alex Morgan',
      readTime: '6 min read',
      claps: 3102
    },
    {
      id: 4,
      title: 'Banking Sector Shows Resilience',
      description: 'Financial institutions demonstrate strong fundamentals despite economic headwinds.',
      category: 'Finance',
      date: 'Nov 11, 2025',
      image: '/images/finance-news.svg',
      author: 'Emma Richardson',
      readTime: '8 min read',
      claps: 1543
    },
    {
      id: 5,
      title: 'Oil Prices Stabilize on Supply News',
      description: 'Energy markets stabilize following announcements about production decisions.',
      category: 'Energy',
      date: 'Nov 10, 2025',
      image: '/images/energy-news.svg',
      author: 'Michael Torres',
      readTime: '5 min read',
      claps: 892
    },
    {
      id: 6,
      title: 'Real Estate Market Booms Across Regions',
      description: 'Property values surge as demand remains strong in major metropolitan areas.',
      category: 'Real Estate',
      date: 'Nov 10, 2025',
      image: '/images/realestate-news.svg',
      author: 'Lisa Anderson',
      readTime: '6 min read',
      claps: 1220
    }
  ]

  const toggleLike = (id) => {
    setLikedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Featured Article */}
        <div className="mb-12 border-b border-gray-200 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Featured</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {newsArticles[0].title}
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {newsArticles[0].description}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold text-gray-900">{newsArticles[0].author}</p>
                  <p className="text-sm text-gray-600">{newsArticles[0].date} • {newsArticles[0].readTime}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="relative h-80 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={newsArticles[0].image}
                  alt={newsArticles[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {newsArticles.slice(1).map((article) => (
                <article
                  key={article.id}
                  className="border-b border-gray-200 pb-8 group cursor-pointer"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* Article Content */}
                    <div className="sm:col-span-3">
                      <div className="mb-3">
                        <span className="text-sm text-gray-700 font-medium">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-base mb-4 line-clamp-2">
                        {article.description}
                      </p>

                      {/* Article Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{article.author}</p>
                            <p className="text-xs text-gray-600">{article.date} • {article.readTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleLike(article.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Heart
                              size={16}
                              className={likedArticles[article.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Article Image */}
                    <div className="sm:col-span-1">
                      <div className="relative h-32 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 transition-opacity">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending Section */}
            <div className="sticky top-20">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trending</h3>
                <div className="space-y-6">
                  {newsArticles.slice(0, 3).map((article, index) => (
                    <div key={article.id} className="group cursor-pointer">
                      <p className="text-sm font-bold text-gray-600 mb-1">{index + 1}</p>
                      <h4 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        by <span className="font-medium">{article.author}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe to our newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with the latest financial news and market insights
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button className="w-full px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
