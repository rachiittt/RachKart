import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const prisma = new PrismaClient()

app.use(cors({
  origin: "https://rach-kart.vercel.app",
  // origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes) 
app.use('/api/likes', likeRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/cart', cartRoutes)


app.get("/",(req,res)=>{
  res.send("Backend is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
