import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './form-components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './form-components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  //check localstorage for token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(returnedBlog))
    }  catch(error) {
      console.error('Error creating a new blog:', error)
    }
  }

  const updateLikes = async (id, blogObject) => {
    try{
      const updatedBlog = await blogService.updateLikes(id, blogObject)
      console.log('updated blog: ', updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    }catch(error) {
      console.error('Error updating blog post ', error)
    }
  }
  const deleteBlog = async (id) => {
    const blogDeleter = await blogService.deleteBlog(id)
    console.log('blog deleted')
    setBlogs(blogs.filter(blog => blog.id !== id))
  }
  const sortByLikes = [...blogs].sort((a, b) => b.likes - a.likes)



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm setErrorMessage={setMessage} setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in
        <button onClick={() => logout()}>logout</button> </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm setMessage={setMessage} createBlog={createBlog} user={user} />
      </Togglable>
      {sortByLikes.map(
        blog =>
          <Blog user={user} key={blog.id} blog={blog} updateLikes={updateLikes}
            deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App