import { useContext, useState } from 'react'
import { UserLoggedContext } from '../context/UserLoggedContext'
import { NotificationContext } from '../context/NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { userDispatch } = useContext(UserLoggedContext)
  const { showNotification } = useContext(NotificationContext)

  const login = async () => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      userDispatch({ type: 'setUserLogged', payload: user })
      blogService.setToken(user.token)
      showNotification('Loggin succefully')
    } catch (error) {
      showNotification('Wrong credentials', true)
      console.log('Wrong Credentials')
    }
  }

  const loginHandler = (event) => {
    event.preventDefault()
    login()
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginHandler}>
      <h2 className="subtitle">Login</h2>
      <div>
        username:{' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
