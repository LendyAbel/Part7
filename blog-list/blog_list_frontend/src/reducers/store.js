import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import userSignedReducer from './userSignedReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    userSigned: userSignedReducer,
  },
})
