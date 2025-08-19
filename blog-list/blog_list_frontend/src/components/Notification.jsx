import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  if (message === '') {
    return null
  }
  return (
    <div className={`message ${isError ? 'error' : 'info'}`}>{message}</div>
  )
}

export default Notification
