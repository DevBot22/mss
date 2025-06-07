'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  _id: string
  name: string
  email: string
  role: string
}

type Errors = {
  err: string
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  async function getUsers() {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setError('No token found. Redirecting to login...')
        router.push('/login')
        return
      }

      const res = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsers(res.data)
    } catch (err: Errors) {
      const msg = err.response?.data?.message || 'Failed to load users.'
      console.error('❌ Error fetching users:', msg)
      setError(msg)

      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="border p-4 rounded-lg shadow bg-white"
              >
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
