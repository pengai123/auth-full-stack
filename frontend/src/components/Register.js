import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { setUserInfo } = useContext(Context)
  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !passwordConfirm || password !== passwordConfirm) {
      return
    }
    try {
      const newUser = { name, email, password }
      const { data: user } = await axios.post('/api/users/register', newUser)
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
        <h2>Register</h2>
        <form onSubmit={registerHandler}>
          <div className='form-input'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='form-input'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='form-input'>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" name='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>
          <div className='form-action'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </main>
  )
}