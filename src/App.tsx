import { useState } from 'react'
import './App.css'

import PostsView from './pages/PostsView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Home</h1>
      <PostsView/>
    </>
  )
}

export default App
