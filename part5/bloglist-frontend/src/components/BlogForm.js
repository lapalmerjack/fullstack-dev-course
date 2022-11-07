import { useState, } from "react"

const BlogForm = ({ createBlog, user }) => {

    
   const [title, setTitle] = useState('')
   const [author, setAuthor] = useState('')
   const [url, setUrl] = useState('')
    

    

    const addBlog = ( event ) => {
        event.preventDefault()

        createBlog({
    
                title: title,
                author: author,
                url: url,
                user: user,
                    
        })

        setAuthor('')
        setTitle('')
        setUrl('')

        
    }

    return (
        <div>

<h2>Create New</h2>


<form onSubmit={addBlog}>
        <div>
        title:
        <input
        type="text"
        value = {title}
        onChange={( event ) => setTitle(event.target.value)}
        placeholder='title'
         />
        </div>
        <div>
        author:
        <input
        type="text"
        value = {author}
        onChange={( event ) => setAuthor(event.target.value)}
        placeholder='author'
         />
        </div>
        <div>
        url:
        <input
        type="text"
        value = {url}
        onChange={( event ) => setUrl(event.target.value)}
        placeholder='url'
         />
        </div>
        <button type="submit">create</button>
        <br></br>

        </form>

        </div>
    
    )
    
}

export default BlogForm