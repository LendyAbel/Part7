import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Post from './components/Post'
import ToggleVisibility from './components/ToggleVisibility'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { clearSignedUser, setSignedUser } from './reducers/userSignedReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const createBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      dispatch(setSignedUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const loginHandler = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      setUser(user)
      dispatch(setSignedUser(user))
      blogService.setToken(user.token)
      dispatch(showNotification('Loggin succefully'))
    } catch (error) {
      dispatch(showNotification('Wrong credentials', true))
      console.log('Wrong Credentials')
    }
  }

  const logoutHandler = () => {
    setUser(null)
    dispatch(clearSignedUser())
    window.localStorage.removeItem('loggedBlogsappUser')
    dispatch(showNotification('Logout sucefully'))
  }

  const toggleVisibility = () => {
    createBlogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Notification />
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
            <Post toggleVisibility={toggleVisibility} />
          </ToggleVisibility>
        </div>
      )}
      <Blogs userLoggedId={user?.id} />
    </div>
  )
}

export default App
