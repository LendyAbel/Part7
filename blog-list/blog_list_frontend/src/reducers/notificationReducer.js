const notificationReducer = (state, action) => {
  const { type, payload } = action
  const { message = '', isError = false } = payload || {}

  switch (type) {
    case 'setNotification':
      return { message, isError }
    case 'clearNotification':
      return { message: '', isError: false }
    default:
      return state
  }
}

export default notificationReducer
