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
function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: 'July 01, 2023 11:17:36',
      body: 'lorem ipsum dolor sit amet consectetur adipisicing elit'
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: 'July 01, 2023 11:17:36',
      body: 'lorem ipsum dolor sit amet consectetur adipisicing elit'
    },
    {
      id: 3,
      title: "My Thrid Post",
      datetime: 'July 01, 2023 11:17:36',
      body: 'lorem ipsum dolor sit amet consectetur adipisicing elit'
    },
    {
      id: 4,
      title: "My Forth Post",
      datetime: 'July 01, 2023 11:17:36',
      body: 'lorem ipsum dolor sit amet consectetur adipisicing elit'
    },
  ])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const navigation = useNavigate()
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  useEffect(() => {
    const filteredResult = posts.filter((post) => (
      (post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResult(filteredResult.reverse())
  }, [posts, search])

  const handleDelete = (id) => {
    const filteredPost = posts.filter(post => post.id !== id)
    setPosts(filteredPost)
    navigation('/')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigation('/');
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