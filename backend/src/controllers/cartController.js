import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user.sub

        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: { items: { include: { product: true } } }
            })
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity)
        }, 0)

        res.json({ ...cart, totalAmount })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.sub
        const { productId, quantity = 1 } = req.body

        let cart = await prisma.cart.findUnique({
            where: { userId }
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId }
            })
        }

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: parseInt(productId)
                }
            }
        })

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: parseInt(productId),
                    quantity: parseInt(quantity)
                }
            })
        }

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        const totalAmount = updatedCart.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity)
        }, 0)

        res.json({ ...updatedCart, totalAmount })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.sub
        const itemId = parseInt(req.params.itemId)
        const { quantity } = req.body

        const item = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { cart: true }
        })

        if (!item) {
            return res.status(404).json({ error: 'Item not found' })
        }

        if (item.cart.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        if (quantity <= 0) {
            await prisma.cartItem.delete({ where: { id: itemId } })
        } else {
            await prisma.cartItem.update({
                where: { id: itemId },
                data: { quantity: parseInt(quantity) }
            })
        }

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: item.cartId },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        const totalAmount = updatedCart.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity)
        }, 0)

        res.json({ ...updatedCart, totalAmount })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.sub
        const itemId = parseInt(req.params.itemId)

        const item = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { cart: true }
        })

        if (!item) {
            return res.status(404).json({ error: 'Item not found' })
        }

        if (item.cart.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized' })
        }

        await prisma.cartItem.delete({ where: { id: itemId } })

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: item.cartId },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        const totalAmount = updatedCart.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity)
        }, 0)

        res.json({ ...updatedCart, totalAmount })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
