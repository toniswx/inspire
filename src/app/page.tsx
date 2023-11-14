'use client'


import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";

function Page() {
    
    const router = useRouter()

    useEffect(()=>{
       router.push("/home")
    },[])


  return (
    <div></div>
  )
}

export default Page