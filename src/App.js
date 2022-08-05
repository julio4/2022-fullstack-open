import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
      setSuccessMessage(`Welcome back ${user.name}!`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    setSuccessMessage('Logged out! See you soon')
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility()
      setSuccessMessage('Blog added!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        user: blog.user.id,
        likes: blog.likes + 1
      })

      setBlogs(
        blogs.map((b) => (b.id !== blog.id ? b : updatedBlog))
      )
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.erase(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setSuccessMessage('Blog deleted!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const blogsSection = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in
        <button onClick={handleLogout}>Logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog}
            handleLike={likeBlog}
            handleDelete={deleteBlog}
            user={user}
          />
        )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} type='error'/>
      <Notification message={successMessage} type='success'/>

      {!user ?
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username} password={password}
        />
        : blogsSection()
      }

    </div>
  )
}

export default App
