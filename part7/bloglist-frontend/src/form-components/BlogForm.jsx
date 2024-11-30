import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from '../components/Togglable'


const BlogFormInput = ({ value, onChange, inputName, myId }) => (
  
  <div>
    {inputName} :
    <input
      data-testid={myId}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={inputName}
    />
  </div>
)

const BlogForm = () => {
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    dispatch(createBlog(newBlog))

    setAuthor('')
    setTitle('')
    setUrl('')

    const message = `a new blog ${title} by ${user.name} has been added`
    dispatch(setNotification(message, 5))
    blogFormRef.current.toggleVisibility()

  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
<Togglable buttonLabel="new blog" ref={blogFormRef}>
  <h2>Create New</h2>
  <form onSubmit={addBlog}>
    <BlogFormInput value={title} onChange={handleTitleChange} inputName="title" myId="title" />
    <BlogFormInput value={author} onChange={handleAuthorChange} inputName="author" myId="author" />
    <BlogFormInput value={url} onChange={handleUrlChange} inputName="url" myId="url" />
    <button type="submit">create</button>
  </form>
</Togglable>
    </div>

  )

}

export default BlogForm