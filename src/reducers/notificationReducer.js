import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotificationMessage, removeNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
     dispatch(removeNotification())
    }, delay * 1000);
  }
}

export default notificationSlice.reducer
