import blogReducer, { appendBlog, getAllBlogs, setBlogs, updateLike, updateLikeOf, deleteBlog } from '../blogReducer'
import deepFreeze from 'deep-freeze'
import { blogsAtStart } from './helperBlogList'
import blogService from '../../services/blogs'
import { createBlog } from '../blogReducer'

jest.mock('../../services/blogs')

describe('blogReducer', () => {
    test('appends a new blog', () => {
        const state = blogsAtStart
        const newBlog = {
            id: 10,
            title: "Exploring TypeScript: Static Typing for JavaScript Developers",
            author: "Michael Brown",
            url: "https://example.com/typescript-intro",
            likes: 81,
            user: "Toocooldude99",
        }
        const action = {
            type: 'blogs/appendBlog',
            payload: newBlog

        }

        deepFreeze(state)
        const newState = blogReducer(state, action)

        expect(newState).toHaveLength(4)
    })

    test('dispatches the correct actions and calls service with correct data', async () => {

        const newBlog = {
            id: 10,
            title: "Exploring TypeScript: Static Typing for JavaScript Developers",
            author: "Michael Brown",
            url: "https://example.com/typescript-intro",
            likes: 81,
            user: "Toocooldude99",
        }

    
        const dispatch = jest.fn()
        blogService.createBlog.mockResolvedValueOnce(newBlog)

        await createBlog(newBlog)(dispatch)


      
        expect(dispatch).toHaveBeenCalledWith(appendBlog(newBlog))
        blogService.createBlog.mockResolvedValueOnce(newBlog)


    })

    test('blogs can be initialized and set', () => {
        const state = []
        const action = {
            type: 'blogs/setBlogs',
            payload: blogsAtStart
        }

        const newState = blogReducer(state, action)

        expect(newState).toHaveLength(3)
    })

    test('dispatches the setAnecdote action and loads the blogs', async () => {

        const dispatch = jest.fn()
        blogService.getAll.mockResolvedValueOnce(blogsAtStart)

        await getAllBlogs()(dispatch)


      
        expect(dispatch).toHaveBeenCalledWith(setBlogs(blogsAtStart))
        expect(blogService.getAll).toHaveBeenCalledTimes(1);

    })

    test('updateLikeOf correctly updates a like of a blog', () => {
        const state = blogsAtStart
        const changedBlog = {...state[1], likes: state[1].likes + 1}

        const action = {
            type: 'blogs/updateLikeOf',
            payload: changedBlog
        }

        const newState = blogReducer(state, action)
        console.log(newState)
        expect(newState[1].likes).toBe(201)

    })

    test('the coreect dispatch is called when updating a like', async () => {
        const changedBlog = {...state[1], likes: state[1].likes + 1}

        const dispatch = jest.fn()
        const getState = () => ({ blogs: blogsAtStart})
        blogService.updateLikes.mockResolvedValueOnce(changedBlog.id, changedBlog)

        await updateLike(changedBlog.id)(dispatch, getState)

        const expectedResult = {
            
                id: 2,
                title: "Understanding Redux: A Beginner's Guide to State Management",
                author: "Emily Johnson",
                url: "https://example.com/redux-guide",
                likes: 201,
                user: "DevGuru",
              
        }


      
        expect(blogService.updateLikes).toHaveBeenCalledWith(changedBlog.id, expectedResult)
        expect(dispatch).toHaveBeenCalledWith(updateLikeOf(expectedResult))
        expect(blogService.updateLikes).toHaveBeenCalledTimes(1)

    })

    test('A blog can be deleted from the state', async () => {
        const getState = () => ({ blogs: blogsAtStart})

        const dispatch = jest.fn()

        blogService.deleteBlog.mockResolvedValueOnce()

        await deleteBlog('2')(dispatch, getState)

        const expectedBlogs = [
            {
                id: 1,
                title: "The Power of Clean Code: Writing Readable and Maintainable JavaScript",
                author: "John Doe",
                url: "https://example.com/clean-code",
                likes: 120,
                user: "Jane Smith",
              },
              {
                id: 3,
                title: "Exploring TypeScript: Static Typing for JavaScript Developers",
                author: "Michael Brown",
                url: "https://example.com/typescript-intro",
                likes: 85,
                user: "CodeLover123",
              },
        ]  

        expect(blogService.deleteBlog).toHaveBeenCalledWith('2');
        expect(dispatch).toHaveBeenCalledWith(setBlogs(expectedBlogs));

    })

  
    
})