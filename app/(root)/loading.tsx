import Image from 'next/image'
import React from 'react'

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100vh] ">
    <div>
      <Image src="/assets/icons/loader1.svg" alt="Loading..." width={100} height={100} />
    </div>
  </div>
  )
}

export default loading