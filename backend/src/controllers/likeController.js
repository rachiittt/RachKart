import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const toggleLike = async (req, res) => {
    try {
        const userId = req.user.sub
        const productId = parseInt(req.params.productId)

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        })

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
            return res.json({ message: 'Unliked', liked: false })
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    productId
                }
            })
            return res.json({ message: 'Liked', liked: true })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

export const getLikedProducts = async (req, res) => {
    try {
        const userId = req.user.sub
        const likes = await prisma.like.findMany({
            where: { userId },
            include: { product: true }
        })
        const products = likes.map(like => like.product)
        res.json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
