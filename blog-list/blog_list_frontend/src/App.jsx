import { useEffect, useRef, useContext, useState } from 'react'
import { NotificationContext } from './context/NotificationContext'
import { UserLoggedContext } from './context/UserLoggedContext'
import { Routes, Route, useMatch } from 'react-router'
import blogService from './services/blogs'
import userService from './services/users'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const { notification, showNotification } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserLoggedContext)
  const [users, setUsers] = useState([])

  const match = useMatch('/users/:id')
  const userLinked = match
    ? users.find((user) => user.id === match.params.id)
    : null

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const data = await userService.getAll()
    setUsers(data)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'setUserLogged', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const logoutHandler = () => {
    userDispatch({ type: 'clearUserLogged' })
    window.localStorage.removeItem('loggedBlogsappUser')
    showNotification('Logout sucefully')
  }

  return (
    <div>
      {notification.message && <Notification />}
      {!user ? (
        <Login />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userLinked} />} />
      </Routes>
    </div>
  )
}

export default App
