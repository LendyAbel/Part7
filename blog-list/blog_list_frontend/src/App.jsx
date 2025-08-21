import { useState, useEffect, useRef, useContext } from 'react'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Post from './components/Post'
import ToggleVisibility from './components/ToggleVisibility'
import blogService from './services/blogs'
import loginService from './services/login'

import { NotificationContext } from './context/NotificationContext'

const App = () => {
  const [user, setUser] = useState(null)
  const { notification, showNotification } = useContext(NotificationContext)
  const createBlogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      showNotification('Loggin succefully')
      console.log('Logging in with', username, password)
    } catch (error) {
      showNotification('Wrong credentials', true)
      console.log('Wrong Credentials')
    }
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsappUser')
    showNotification('Logout sucefully')
  }

  return (
    <div>
      {notification.message && <Notification />}

      {user === null ? (
        <Login login={loginHandler} />
      ) : (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button onClick={logoutHandler}>Logout</button>
          </p>
          <ToggleVisibility
            buttonLabel="Create new blog"
            ref={createBlogFormRef}
          >
            <Post createBlogFormRef={createBlogFormRef} />
          </ToggleVisibility>
        </div>
      )}
      <Blogs userLoggedId={user?.id} />
    </div>
  )
}

export default App
