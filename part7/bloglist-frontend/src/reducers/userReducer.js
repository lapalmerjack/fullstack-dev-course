import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {

        setUserOf(state, action) {
           return action.payload
        },

        clearUser(state, action) {
            return null
        }

    }
})

export const { setUserOf, clearUser } = userSlice.actions

export const setUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        console.log('user: ', user)
       dispatch(setUserOf(user))

       window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
       blogService.setToken(user.token);

    }
}

export const rehydrateUser = () => {
    return (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        console.log(loggedUserJSON, "AM I IN")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUserOf(user));
            blogService.setToken(user.token);
        }
    }
}

export const logoutUser = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(clearUser())
    }
}

export default userSlice.reducer