import express from 'express'
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticate, getCart)
router.post('/', authenticate, addToCart)
router.put('/:itemId', authenticate, updateCartItem)
router.delete('/:itemId', authenticate, removeFromCart)

export default router
