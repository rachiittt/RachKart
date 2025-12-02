import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Save, LogOut } from 'lucide-react'
import { API_BASE_URL } from '../config/env'

export default function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setUser(data.user)
                setFormData(prev => ({
                    ...prev,
                    name: data.user.name,
                    email: data.user.email
                }))
            } else {
                localStorage.removeItem('token')
                navigate('/login')
            }
        } catch (err) {
            console.error('Error fetching profile:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setMessage({ type: '', text: '' })

        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' })
            return
        }

        const token = localStorage.getItem('token')
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    ...(formData.password ? { password: formData.password } : {})
                })
            })

            if (res.ok) {
                const data = await res.json()
                setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
                setMessage({ type: 'success', text: 'Profile updated successfully' })
                setIsEditing(false)
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
            } else {
                const data = await res.json()
                setMessage({ type: 'error', text: data.error || 'Update failed' })
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Server error' })
        }
    }

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' })
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
            window.location.reload()
        } catch (err) {
            console.error('Logout failed:', err)
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <span className="text-4xl font-bold">{user?.name?.[0]?.toUpperCase()}</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                        <p className="text-blue-100">{user?.email}</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>

                        {message.text && (
                            <div className={`p-4 rounded-lg mb-6 ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                                    placeholder="Leave blank to keep current"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    placeholder="Confirm new password"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-4 pt-4">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false)
                                                setFormData(prev => ({
                                                    ...prev,
                                                    name: user.name,
                                                    email: user.email,
                                                    password: '',
                                                    confirmPassword: ''
                                                }))
                                                setMessage({ type: '', text: '' })
                                            }}
                                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                                        >
                                            <Save size={20} />
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
