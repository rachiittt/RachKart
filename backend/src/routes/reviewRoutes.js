import express from 'express'
import { addReview, updateReview, deleteReview, getProductReviews } from '../controllers/reviewController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authenticate, addReview)
router.put('/:id', authenticate, updateReview)
router.delete('/:id', authenticate, deleteReview)
router.get('/product/:productId', getProductReviews)

export default router
