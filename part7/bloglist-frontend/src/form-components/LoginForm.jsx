import { React, useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'
import { setUser } from '../reducers/userReducer'


const LoginForm = ( ) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {

    event.preventDefault()
    console.log('Logging in with:', username, password)

    try {
      
      dispatch(setUser(username, password))
      
      console.log(user, 'is MY USER')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

    
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('login failed: ', exception)
      const errorMessage = 'Wrong credentials'
      dispatch(setNotification(errorMessage, 5))
    }
  }


  return (
    <div>
      <Notification />
    <form onSubmit={handleLogin}>
      <div>
            username
        <input
          data-testid='username' 
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
            password
        <input 
          data-testid='password'
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
   

  )

}

export default LoginForm