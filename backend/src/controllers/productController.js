import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
