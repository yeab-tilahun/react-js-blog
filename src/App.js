import { useState, useEffect } from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import api from './api/posts'
import EditPost from './EditPost'
function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const navigation = useNavigate()
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])
  useEffect(() => {
    const filteredResult = posts.filter((post) => (
      (post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResult(filteredResult.reverse())
  }, [posts, search])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('')
      setEditBody('')
      navigation('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const filteredPost = posts.filter(post => post.id !== id)
      setPosts(filteredPost)
      navigation('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('posts', newPost)
      //after post request responce hold the data sent as a means to tell 'successful' 
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigation('/');
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <div className='App'>
      <Header title='Yeabs Blog' />
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route path='/' element={<Home posts={searchResult} />} />
        <Route exact path='/post' element={
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />} />
        <Route path='/edit/:id' element={
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            setEditBody={setEditBody}
            editBody={editBody}
          />} />
        <Route exact path='/post/:id' element={
          <PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />

        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  )
}


export default App