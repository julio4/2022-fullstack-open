import { useState } from 'react'

const Blog = ({blog, handleLike, user, handleDelete}) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <div className="blog-post">
      <strong>{blog.title}</strong>{blog.author ? ` by ${blog.author}`:''}
      {!isExpanded
        ? <button onClick={(event) => setExpanded(true)}>view</button>
        : <>
            <button onClick={(event) => setExpanded(false)}>hide</button>
            <hr/>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
            <p>{blog.user.name ? blog.user.name : blog.user.usename}</p>
            {user.username === blog.user.username ? 
              <button onClick={(event) => handleDelete(blog)}>delete</button> : ''
            }
          </>
      }
    </div>  
  )
}

export default Blog
