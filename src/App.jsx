import React from 'react'
import Hero from './components/sections/Hero'
import SmoothScroller from './components/layout/SmoothScroller'

const App = () => {
  return (
    <SmoothScroller>
      <main className='min-h-screen w-full overflow-x-clip'>
        <Hero />
      </main>
    </SmoothScroller>
  )
}

export default App
