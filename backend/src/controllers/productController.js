import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const { search } = req.query
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } }
            ]
        } : {}

        const products = await prisma.product.findMany({ where })
        res.json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
