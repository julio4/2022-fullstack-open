import { useNavigate } from 'react-router-dom'

import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.notification(`a new anecdote '${content.value}' created !`)
    setTimeout(() => {
      props.notification('')
    }, 5000);
    navigate('/')
  }

  const resetAll = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.input}/>
        </div>
        <div>
          author
          <input name='author' {...author.input} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.input} />
        </div>
        <button type='submit'>create</button>
        <button onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

export default AnecdoteForm
