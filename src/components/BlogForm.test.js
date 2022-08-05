
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('<BlogForm /> updates parents states and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write here blog title')
  const inputAuthor = screen.getByPlaceholderText('write here blog author')
  const inputUrl = screen.getByPlaceholderText('write here blog url')

  const submitButton = screen.getByText('create')

  await user.type(inputTitle, 'formTitle')
  await user.type(inputAuthor, 'formAuthor')
  await user.type(inputUrl, 'formUrl')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'formTitle',
    author: 'formAuthor',
    url: 'formUrl'
  })
})
