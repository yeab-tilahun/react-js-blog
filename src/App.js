import { useState, useEffect } from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes, useHistory } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/post' element={<NewPost />} />

        <Route path='/post/:id' element={<PostPage />} />

        <Route path='/about' Component={About} />
        <Route path='*' Component={Missing} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App