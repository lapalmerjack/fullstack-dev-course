import { useSelector, useDispatch } from "react-redux";
import Notification from "../components/Notification";
import { logoutUser } from "../reducers/userReducer";
import Users from "./pages/Users";
import Menu from "./pages/Menu";





const LoggedIn = (props) => {

    const user = useSelector((state) => state.user)
    console.log("USERSSSS: ", user)
    const dispatch = useDispatch()


    const logout = () => {
        dispatch(logoutUser())
       
      };
    
    return (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in
          </p>
         <p style={{display: "inline"}}>   <button onClick={() => logout()}>logout</button>{" "}</p>
         <Menu/>

          

        
       
        </div>
      );
    };

export default LoggedIn