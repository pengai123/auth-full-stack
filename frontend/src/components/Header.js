import { useContext } from 'react'
import { Context } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { userInfo, setUserInfo } = useContext(Context)
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      await axios.post('/api/users/logout')
      setUserInfo(null)
      localStorage.removeItem('userInfo')
      navigate('/', { replace: true })
    } catch (error) {
      console.log('error:', error.response.data)
    }
  }

  return (
    <div className='header'>
      <a href="/">
        <div className="logo">Logo</div>
      </a>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        {userInfo ?
          <>
            <li><span onClick={() => navigate('/profile', { replace: true })} >Profile</span></li>
            <li><span onClick={logoutHandler}>Logout</span></li>
          </> :
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        }
      </ul>
    </div>
  )
}