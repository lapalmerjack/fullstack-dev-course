import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'



const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateLikeOf(state, action) {
            const changedBlog = action.payload

            return state.map(blog => blog.id !== changedBlog.id ? blog : changedBlog)

        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
    
        setBlogs(state, action) {
            return action.payload
        },

        deleteBlogOf(state, action) {
            const id= action.payload

            const newState = state.filter(b => b.id !== id)
            return newState
        }
    }

})

export const { appendBlog, setBlogs, updateLikeOf, deleteBlogOf } = blogSlice.actions


export const createBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog);
        dispatch(appendBlog(newBlog))

    }
        
}

export const getAllBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }

}

export const updateLike = id => {
   return async (dispatch, getState) => {
    console.log('the id', id)
    const blogToUpdate = getState().blogs.find(b => b.id === id)
    console.log(blogToUpdate)
    const changedBlog = {
        ...blogToUpdate, likes: blogToUpdate.likes + 1
    }
    await blogService.updateLikes(id, changedBlog)
    dispatch(updateLikeOf(changedBlog))

   }
}

export const addOneComment = (id, comment)=> {
    return async (dispatch, getState) => {
        console.log('my id: ', id)
        const blogToUpdate = getState().blogs.find(b => b.id === id)
        console.log('my blog to update ', blogToUpdate)
        console.log('my new comment ', comment)
        const updatedBlog = {
            ...blogToUpdate, comments: blogToUpdate.comments.concat(comment)
        }

        console.log(updatedBlog, 'my updated blog')
        await blogService.updateLikes(id, updatedBlog)

    }
}

export const deleteBlog = id => {
    return async(dispatch, getState) => {
        await blogService.deleteBlog(id)
        dispatch(deleteBlogOf(id))
    }

}

export default blogSlice.reducer