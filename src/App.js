import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
      .getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
