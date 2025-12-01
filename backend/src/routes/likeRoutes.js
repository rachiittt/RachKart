import express from 'express'
import { toggleLike, getLikedProducts } from '../controllers/likeController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/:productId', authenticate, toggleLike)
router.get('/', authenticate, getLikedProducts)

export default router
