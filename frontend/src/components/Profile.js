import { useContext } from 'react'
import { Context } from '../App'
export default function Profile() {
  const { userInfo } = useContext(Context)
  return (
    <main>
      <h3>{userInfo?.name}'s Private Profile</h3>
    </main>
  )
}