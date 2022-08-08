import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  timeoutID: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotificationParams(state, action) {
      if(state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return action.payload
    },
    removeNotification(state, action) {
      return initialState 
    }
  }
})

export const { setNotificationParams, removeNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async dispatch => {
    /* We get id of timeout to clear it if a new notification 
      * is set before the end of timeout */
    const timeoutID = setTimeout(() => {
     dispatch(removeNotification())
    }, delay * 1000);
    dispatch(setNotificationParams({
      message,
      timeoutID
    }))
  }
}

export default notificationSlice.reducer
