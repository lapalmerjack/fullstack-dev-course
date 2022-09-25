

const BlogForm = props => {

    return (
    
        <form onSubmit={props.addBlog}>
        <div>
        title:
        <input
        type="text"
        value = {props.title}
        onChange={( event ) => props.setTitle(event.target.value)}
         />
        </div>
        <div>
        author:
        <input
        type="text"
        value = {props.author}
        onChange={( event ) => props.setAuthor(event.target.value)}
         />
        </div>
        <div>
        url:
        <input
        type="text"
        value = {props.url}
        onChange={( event ) => props.setUrl(event.target.value)}
         />
        </div>
        <button type="submit">create</button>

        </form>
    )
    
}

export default BlogForm