import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

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
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.createBlog(blog)
      dispatch(addBlog(returnedBlog))
      dispatch(
        showNotification(
          `New blog added: ${returnedBlog.title} ${returnedBlog.author}`
        )
      )
    } catch (error) {
      console.log(error)
      dispatch(showNotification('Blog could not be added', true))
    }
  }
}

export default blogsReducer.reducer
