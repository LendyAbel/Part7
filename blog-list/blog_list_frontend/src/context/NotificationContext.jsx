import { createContext, useReducer } from 'react'
import notificationReducer from '../reducers/notificationReducer'

export const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: '',
    isError: false,
  })

  const showNotification = (message, isError = false) => {
    dispatch({ type: 'setNotification', payload: { message, isError } })
    setTimeout(() => {
      dispatch({ type: 'clearNotification' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
