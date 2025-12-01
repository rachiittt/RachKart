import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
    {
        name: 'Premium Wireless Headphones',
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.8,
        reviews: 342,
        image: 'https://via.placeholder.com/250x250/3B82F6/FFFFFF?text=Headphones',
        category: 'Electronics',
        badge: 'Best Seller',
        description: 'High-quality sound with noise cancellation'
    },
    {
        name: 'Smart Watch Pro',
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.6,
        reviews: 256,
        image: 'https://via.placeholder.com/250x250/8B5CF6/FFFFFF?text=SmartWatch',
        category: 'Wearables',
        badge: 'New',
        description: 'Advanced fitness tracking and notifications'
    },
    {
        name: 'Ultra HD Camera',
        price: 799.99,
        originalPrice: 999.99,
        rating: 4.9,
        reviews: 189,
        image: 'https://via.placeholder.com/250x250/EC4899/FFFFFF?text=Camera',
        category: 'Photography',
        badge: 'Hot',
        description: '4K video recording with stabilization'
    },
    {
        name: 'Portable Speaker',
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 412,
        image: 'https://via.placeholder.com/250x250/F59E0B/FFFFFF?text=Speaker',
        category: 'Audio',
        badge: null,
        description: 'Waterproof design with 12-hour battery'
    },
    {
        name: 'Mechanical Keyboard RGB',
        price: 149.99,
        originalPrice: 249.99,
        rating: 4.7,
        reviews: 523,
        image: 'https://via.placeholder.com/250x250/10B981/FFFFFF?text=Keyboard',
        category: 'Gaming',
        badge: 'Sale',
        description: 'Cherry MX switches with RGB lighting'
    },
    {
        name: 'Wireless Mouse Pro',
        price: 59.99,
        originalPrice: 99.99,
        rating: 4.4,
        reviews: 298,
        image: 'https://via.placeholder.com/250x250/06B6D4/FFFFFF?text=Mouse',
        category: 'Accessories',
        badge: null,
        description: 'Precision tracking up to 4000 DPI'
    },
    {
        name: 'USB-C Hub Multi Port',
        price: 39.99,
        originalPrice: 79.99,
        rating: 4.6,
        reviews: 187,
        image: 'https://via.placeholder.com/250x250/6366F1/FFFFFF?text=USB+Hub',
        category: 'Accessories',
        badge: 'New',
        description: '7-in-1 connectivity solution'
    },
    {
        name: 'Phone Stand & Holder',
        price: 24.99,
        originalPrice: 49.99,
        rating: 4.3,
        reviews: 654,
        image: 'https://via.placeholder.com/250x250/8B5CF6/FFFFFF?text=Phone+Stand',
        category: 'Accessories',
        badge: null,
        description: 'Adjustable and portable design'
    }
]

async function main() {
    console.log('Start seeding ...')
    for (const product of products) {
        const p = await prisma.product.create({
            data: product,
        })
        console.log(`Created product with id: ${p.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
