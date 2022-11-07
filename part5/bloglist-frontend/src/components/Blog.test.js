import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders only title and author', () => {
    const blog = {
                title: 'How to get hawt ladies',
                author: 'dude mcDuderson',
                url: 'bootymadness.com',
                likes : 0,
                user: {
                    username: 'crazydude17'
                }
    }

    const user = {
        username: 'crazydude17'
    }

    const { container } = render(<Blog blog={blog} user={user}/>)

 

    const div = container.querySelector('.notClicked')

    expect(div).not.toHaveTextContent(
        'bootymadness.com'

    )

})

test('makes sure likes and url are shown after button click', async () => {
    
    const blog = {
        title: 'How to get hawt ladies',
        author: 'dude mcDuderson',
        url: 'bootymadness.com',
        likes : 7,
        user: {
            username: 'crazydude17'
        }
    }

    const user = {
        username: 'crazydude17'
    }

    const mockHandler = jest.fn()

    const { container } =  render(<Blog blog={blog} user={user} />)

    const userEvents = userEvent.setup()
    const button = screen.getByText('view')
    await userEvents.click(button)


    screen.debug()

   

    const div = container.querySelector('.buttonClicked')

    expect(div).toHaveTextContent(
        'likes'

    )
    expect(div).toHaveTextContent(
        '7'
    )

    expect(div).toHaveTextContent(
        'bootymadness.com'
    )
})

test('event handler is received two button pushes', async () => {

    const blog = {
        title: 'How to get hawt ladies',
        author: 'dude mcDuderson',
        url: 'bootymadness.com',
        likes : 7,
        user: {
            username: 'crazydude17'
        }
    }

    const user = {
        username: 'crazydude17'
    }

    const mockHandler = jest.fn()

    const { container } =  render(<Blog blog={blog} user={user} updateLikes={mockHandler} />)

    const userEvents = userEvent.setup()
    const button = screen.getByText('view')
    await userEvents.click(button)

    const userLikes = userEvent.setup()
    const likeButton = screen.getByText('like')
    await userLikes.click(likeButton)
    await userLikes.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

})


