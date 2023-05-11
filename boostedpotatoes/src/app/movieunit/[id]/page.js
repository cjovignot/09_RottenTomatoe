import Image from 'next/image'
import Film from '../../components/film-info'
import React from 'react'

export default function Home({params}) {
  console.log(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
       <Film id={params.id}/>
      </div>  
    </main>
  )
}
