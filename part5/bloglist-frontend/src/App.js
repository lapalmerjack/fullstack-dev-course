import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'
import ConfirmationMessage from './components/ConfirmationMessage'
import BlogForm from './components/BlogForm'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.Token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exception) {
      console.log('Exception')
      setErrorMessage('Wrong credentials')
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }


  }

  const addBlog = (blogObject) => {
    console.log('inside the main frame')
    blogFormRef.current.toggleVisibility()
    console.log(blogObject)

    blogService.setToken(user.token)

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
   

      setMessage(`a new blog ${blogObject.title} by ${blogObject.user.name} has been added`)
      console.log(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      
    })

  } 

  const updateLikes = id => {
    const blog = blogs.find(n => n.id === id)
    const user = blog.user
    const changedBlog = {...blog, likes: blog.likes +1}


    blogService
      .updateLikes(id, changedBlog)
      .then(returnedBlog => {
        const newReturnedBlog = {...returnedBlog, user: user} 
        setBlogs(blogs.map(blog => blog.id !== id ? blog : newReturnedBlog))
      })
      .catch(error => {
        setErrorMessage('Error has been found: ', error)
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     

  }

  const deleteBlog = id => {

    const blog = blogs.find(b => b.id === id)
    const deletedBlog = {...blog}

    blogService.setToken(user.token)
  

    console.log(deletedBlog, 'this to be deleted')

    if(window.confirm(`Remove blog ${blog.title} by ${blog.user.name}?`)) {
      blogService
        .remove(id)
        .then(deleted => {
          setBlogs(blogs.filter(b => b.id !== id))
        }).catch(error => {
          setMessage('Error has occured: ', error)
        })
    }

  }

  const logout = () => {

    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)

  }


  const blogFormRef = useRef()



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage message={errorMessage}/>
        <LoginForm handleLogin={handleLogin} username={username} password={password}
        setPassword={setPassword} setUsername={setUsername} />
      </div>
    )
  }

  const sortByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log(user)


  return (
    <div>
      <h2>blogs</h2>

      <ConfirmationMessage message={message} />

      <p> {user.name} is logged in 
      <button onClick={() => logout()}>logout</button> </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef} > 
      <BlogForm createBlog={addBlog} user={user} /></Togglable>
      
      {sortByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} 
          updateLikes = {() => updateLikes(blog.id)} user = {user} deleteBlog={() => deleteBlog(blog.id)}/>
      )}
    </div>
  )
}

export default App
