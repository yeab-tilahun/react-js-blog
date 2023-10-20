import { useState, useEffect } from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { BrowserRouter as Router, Route, Routes, useHistory } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Nav />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/post' element={<NewPost />} />
          <Route exact path='/post/:id' element={<PostPage />} />

          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}


export default App