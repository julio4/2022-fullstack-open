import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  const blogUser = {
    username: 'username'
  }

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: blogUser
  }

  const callback = () => {}

  test('display title and author by default but not likes and url', () => {
    render(<Blog blog={blog} user={blogUser}
      handleLike={callback} handleDelete={callback} />)

    screen.getByText('title')
    screen.getByText('author', { exact: false })

    const url = screen.queryByText('url')
    expect(url).toBeNull()
    const likes = screen.queryByText('0', { exact: false })
    expect(likes).toBeNull()
  })

  test('likes and url shown when dropdown button clicked', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} user={blogUser}
      handleLike={callback} handleDelete={callback} />)

    const dropdownButton = screen.getByText('view')
    await user.click(dropdownButton)

    screen.getByText('url')
    screen.getByText('0', { exact: false })
  })

  test('like button can be called twice', async () => {
    const user = userEvent.setup()
    const handleLike = jest.fn()

    render(<Blog blog={blog} user={blogUser}
      handleLike={handleLike} handleDelete={callback} />)

    const dropdownButton = screen.getByText('view')
    await user.click(dropdownButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })

})
