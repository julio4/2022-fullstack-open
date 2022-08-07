import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const noteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = noteSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteFor = anecdote => {
  return async dispatch => { 
    const updatedAnecdote = await anecdotesService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default noteSlice.reducer
