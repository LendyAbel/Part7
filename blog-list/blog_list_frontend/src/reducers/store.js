import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import usersReducer from './usersReducer'


export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer
  },
})
