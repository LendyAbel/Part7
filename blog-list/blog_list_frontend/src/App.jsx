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
  const [blogs, setBlogs] = useState([])
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

  const updateLikes = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id)
      const updatedBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      }
      const returnedBlog = await blogService.updateBlog(id, updatedBlog)

      setBlogs(
        blogs.map((blog) =>
          blog.id !== id ? blog : { ...returnedBlog, user: blog.user }
        )
      )
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      showNotification('Blog deleted')
      console.log(`BLOG WITH ID: ${id} DELETED`)
    } catch (error) {
      console.log(error.response.data.error)
    }
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
      <Blogs
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        userLoggedId={user?.id}
      />
    </div>
  )
}

export default App
