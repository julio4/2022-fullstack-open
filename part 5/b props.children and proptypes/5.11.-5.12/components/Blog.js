import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <div className="blog-post">
      <strong>{blog.title}</strong>{blog.author ? ` by ${blog.author}`:''}
      {!isExpanded
        ? <button onClick={() => setExpanded(true)}>view</button>
        : <>
          <button onClick={() => setExpanded(false)}>hide</button>
          <hr/>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
          <p>{blog.user.name ? blog.user.name : blog.user.usename}</p>
          {user.username === blog.user.username ?
            <button onClick={() => handleDelete(blog)}>delete</button> : ''
          }
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
