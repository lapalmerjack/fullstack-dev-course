import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'
import ConfirmationMessage from './components/ConfirmationMessage'
import BlogForm from './components/BlogForm'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

      console.log(user)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user

    }

    console.log(blogObject)
    blogService.setToken(user.token)

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setAuthor('')
      setTitle('')
      setUrl('')

      setMessage(`a new blog ${blogObject.title} by ${blogObject.user} has been added`)
      console.log(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      
    })

  } 

  const logout = () => {

    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)

  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage messages={errorMessage}/>
        <LoginForm handleLogin={handleLogin} username={username} password={password}
        setPassword={setPassword} setUsername={setUsername} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <ConfirmationMessage messages={message} />

      <p> {user.name} is logged in 
      <button onClick={() => logout()}>logout</button> </p>

      <h2>create new</h2>
      <BlogForm addBlog={addBlog} title={title} setTitle={setTitle}
            author={author} setAuthor={setAuthor} url={url}
            setUrl={setUrl}  />
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
