import { useContext } from 'react'
import { UserLoggedContext } from '../context/UserLoggedContext'
import { NotificationContext } from '../context/NotificationContext'
import Login from './Login'
import { Link } from 'react-router'

const NavBar = () => {
  const { user, userDispatch } = useContext(UserLoggedContext)
  const { showNotification } = useContext(NotificationContext)

  const logoutHandler = () => {
    userDispatch({ type: 'clearUserLogged' })
    window.localStorage.removeItem('loggedBlogsappUser')
    showNotification('Logout sucefully')
  }

  return (
    <div>
      <div>
        <Link to={'/'}>blogs</Link> <Link to={'/users'}>users</Link>{' '}
        {user && (
          <span>
            {user.name} logged in{' '}
            <button onClick={logoutHandler}>Logout</button>
          </span>
        )}
      </div>
      {!user && <Login />}
    </div>
  )
}

export default NavBar
