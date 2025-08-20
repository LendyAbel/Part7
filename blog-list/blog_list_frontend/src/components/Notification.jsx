import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, isError } = notification

  if (message === null) {
    return null
  }
  return (
    <div className={`message ${isError ? 'error' : 'info'}`}>{message}</div>
  )
}

export default Notification
