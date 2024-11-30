import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'
  import Blogs from '../Blogs'
  import Users from './Users'
  import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../reducers/userReducer'
import AllBlogs from './AllBlogs'
import OneBlog from './OneBlog'

  
  const Menu = (props) => {
   
    const user = useSelector((state) => state.user)
    console.log("USERSSSS: ", user)
    const dispatch = useDispatch()


    const logout = () => {
        dispatch(logoutUser())
       
      };
  

    const padding = {
        paddingRight: 10
      }
      return (
        <div>
            <div>
                <Link style={padding} to="/"></Link>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/users">Users</Link>
                {user.name} logged in  <button onClick={() => logout()}>logout</button>{" "}

            </div>
            <Routes>
                <Route path="/" element={<AllBlogs />} />
                <Route path='/blogs/:id' element={<OneBlog />}></Route>
                <Route path="/users/:id" element={<User/>}></Route>
                <Route path="/users" element={<Users/>}/>

            </Routes>
        </div>
      )
  }

  export default Menu