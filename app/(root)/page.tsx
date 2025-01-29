import Events from '@/components/shared/Events'
import Hero from '@/components/shared/Hero'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <main className='max-w-7xl flex flex-col justify-center items-center'>
      <Hero/>
      <Events/>
    </main>
  )
}

export default Home