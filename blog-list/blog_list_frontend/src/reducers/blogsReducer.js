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
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
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

export const updateLikes = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log('id', id)

      const blogs = getState().blogs
      const blog = blogs.find((blog) => blog.id === id)
      console.log(blog)

      const updateBlog = { ...blog, likes: blog.likes + 1 }
      console.log(updateBlog)

      const returnedBlog = await blogService.updateBlog(updateBlog.id, updateBlog)
      dispatch(updateBlog(returnedBlog))
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
}

export default blogsReducer.reducer
