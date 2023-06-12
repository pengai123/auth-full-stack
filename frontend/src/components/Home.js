import { useContext } from 'react'
import { Context } from '../App'
export default function Home() {
  const { userInfo } = useContext(Context)
  return (
    <main>
      {userInfo ?
        <h2>Hi, {userInfo.name}</h2> : <h2>Hi</h2>
      }
    </main>
  )
}