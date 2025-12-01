import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const {
            search,
            page = 1,
            limit = 12,
            minPrice,
            maxPrice,
            minRating,
            sortBy,
            sortOrder = 'asc',
            category
        } = req.query

        const pageNum = parseInt(page)
        const limitNum = parseInt(limit)
        const skip = (pageNum - 1) * limitNum

        // Build where clause
        const where = {
            AND: []
        }

        if (search) {
            where.AND.push({
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { category: { contains: search, mode: 'insensitive' } }
                ]
            })
        }

        if (category) {
            where.AND.push({ category: { equals: category, mode: 'insensitive' } })
        }

        if (minPrice) {
            where.AND.push({ price: { gte: parseFloat(minPrice) } })
        }

        if (maxPrice) {
            where.AND.push({ price: { lte: parseFloat(maxPrice) } })
        }

        if (minRating) {
            where.AND.push({ rating: { gte: parseFloat(minRating) } })
        }

        // Build order by
        let orderBy = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy = { id: 'asc' } // Default sort
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limitNum,
                orderBy
            }),
            prisma.product.count({ where })
        ])

        res.json({
            products,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
