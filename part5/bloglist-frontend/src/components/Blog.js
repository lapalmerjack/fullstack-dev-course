import { useState } from "react"


const Blog = ({blog, updateLikes, user, deleteBlog}) => {

  const [showAllInfo, setShowAllInfo] = useState(false)
  const [buttonName, setButtonName] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5

  }

  const toggleView = ({label}) => {

    if (showAllInfo === false) {
      setButtonName('hide')
      setShowAllInfo(true)
    } else {

      setButtonName('view')
      setShowAllInfo(false)
    }
  }

  const sameUser = user.username === blog.user.username ? true : false

  console.log(user.id, 'and', blog.user.id )



 if (showAllInfo === true) {

  return (
    <div className='buttonClicked' style={blogStyle}>
     
  
       <div className='likes'>
      {blog.title}{blog.author}
      <button onClick={toggleView}>{buttonName}</button>
      <br></br> 
      {blog.url}
      <br></br>
      likes {blog.likes}
      <button onClick={updateLikes}>like</button>
      <br></br>
      {blog.user.name}
      <br></br>
      {sameUser ?  <button onClick={deleteBlog}>remove</button>: ''}
      
      </div>  
    </div>

  )} else {
    return (
      <div className='notClicked' style={blogStyle}>
    
         <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{buttonName}</button>
        </div>  
    
      </div>
    ) 

 }






}
  




export default Blog