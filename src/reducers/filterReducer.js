import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
    resetFilter(state, action) {
      return ''
    }
  }
})

export const { setFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer
