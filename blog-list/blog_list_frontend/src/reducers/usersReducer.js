import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersReducer.actions

export const intializeUsers = () => {
  return async (dispatch) => {}
}

export default usersReducer.reducer
