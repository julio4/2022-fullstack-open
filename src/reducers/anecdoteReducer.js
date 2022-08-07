import { createSlice } from '@reduxjs/toolkit'


const noteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const anecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id === anecdote.id ? anecdote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, setAnecdotes } = noteSlice.actions
export default noteSlice.reducer
