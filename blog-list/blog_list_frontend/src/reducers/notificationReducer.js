import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotifiaction(state, action) {
      state = action.payload
    },
    hideNotification(state) {
      state = ''
    },
  },
})

export const { showNotifiaction, hideNotification } =
  notificationReducer.actions

export default notificationReducer.reducer
