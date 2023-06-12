import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserInfo } = useContext(Context)
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return
    }
    try {
      const { data: user } = await axios.post('/api/users/auth', { email, password })
      setUserInfo(user)
      localStorage.setItem('userInfo', JSON.stringify(user))
      navigate('/', { replace: true })
    } catch (error) {
      console.log('error:', error.response.data.message)
    }

  }
  return (
    <main>
      <div className='form-card'>
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <div className='form-input'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='form-action'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </main>
  )
}