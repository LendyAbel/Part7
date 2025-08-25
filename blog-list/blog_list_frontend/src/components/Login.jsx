import { useContext, useState } from 'react'
import { UserLoggedContext } from '../context/UserLoggedContext'
import { NotificationContext } from '../context/NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
    <LoginUI
      loginHandler={loginHandler}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  )
}

const LoginUI = ({
  loginHandler,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form className="loginForm" onSubmit={loginHandler}>
      <h2 className="subtitle">Login:</h2>
      <TextField
        size="small"
        label="username"
        value={username}
        name="Username"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <TextField
        size="small"
        label="password"
        value={password}
        name="Password"
        type='password'
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  )
}

export default Login
