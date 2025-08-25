import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'

import Alert from '@mui/material/Alert'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, isError } = notification

  if (message === null) {
    return null
  }
  return (
    // <div className={`message ${isError ? 'error' : 'info'}`}>{message}</div>
    <Alert variant="outlined" severity={isError ? 'error' : 'success'}>
      {message}
    </Alert>
  )
}

export default Notification
