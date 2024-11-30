import { useParams } from "react-router-dom"
import { useSelector , useDispatch} from "react-redux"
import { updateLike, addOneComment } from "../../reducers/blogReducer"
import { useState } from "react"


const Comments = ({id}) => {

    
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleCommentChange = (event) => {
        console.log(event.target.value)
        setComment(event.target.value)
    }
    console.log('blog for comment, ', id)

    const addComment = (event) => {
        event.preventDefault()
        console.log('the comment ', comment)
        dispatch(addOneComment(id, comment))
        setComment('')
    }


    return (
        <div>
            <h1>comments</h1>
              <form onSubmit={addComment}>
            <input value={comment} onChange={handleCommentChange} type="text" />
            <button type="submit">add comment</button>
        </form>
        </div>
    )

}

const OneBlog = () => {
    const id = useParams().id
    const dispatch = useDispatch()

    console.log(id, ' is the id')

    const blogs = useSelector(state => state.blogs)
    console.log("my blogs in one blog ", blogs)
    const blog = blogs.find(blog => blog.id === id);

    
if (blog) {
    console.log('my blog title:', blog.title); // Outputs: "Advanced Redux"
  } else {
    return null
  }

  const updateLikes = () => dispatch(updateLike(id));

      console.log('my blog', blog.title);



  return(
<div>
    <h2>blog app</h2>
    <h1>{blog.title}</h1> 
    <div style={{ textDecoration: 'underline', color: 'purple' }}>
       {blog.url}
      </div>
      <div>{blog.likes} likes  <button style={{ marginLeft: '6px' }} onClick= {updateLikes}>like</button>   </div>
      Added by {blog.user.name}
      <Comments id={blog.id}></Comments>
     <ul>
        {blog.comments.map((comment) => (
            <li >{comment}</li>

        ))}
     </ul>

</div>
  )
}

export default OneBlog