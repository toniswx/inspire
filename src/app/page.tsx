import Image from 'next/image'
import Login from './login'

export default function Home() {
  return (
   <div className='w-full flex items-center justify-center h-screen' >
     <Login />
   </div>
  )
}
