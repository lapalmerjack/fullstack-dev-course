import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog, updateLike, deleteBlogs }) => {
  const [showAllInfo, setshowAllInfo] = useState(false)
  const user = useSelector((state) => state.user)




  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogUsername = blog.user ? blog.user.username : ''
  console.log(`This is my username  ${blogUsername}`)

  const sameUser = user.username === blogUsername


  const showInfo = showAllInfo ?  (
    <div className='showAll'>
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        <button style={{ marginLeft: '6px' }} onClick= {updateLike}>like</button>
      </div>
      <div>{blog.author}</div>
    </div>
  ) : null


  if (sameUser) {
    return (
      <div className="blog" style={blogStyle}>
   
          {blog.title} {blog.author}
          <button onClick={() => setshowAllInfo(!showAllInfo)}>{showAllInfo ? 'hide' : 'view'}</button>
          {showInfo}
          <br />
           <button  onClick={deleteBlogs}>remove</button> 
      </div>

    )
  }
}

export default Blog