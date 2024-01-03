import { useState, } from 'react'
import blogService from '../services/blogs'


const BlogFormInput = ({ value, onChange, inputName }) => (
  <div>
    {inputName} :
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={inputName}
    />
  </div>
)

const BlogForm = ({ setMessage, user, createBlog }) => {


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')





  const addBlog = (event) => {
    event.preventDefault()



    createBlog({
      title: title,
      author: author,
      url: url,
      user: user
    })
    setAuthor('')
    setTitle('')
    setUrl('')

    setMessage(`a new blog ${title} by ${user.name} has been added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

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

      <h2>Create New</h2>


      <form onSubmit={addBlog}>
        <BlogFormInput value={title} onChange={handleTitleChange} inputName="title" />
        <BlogFormInput value={author} onChange={handleAuthorChange} inputName="author" />
        <BlogFormInput value={url} onChange={handleUrlChange} inputName="url" />
        <button type="submit">create</button>
      </form>

    </div>

  )

}

export default BlogForm