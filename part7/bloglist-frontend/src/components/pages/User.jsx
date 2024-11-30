import { getUserBlogs } from "./helperfunctions"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"


const User = () => {
const id = useParams().id

const blogs = useSelector(state => state.blogs)

const user =  blogs.find(blog => blog.user.id === id)?.user.name


const userBlogs = blogs.filter(blog => blog.user.id === id ).map(blog => blog.title)





    return (
        <div>
            <h1>{user}</h1>
            <h2>added blogs</h2>
            <ul>
            {userBlogs.map((title, index) => (
        <li key={index}>{title}</li>
      ))}
            </ul>
        </div>
    )

}


export default User