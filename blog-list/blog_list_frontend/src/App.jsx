import { useEffect, useRef, useContext } from 'react'
import { NotificationContext } from './context/NotificationContext'
import { UserLoggedContext } from './context/UserLoggedContext'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Post from './components/Post'
import ToggleVisibility from './components/ToggleVisibility'

const App = () => {
  const { notification, showNotification } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserLoggedContext)
  const createBlogFormRef = useRef()

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
      <Blogs />
    </div>
  )
}

export default App
