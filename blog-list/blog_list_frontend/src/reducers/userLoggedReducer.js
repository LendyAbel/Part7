const userLoggedReducer = (state = null, action) => {
  const { type, payload } = action

  switch (type) {
    case 'setUserLogged':
      return payload
    case 'clearUserLogged':
      return null
    default:
      return state
  }
}

export default userLoggedReducer
