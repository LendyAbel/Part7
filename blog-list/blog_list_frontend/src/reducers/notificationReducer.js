import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', isError: false }

export const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.isError = action.payload.isError
    },
    clearNotification(state) {
      state.message = ''
      state.isError = false
    },
  },
})

export const { setNotification, clearNotification } =
  notificationReducer.actions

export const showNotification = (message, isError = false) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, isError }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)
  }
}

export default notificationReducer.reducer
