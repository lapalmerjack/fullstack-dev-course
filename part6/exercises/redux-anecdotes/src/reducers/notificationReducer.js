 /* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'



const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            console.log(action.payload + 'is being hit')
            return action.payload
        },
        setEmpty(state) {
            return '';
        }
      
    }
})


export const { setMessage, setEmpty } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(setMessage(message))
        const newTime = time * 1000
        setTimeout(() => { dispatch(setEmpty())}, newTime)
    }
}

export default notificationSlice.reducer