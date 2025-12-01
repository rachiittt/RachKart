import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
    // 1. Electronics
    { name: 'Premium Wireless Headphones', price: 129.99, originalPrice: 199.99, rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', category: 'Electronics', badge: 'Best Seller', description: 'High-quality sound with noise cancellation' },
    { name: 'Smart Watch Pro', price: 299.99, originalPrice: 399.99, rating: 4.6, reviews: 256, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', category: 'Electronics', badge: 'New', description: 'Advanced fitness tracking and notifications' },
    { name: 'Ultra HD Camera', price: 799.99, originalPrice: 999.99, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80', category: 'Electronics', badge: 'Hot', description: '4K video recording with stabilization' },
    { name: 'Portable Speaker', price: 79.99, originalPrice: 129.99, rating: 4.5, reviews: 412, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80', category: 'Electronics', badge: null, description: 'Waterproof design with 12-hour battery' },
    { name: 'Gaming Laptop', price: 1299.99, originalPrice: 1499.99, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80', category: 'Electronics', badge: 'Sale', description: 'High performance gaming laptop with RTX 3060' },
    { name: 'Wireless Earbuds', price: 49.99, originalPrice: 79.99, rating: 4.3, reviews: 567, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', category: 'Electronics', badge: null, description: 'True wireless freedom with charging case' },
    { name: '4K Monitor', price: 349.99, originalPrice: 449.99, rating: 4.6, reviews: 123, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80', category: 'Electronics', badge: null, description: '27-inch IPS display with HDR support' },
    { name: 'Tablet Pro', price: 599.99, originalPrice: 699.99, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80', category: 'Electronics', badge: 'New', description: 'Powerful tablet for creativity and productivity' },
    { name: 'Smart Home Hub', price: 89.99, originalPrice: 119.99, rating: 4.4, reviews: 345, image: 'https://images.unsplash.com/photo-1558002038-1091a16627a3?w=500&q=80', category: 'Electronics', badge: null, description: 'Control your entire home with voice commands' },
    { name: 'Drone with Camera', price: 499.99, originalPrice: 599.99, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80', category: 'Electronics', badge: 'Hot', description: 'Capture stunning aerial footage in 4K' },
    { name: 'VR Headset', price: 299.99, originalPrice: 399.99, rating: 4.5, reviews: 112, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=500&q=80', category: 'Electronics', badge: 'New', description: 'Immersive virtual reality experience' },

    // 2. Fashion
    { name: 'Classic Leather Jacket', price: 199.99, originalPrice: 249.99, rating: 4.5, reviews: 120, image: 'https://images.unsplash.com/photo-1551028919-ac7bcb7d715a?w=500&q=80', category: 'Fashion', badge: 'Classic', description: 'Genuine leather jacket with timeless style' },
    { name: 'Running Shoes', price: 89.99, originalPrice: 119.99, rating: 4.6, reviews: 450, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', category: 'Fashion', badge: 'Best Seller', description: 'Lightweight and comfortable for daily runs' },
    { name: 'Designer Sunglasses', price: 149.99, originalPrice: 199.99, rating: 4.4, reviews: 89, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80', category: 'Fashion', badge: null, description: 'UV protection with stylish frames' },
    { name: 'Denim Jeans', price: 59.99, originalPrice: 79.99, rating: 4.3, reviews: 320, image: 'https://images.unsplash.com/photo-1542272617-08f08630329e?w=500&q=80', category: 'Fashion', badge: null, description: 'Comfortable fit with durable denim' },
    { name: 'Summer Dress', price: 49.99, originalPrice: 69.99, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80', category: 'Fashion', badge: 'New', description: 'Light and breezy for warm days' },
    { name: 'Winter Scarf', price: 29.99, originalPrice: 39.99, rating: 4.8, reviews: 150, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&q=80', category: 'Fashion', badge: null, description: 'Warm wool scarf in various colors' },
    { name: 'Leather Wallet', price: 39.99, originalPrice: 59.99, rating: 4.5, reviews: 280, image: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?w=500&q=80', category: 'Fashion', badge: null, description: 'Slim design with RFID protection' },
    { name: 'Wrist Watch', price: 129.99, originalPrice: 179.99, rating: 4.6, reviews: 190, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80', category: 'Fashion', badge: 'Sale', description: 'Elegant timepiece for any occasion' },
    { name: 'Backpack', price: 69.99, originalPrice: 89.99, rating: 4.4, reviews: 340, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', category: 'Fashion', badge: null, description: 'Spacious and durable for travel or school' },
    { name: 'Sneakers', price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 410, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80', category: 'Fashion', badge: null, description: 'Casual style with all-day comfort' },
    { name: 'Hoodie', price: 39.99, originalPrice: 59.99, rating: 4.6, reviews: 330, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80', category: 'Fashion', badge: 'Best Seller', description: 'Cozy cotton blend hoodie' },

    // 3. Home & Living
    { name: 'Modern Sofa', price: 899.99, originalPrice: 1199.99, rating: 4.7, reviews: 85, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', category: 'Home', badge: 'Best Seller', description: 'Comfortable 3-seater sofa with premium fabric' },
    { name: 'Coffee Table', price: 199.99, originalPrice: 299.99, rating: 4.5, reviews: 120, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&q=80', category: 'Home', badge: null, description: 'Minimalist design with solid wood' },
    { name: 'Table Lamp', price: 49.99, originalPrice: 79.99, rating: 4.6, reviews: 230, image: 'https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=500&q=80', category: 'Home', badge: null, description: 'Adjustable brightness for reading' },
    { name: 'Throw Pillow', price: 24.99, originalPrice: 34.99, rating: 4.8, reviews: 310, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=500&q=80', category: 'Home', badge: null, description: 'Soft and decorative pillow for your couch' },
    { name: 'Wall Clock', price: 39.99, originalPrice: 59.99, rating: 4.4, reviews: 150, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80', category: 'Home', badge: null, description: 'Silent movement with modern design' },
    { name: 'Plant Pot', price: 19.99, originalPrice: 29.99, rating: 4.7, reviews: 280, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80', category: 'Home', badge: null, description: 'Ceramic pot for indoor plants' },
    { name: 'Rug', price: 129.99, originalPrice: 199.99, rating: 4.5, reviews: 95, image: 'https://images.unsplash.com/photo-1575414003502-c4229adb5947?w=500&q=80', category: 'Home', badge: 'Sale', description: 'Soft and durable area rug' },
    { name: 'Curtains', price: 59.99, originalPrice: 89.99, rating: 4.3, reviews: 180, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80', category: 'Home', badge: null, description: 'Blackout curtains for better sleep' },
    { name: 'Bed Sheets', price: 79.99, originalPrice: 109.99, rating: 4.6, reviews: 250, image: 'https://images.unsplash.com/photo-1522771753035-0a153950c6b2?w=500&q=80', category: 'Home', badge: null, description: '100% cotton sheets for comfort' },
    { name: 'Towel Set', price: 34.99, originalPrice: 49.99, rating: 4.8, reviews: 320, image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=500&q=80', category: 'Home', badge: null, description: 'Soft and absorbent bath towels' },
    { name: 'Vase', price: 29.99, originalPrice: 44.99, rating: 4.5, reviews: 140, image: 'https://images.unsplash.com/photo-1581783342308-f792ca11df53?w=500&q=80', category: 'Home', badge: null, description: 'Elegant glass vase for flowers' },

    // 4. Books
    { name: 'The Great Gatsby', price: 14.99, originalPrice: 19.99, rating: 4.7, reviews: 500, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80', category: 'Books', badge: 'Classic', description: 'A classic novel of the Jazz Age' },
    { name: 'To Kill a Mockingbird', price: 12.99, originalPrice: 17.99, rating: 4.9, reviews: 600, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'A powerful story of racial injustice' },
    { name: '1984', price: 13.99, originalPrice: 18.99, rating: 4.8, reviews: 550, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80', category: 'Books', badge: 'Classic', description: 'A dystopian social science fiction novel' },
    { name: 'Pride and Prejudice', price: 11.99, originalPrice: 16.99, rating: 4.7, reviews: 480, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80', category: 'Books', badge: 'Classic', description: 'A romantic novel of manners' },
    { name: 'The Hobbit', price: 15.99, originalPrice: 22.99, rating: 4.9, reviews: 700, image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'A fantasy novel by J.R.R. Tolkien' },
    { name: 'Harry Potter', price: 29.99, originalPrice: 39.99, rating: 4.9, reviews: 800, image: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'The first book in the Harry Potter series' },
    { name: 'The Catcher in the Rye', price: 13.99, originalPrice: 18.99, rating: 4.5, reviews: 400, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80', category: 'Books', badge: 'Classic', description: 'A story of teenage angst and alienation' },
    { name: 'Lord of the Rings', price: 49.99, originalPrice: 69.99, rating: 4.9, reviews: 900, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'Epic high-fantasy novel' },
    { name: 'The Alchemist', price: 14.99, originalPrice: 19.99, rating: 4.7, reviews: 550, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'A philosophical novel about following your dreams' },
    { name: 'Sapiens', price: 18.99, originalPrice: 24.99, rating: 4.8, reviews: 650, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'A brief history of humankind' },
    { name: 'Atomic Habits', price: 16.99, originalPrice: 21.99, rating: 4.9, reviews: 750, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&q=80', category: 'Books', badge: 'Best Seller', description: 'An easy & proven way to build good habits' },

    // 5. Sports & Outdoors
    { name: 'Yoga Mat', price: 24.99, originalPrice: 34.99, rating: 4.6, reviews: 300, image: 'https://images.unsplash.com/photo-1592432678010-1288b66074a9?w=500&q=80', category: 'Sports', badge: null, description: 'Non-slip mat for yoga and pilates' },
    { name: 'Dumbbells Set', price: 49.99, originalPrice: 69.99, rating: 4.7, reviews: 250, image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80', category: 'Sports', badge: null, description: 'Adjustable weights for home workout' },
    { name: 'Running Shorts', price: 19.99, originalPrice: 29.99, rating: 4.5, reviews: 180, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80', category: 'Sports', badge: null, description: 'Breathable fabric for running' },
    { name: 'Tennis Racket', price: 89.99, originalPrice: 129.99, rating: 4.6, reviews: 120, image: 'https://images.unsplash.com/photo-1617083934555-563404543174?w=500&q=80', category: 'Sports', badge: null, description: 'Lightweight racket for beginners' },
    { name: 'Soccer Ball', price: 29.99, originalPrice: 39.99, rating: 4.8, reviews: 350, image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&q=80', category: 'Sports', badge: 'Best Seller', description: 'Official size and weight ball' },
    { name: 'Basketball', price: 34.99, originalPrice: 44.99, rating: 4.7, reviews: 320, image: 'https://images.unsplash.com/photo-1519861531473-920026393112?w=500&q=80', category: 'Sports', badge: null, description: 'Indoor/outdoor basketball' },
    { name: 'Swimming Goggles', price: 14.99, originalPrice: 19.99, rating: 4.5, reviews: 200, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=80', category: 'Sports', badge: null, description: 'Anti-fog goggles for swimming' },
    { name: 'Cycling Helmet', price: 49.99, originalPrice: 69.99, rating: 4.8, reviews: 150, image: 'https://images.unsplash.com/photo-1557803175-2d8c9f169872?w=500&q=80', category: 'Sports', badge: 'Safety', description: 'Protective helmet for cycling' },
    { name: 'Jump Rope', price: 9.99, originalPrice: 14.99, rating: 4.6, reviews: 400, image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&q=80', category: 'Sports', badge: null, description: 'Speed rope for cardio workout' },
    { name: 'Water Bottle', price: 19.99, originalPrice: 24.99, rating: 4.7, reviews: 500, image: 'https://images.unsplash.com/photo-1602143407151-011141959845?w=500&q=80', category: 'Sports', badge: 'Best Seller', description: 'Insulated bottle keeps water cold' },
    { name: 'Camping Tent', price: 129.99, originalPrice: 179.99, rating: 4.7, reviews: 180, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80', category: 'Sports', badge: 'New', description: '2-person waterproof camping tent' },

    // 6. Beauty & Personal Care
    { name: 'Face Moisturizer', price: 24.99, originalPrice: 34.99, rating: 4.6, reviews: 420, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', category: 'Beauty', badge: 'Best Seller', description: 'Hydrating daily moisturizer' },
    { name: 'Lipstick Set', price: 39.99, originalPrice: 59.99, rating: 4.5, reviews: 310, image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80', category: 'Beauty', badge: null, description: 'Matte lipstick in 5 shades' },
    { name: 'Perfume', price: 79.99, originalPrice: 109.99, rating: 4.7, reviews: 250, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80', category: 'Beauty', badge: 'Luxury', description: 'Floral scent for women' },
    { name: 'Hair Dryer', price: 49.99, originalPrice: 79.99, rating: 4.4, reviews: 380, image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500&q=80', category: 'Beauty', badge: null, description: 'Fast drying with ionic technology' },
    { name: 'Makeup Brush Set', price: 29.99, originalPrice: 44.99, rating: 4.6, reviews: 290, image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80', category: 'Beauty', badge: null, description: 'Professional makeup brushes' },
    { name: 'Shampoo', price: 14.99, originalPrice: 19.99, rating: 4.5, reviews: 500, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80', category: 'Beauty', badge: null, description: 'Nourishing shampoo for all hair types' },
    { name: 'Sunscreen', price: 19.99, originalPrice: 24.99, rating: 4.8, reviews: 600, image: 'https://images.unsplash.com/photo-1556228720-1957be83f06c?w=500&q=80', category: 'Beauty', badge: 'Must Have', description: 'SPF 50 broad spectrum protection' },
    { name: 'Face Serum', price: 34.99, originalPrice: 49.99, rating: 4.7, reviews: 350, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', category: 'Beauty', badge: 'New', description: 'Vitamin C serum for glowing skin' },
    { name: 'Body Lotion', price: 12.99, originalPrice: 17.99, rating: 4.6, reviews: 450, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500&q=80', category: 'Beauty', badge: null, description: 'Deeply moisturizing body lotion' },
    { name: 'Nail Polish', price: 9.99, originalPrice: 14.99, rating: 4.4, reviews: 200, image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=500&q=80', category: 'Beauty', badge: null, description: 'Long-lasting nail color' },

    // 7. Toys & Games
    { name: 'Lego Set', price: 59.99, originalPrice: 79.99, rating: 4.9, reviews: 400, image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&q=80', category: 'Toys', badge: 'Best Seller', description: 'Creative building blocks for kids' },
    { name: 'Teddy Bear', price: 19.99, originalPrice: 29.99, rating: 4.8, reviews: 350, image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&q=80', category: 'Toys', badge: null, description: 'Soft and cuddly plush toy' },
    { name: 'Board Game', price: 34.99, originalPrice: 49.99, rating: 4.7, reviews: 280, image: 'https://images.unsplash.com/photo-1610890716171-6b1c9f2c9a99?w=500&q=80', category: 'Toys', badge: 'Family Fun', description: 'Strategy game for the whole family' },
    { name: 'Action Figure', price: 24.99, originalPrice: 34.99, rating: 4.6, reviews: 220, image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=500&q=80', category: 'Toys', badge: null, description: 'Collectible superhero figure' },
    { name: 'Puzzle', price: 14.99, originalPrice: 19.99, rating: 4.5, reviews: 300, image: 'https://images.unsplash.com/photo-1587586062323-836089e60d52?w=500&q=80', category: 'Toys', badge: null, description: '1000-piece landscape puzzle' },
    { name: 'Remote Control Car', price: 49.99, originalPrice: 69.99, rating: 4.4, reviews: 180, image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&q=80', category: 'Toys', badge: 'New', description: 'High speed RC car' },
    { name: 'Doll', price: 29.99, originalPrice: 39.99, rating: 4.6, reviews: 250, image: 'https://images.unsplash.com/photo-1560859259-77a7438df89f?w=500&q=80', category: 'Toys', badge: null, description: 'Fashion doll with accessories' },
    { name: 'Toy Train', price: 39.99, originalPrice: 59.99, rating: 4.7, reviews: 150, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80', category: 'Toys', badge: null, description: 'Wooden train set for toddlers' },
    { name: 'Art Kit', price: 24.99, originalPrice: 34.99, rating: 4.5, reviews: 200, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80', category: 'Toys', badge: null, description: 'Drawing and painting supplies' },
    { name: 'Kite', price: 12.99, originalPrice: 17.99, rating: 4.3, reviews: 120, image: 'https://images.unsplash.com/photo-1534685782349-1552917a5375?w=500&q=80', category: 'Toys', badge: null, description: 'Colorful kite for outdoor fun' },

    // 8. Automotive
    { name: 'Car Vacuum', price: 39.99, originalPrice: 59.99, rating: 4.5, reviews: 250, image: 'https://images.unsplash.com/photo-1552934571-2cd89b6021d9?w=500&q=80', category: 'Automotive', badge: null, description: 'Portable handheld vacuum for car' },
    { name: 'Phone Mount', price: 19.99, originalPrice: 29.99, rating: 4.6, reviews: 400, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', category: 'Automotive', badge: 'Best Seller', description: 'Secure dashboard phone holder' },
    { name: 'Seat Cover', price: 49.99, originalPrice: 79.99, rating: 4.4, reviews: 180, image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=500&q=80', category: 'Automotive', badge: null, description: 'Universal fit car seat covers' },
    { name: 'Car Wax', price: 14.99, originalPrice: 24.99, rating: 4.7, reviews: 300, image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&q=80', category: 'Automotive', badge: null, description: 'Premium car wax for shine' },
    { name: 'Tire Inflator', price: 34.99, originalPrice: 49.99, rating: 4.6, reviews: 220, image: 'https://images.unsplash.com/photo-1598556851480-164749653700?w=500&q=80', category: 'Automotive', badge: 'Essential', description: 'Digital portable tire pump' },
    { name: 'Dash Cam', price: 89.99, originalPrice: 129.99, rating: 4.5, reviews: 150, image: 'https://images.unsplash.com/photo-1592853625601-bb9d23da126e?w=500&q=80', category: 'Automotive', badge: 'New', description: '1080p dashboard camera' },
    { name: 'Car Air Freshener', price: 9.99, originalPrice: 14.99, rating: 4.3, reviews: 350, image: 'https://images.unsplash.com/photo-1545591841-2b2976869525?w=500&q=80', category: 'Automotive', badge: null, description: 'Long-lasting scent' },
    { name: 'Steering Wheel Cover', price: 19.99, originalPrice: 29.99, rating: 4.4, reviews: 200, image: 'https://images.unsplash.com/photo-1619551734325-81aaf323686c?w=500&q=80', category: 'Automotive', badge: null, description: 'Comfortable grip cover' },
    { name: 'Car Wash Kit', price: 29.99, originalPrice: 44.99, rating: 4.6, reviews: 180, image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&q=80', category: 'Automotive', badge: null, description: 'Complete car cleaning set' },
    { name: 'Jumper Cables', price: 24.99, originalPrice: 34.99, rating: 4.8, reviews: 280, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&q=80', category: 'Automotive', badge: 'Essential', description: 'Heavy duty booster cables' },

    // 9. Tools & Home Improvement
    { name: 'Drill Set', price: 89.99, originalPrice: 129.99, rating: 4.7, reviews: 200, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80', category: 'Tools', badge: 'Best Seller', description: 'Cordless drill with bits' },
    { name: 'Hammer', price: 14.99, originalPrice: 19.99, rating: 4.6, reviews: 300, image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&q=80', category: 'Tools', badge: null, description: 'Sturdy claw hammer' },
    { name: 'Screwdriver Set', price: 24.99, originalPrice: 34.99, rating: 4.5, reviews: 250, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80', category: 'Tools', badge: null, description: 'Precision screwdrivers' },
    { name: 'Tape Measure', price: 9.99, originalPrice: 14.99, rating: 4.4, reviews: 400, image: 'https://images.unsplash.com/photo-1586864387789-628af9fe484d?w=500&q=80', category: 'Tools', badge: null, description: '25ft retractable tape' },
    { name: 'Wrench Set', price: 39.99, originalPrice: 59.99, rating: 4.7, reviews: 180, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=500&q=80', category: 'Tools', badge: null, description: 'Metric and SAE wrenches' },
    { name: 'Pliers', price: 12.99, originalPrice: 17.99, rating: 4.5, reviews: 220, image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&q=80', category: 'Tools', badge: null, description: 'Needle nose pliers' },
    { name: 'Tool Box', price: 49.99, originalPrice: 69.99, rating: 4.6, reviews: 150, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80', category: 'Tools', badge: null, description: 'Durable storage for tools' },
    { name: 'Flashlight', price: 19.99, originalPrice: 29.99, rating: 4.8, reviews: 350, image: 'https://images.unsplash.com/photo-1524359538299-38445b404a5e?w=500&q=80', category: 'Tools', badge: 'Bright', description: 'LED tactical flashlight' },
    { name: 'Saw', price: 29.99, originalPrice: 44.99, rating: 4.4, reviews: 120, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80', category: 'Tools', badge: null, description: 'Hand saw for wood cutting' },
    { name: 'Level', price: 14.99, originalPrice: 19.99, rating: 4.5, reviews: 200, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80', category: 'Tools', badge: null, description: '24-inch bubble level' },

    // 10. Office Products
    { name: 'Office Chair', price: 149.99, originalPrice: 249.99, rating: 4.6, reviews: 150, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80', category: 'Office', badge: 'Comfort', description: 'Ergonomic mesh chair' },
    { name: 'Desk Lamp', price: 39.99, originalPrice: 59.99, rating: 4.7, reviews: 200, image: 'https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=500&q=80', category: 'Office', badge: null, description: 'LED desk lamp with USB port' },
    { name: 'Notebook', price: 9.99, originalPrice: 14.99, rating: 4.8, reviews: 400, image: 'https://images.unsplash.com/photo-1531346878377-a513bc950634?w=500&q=80', category: 'Office', badge: null, description: 'Hardcover lined notebook' },
    { name: 'Pen Set', price: 14.99, originalPrice: 24.99, rating: 4.5, reviews: 300, image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500&q=80', category: 'Office', badge: null, description: 'Premium ballpoint pens' },
    { name: 'Stapler', price: 12.99, originalPrice: 17.99, rating: 4.4, reviews: 250, image: 'https://images.unsplash.com/photo-1626263468007-a9e0cf83f1ac?w=500&q=80', category: 'Office', badge: null, description: 'Heavy duty stapler' },
    { name: 'Mouse Pad', price: 19.99, originalPrice: 29.99, rating: 4.6, reviews: 350, image: 'https://images.unsplash.com/photo-1615324310574-2c2595f9c158?w=500&q=80', category: 'Office', badge: null, description: 'Large extended mouse pad' },
    { name: 'File Organizer', price: 24.99, originalPrice: 34.99, rating: 4.5, reviews: 180, image: 'https://images.unsplash.com/photo-1586769852044-692d6e37d74e?w=500&q=80', category: 'Office', badge: null, description: 'Desktop document holder' },
    { name: 'Calculator', price: 14.99, originalPrice: 24.99, rating: 4.7, reviews: 220, image: 'https://images.unsplash.com/photo-1574607383476-f517b260d35b?w=500&q=80', category: 'Office', badge: null, description: 'Solar powered calculator' },
    { name: 'Whiteboard', price: 49.99, originalPrice: 69.99, rating: 4.4, reviews: 120, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80', category: 'Office', badge: null, description: 'Magnetic dry erase board' },
    { name: 'Printer Paper', price: 34.99, originalPrice: 44.99, rating: 4.8, reviews: 500, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&q=80', category: 'Office', badge: 'Essential', description: '500 sheets multipurpose paper' }
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
