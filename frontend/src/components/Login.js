import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { setUserInfo } = useContext(Context)
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return setMessage('Please enter all the fields above.')
    }
    setMessage('')
    try {
      const { data: user } = await axios.post('/api/users/auth', { email, password })
      setUserInfo(user)
      localStorage.setItem('userInfo', JSON.stringify(user))
      navigate('/', { replace: true })
    } catch (error) {
      setMessage(error.response.data.message)
      console.log('error:', error.response.data.message)
    }
  }

  const onChange = (e) => {
    setMessage('')
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <div className='form'>
        <form onSubmit={loginHandler}>
          <Typography variant='h6' gutterBottom>
            Login
          </Typography>
          <FormControl margin='normal' fullWidth>
            <TextField size='small' type='email' id="email" label="Email" value={email} name='email' variant="outlined" onChange={onChange} />
          </FormControl >
          <FormControl margin='normal' fullWidth>
            <TextField size='small' type='password' id="password" label="Password" value={password} name='password' variant="outlined" onChange={onChange} />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <Button type='submit' variant='contained'>Submit</Button>
          </FormControl>
          {message ?
            <p className='form-msg'>
              {`* ${message}`}
            </p>
            : null
          }
          <p className='redirect-msg'>
            Don't have an account? <a href="/register">Register</a> now.
          </p>
        </form>
      </div>
    </Container>
  )
}