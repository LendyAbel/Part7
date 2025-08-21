const userLoggedReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'setUserLogged':
      return payload
    case 'clearNotification':
      return {}
    default:
      return state
  }
}

export default userLoggedReducer
