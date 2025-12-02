import express from 'express'
import { signup, login, logout, getMe, updateProfile } from '../controllers/authController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authenticate, getMe)
router.put('/me', authenticate, updateProfile)

export default router
