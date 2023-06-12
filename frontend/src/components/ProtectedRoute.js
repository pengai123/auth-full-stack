import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasValidAuth, setHasValidAuth] = useState(false)

  const verifyAuth = async () => {
    setIsLoading(true)
    try {
      await axios.get('api/users/profile')
      setIsLoading(false)
      setHasValidAuth(true)
    } catch (error) {
      setIsLoading(false)
      setHasValidAuth(false)
    }
  }
  useEffect(() => {
    verifyAuth()
  }, [])

  if (isLoading) {
    return <h3>Verifying auth...</h3>
  }
  return hasValidAuth ? children : <Navigate to="/login" replace />
}