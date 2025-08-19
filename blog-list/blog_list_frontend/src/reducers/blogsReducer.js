import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

export const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, addBlog } = blogsReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs( blogs ))
  }
}

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.createBlog(blog)
    dispatch(addBlog(blog))
  }
}

export default blogsReducer.reducer
