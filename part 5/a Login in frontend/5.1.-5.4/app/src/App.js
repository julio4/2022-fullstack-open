import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <p>Please login</p>
      <div>
        username
        <input
          type="text"
          value={username} 
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password} 
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })

      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setSuccessMessage('Blog added!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000);
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
}, 5000);
    }
  }

  const blogsForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

  const blogsSection = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in
        <button onClick={handleLogout}>Logout</button>
      </p>
      
      {blogsForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {errorMessage !== '' && <Notification message={errorMessage} type='error'/>}
      {successMessage !== '' && <Notification message={successMessage} type='success'/>}
      
      {!user ? loginForm() : blogsSection()}

    </div>
  )
}

export default App
