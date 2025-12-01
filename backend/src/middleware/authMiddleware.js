import jwt from 'jsonwebtoken'

const tokenBlacklist = new Set()

export const authenticate = (req, res, next) => {
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.cookies.token || null)
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    if (tokenBlacklist.has(token)) return res.status(401).json({ error: 'Token is blacklisted' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

export const addToBlacklist = (token) => {
    tokenBlacklist.add(token)
}
