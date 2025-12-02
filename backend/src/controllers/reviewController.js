import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Add a review
export const addReview = async (req, res) => {
    try {
        const userId = req.user.sub
        const { productId, content, rating } = req.body

        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        })

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const review = await prisma.review.create({
            data: {
                userId,
                productId: parseInt(productId),
                content,
                rating: parseInt(rating)
            },
            include: {
                user: {
                    select: { id: true, name: true }
                }
            }
        })

        const aggregations = await prisma.review.aggregate({
            where: { productId: parseInt(productId) },
            _avg: { rating: true },
            _count: { id: true }
        })

        await prisma.product.update({
            where: { id: parseInt(productId) },
            data: {
                rating: aggregations._avg.rating || 0,
                reviews: aggregations._count.id
            }
        })

        return res.status(201).json({
            ...review,
            isOwner: true   // since creator is always owner
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}


// Edit a review
export const updateReview = async (req, res) => {
    try {
        const userId = req.user.sub
        const reviewId = parseInt(req.params.id)
        const { content, rating } = req.body

        const review = await prisma.review.findUnique({
            where: { id: reviewId }
        })

        if (!review) return res.status(404).json({ error: 'Review not found' })
        if (review.userId !== userId) return res.status(403).json({ error: 'Not authorized' })

        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                content,
                rating: rating ? parseInt(rating) : review.rating
            },
            include: {
                user: {
                    select: { id: true, name: true }
                }
            }
        })

        const aggregations = await prisma.review.aggregate({
            where: { productId: review.productId },
            _avg: { rating: true },
            _count: { id: true }
        })

        await prisma.product.update({
            where: { id: review.productId },
            data: {
                rating: aggregations._avg.rating || 0,
                reviews: aggregations._count.id
            }
        })

        return res.json({
            ...updatedReview,
            isOwner: true
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}


// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const userId = req.user.sub
        const reviewId = parseInt(req.params.id)

        const review = await prisma.review.findUnique({
            where: { id: reviewId }
        })

        if (!review) {
            return res.status(404).json({ error: 'Review not found' })
        }

        if (review.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        await prisma.review.delete({
            where: { id: reviewId }
        })

        // Update product rating and review count
        const aggregations = await prisma.review.aggregate({
            where: { productId: review.productId },
            _avg: { rating: true },
            _count: { id: true }
        })

        await prisma.product.update({
            where: { id: review.productId },
            data: {
                rating: aggregations._avg.rating || 0,
                reviews: aggregations._count.id
            }
        })

        res.json({ message: 'Review deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// Get reviews for a product
export const getProductReviews = async (req, res) => {
    try {
        const productId = parseInt(req.params.productId)
        const userId = req.user?.sub || null

        const reviews = await prisma.review.findMany({
            where: { productId },
            include: {
                user: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        const formatted = reviews.map(r => ({
            ...r,
            isOwner: (userId && r.userId === userId) ? true : false
        }))

        res.json(formatted)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}


// comment test 