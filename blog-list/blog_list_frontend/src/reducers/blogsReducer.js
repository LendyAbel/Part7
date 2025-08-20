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
    eliminateBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, eliminateBlog } =
  blogsReducer.actions

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
      const blog = getState().blogs.find((blog) => blog.id === id)
      const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

      const returnedBlog = await blogService.updateBlog(id, updatedBlog)
      dispatch(updateBlog({ ...returnedBlog, user: blog.user }))
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(eliminateBlog(id))
      dispatch(showNotification('Blog deleted'))
    } catch (error) {
      dispatch(showNotification(`Error: ${error.response.data.error}`, true))
    }
  }
}

export default blogsReducer.reducer
