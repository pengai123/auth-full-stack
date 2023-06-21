import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')
  const { setUserInfo } = useContext(Context)
  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !passwordConfirm) {
      return setMessage('Please enter all the fields above.')
    }
    if (password !== passwordConfirm) {
      return setMessage('Passwords don\'t match.')
    }
    try {
      const newUser = { name, email, password }
      const { data: user } = await axios.post('/api/users/register', newUser)
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
      case 'name':
        setName(e.target.value)
        break;
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      case 'passwordConfirm':
        setPasswordConfirm(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <div className='form'>
        <form onSubmit={registerHandler}>
          <Typography variant='h6' gutterBottom>
            Register
          </Typography>
          <FormControl margin='normal' fullWidth>
            <TextField size='small' type='text' id="name" label="Name" value={name} name='name' variant="outlined" onChange={onChange} />
          </FormControl >
          <FormControl margin='normal' fullWidth>
            <TextField size='small' type='email' id="email" label="Email" value={email} name='email' variant="outlined" onChange={onChange} />
          </FormControl >
          <FormControl margin='normal' fullWidth>
            <TextField size='small' type="password" id="password" label="Password" value={password} name='password' variant="outlined" onChange={onChange} />
          </FormControl >
          <FormControl margin='normal' fullWidth>
            <TextField size='small' type="password" id="passwordConfirm" label="Confirm Password" value={passwordConfirm} name='passwordConfirm' variant="outlined" onChange={onChange} />
          </FormControl >
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
            Already have an account? <a href="/login">Login</a> now.
          </p>
        </form>
      </div>
    </Container>
  )
}