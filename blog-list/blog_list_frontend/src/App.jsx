import { useEffect, useContext, useState } from 'react'
import { NotificationContext } from './context/NotificationContext'
import { UserLoggedContext } from './context/UserLoggedContext'
import { Routes, Route, useMatch } from 'react-router'
import blogService from './services/blogs'
import userService from './services/users'

import Notification from './components/Notification'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import NavBar from './components/NavBar'
import Login from './components/Login'

const App = () => {
  const { notification } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserLoggedContext)
  const [users, setUsers] = useState([])

  const userMatch = useMatch('/users/:id')
  const userLinked = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
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

  return (
    <div>
      <NavBar />
      <div className="notificationArea">
        {notification.message && <Notification />}
      </div>
      {!user && <Login />}
      <Routes>
        <Route path="/" element={<BlogsView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<UsersView users={users} />} />
        <Route path="/users/:id" element={<UserView user={userLinked} />} />
      </Routes>
    </div>
  )
}

export default App
