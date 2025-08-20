import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSignedReducer = createSlice({
  name: 'userSigned',
  initialState,
  reducers: {
    setSignedUser(state, action) {
      return action.payload
    },
    clearSignedUser(state) {
      return null
    },
  },
})

export const { setSignedUser, clearSignedUser } = userSignedReducer.actions

export default userSignedReducer.reducer
