import { createContext, useReducer } from 'react'
import userLoggedReducer from '../reducers/userLoggedReducer'

export const UserLoggedContext = createContext()

const UserLoggedProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userLoggedReducer, null)
  return (
    <UserLoggedContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserLoggedContext.Provider>
  )
}

export default UserLoggedProvider
