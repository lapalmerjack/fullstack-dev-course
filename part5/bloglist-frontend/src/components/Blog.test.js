import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



test('renders only title and author', () => {
  const blog = {
    title: 'How to be the coolest',
    author: 'dude mcDuderson',
    url: 'dudemadeness.com',
    likes : 0,
    user: {
      username: 'crazydude17'
    }
  }

  const user = {
    username: 'crazydude17'
  }

  const { container } = render(<Blog blog={blog} user={user}/>)



  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'How to be the coolest'
  )
  expect(div).toHaveTextContent(
    'dude mcDuderson'
  )

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





  const div = container.querySelector('.showAll')

  expect(div).toHaveTextContent('likes')
  expect(div).toHaveTextContent('7')

  expect(div).toHaveTextContent('bootymadness.com')
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