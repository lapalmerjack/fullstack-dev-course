import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../form-components/BlogForm'

test('testing the Blogform', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com',
  }

  const blogUser = { username: 'crazydude17' }


  const createBlog = jest.fn()
  const setMessage = jest.fn()
  render(<BlogForm createBlog={createBlog} user={blogUser} setMessage={setMessage} />)

  const urlInput = screen.getByPlaceholderText('url')
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const button = screen.getByText('create')

  await userEvent.type(titleInput, blog.title)
  await userEvent.type(urlInput, blog.url)
  await userEvent.type(authorInput, blog.author)

  await userEvent.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toMatchObject(blog)
})
