import { useEffect } from "react";
import LoginForm from "./form-components/LoginForm";
import { Container } from '@mui/material'


import { useDispatch } from "react-redux";
import { getAllBlogs } from "./reducers/blogReducer";
import { useSelector } from "react-redux";
import { rehydrateUser } from "./reducers/userReducer";
import Menu from "./components/pages/Menu";
const App = () => {
  const user = useSelector((state) => state.user);
  console.log("USER ", user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  //check localstorage for token
  useEffect(() => {
    // Rehydrate user state and set token
    dispatch(rehydrateUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    );
  }

  return (
    <Container>
  <div>
      <Menu />
    </div>
    </Container>
  
  );
};

export default App;
