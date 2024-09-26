import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {

  const [showAllInfo, setshowAllInfo] = useState(false)



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

  const updateLike = () => {
    const blogId = blog.id
    console.log(`This is the blog id ${blogId}`)

    updateLikes(blogId,{
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const blogDeleter = () => {
    const blogId = blog.id
    const confirmation = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    if(confirmation) {
      console.log('in here')
      deleteBlog(blogId)
    }

  }

  const showInfo = showAllInfo ?  (
    <div className='showAll'>
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        <button style={{ marginLeft: '6px' }} onClick={updateLike}>like</button>
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
          <button  onClick={blogDeleter}>remove</button>
      </div>

    )
  }
}

export default Blog