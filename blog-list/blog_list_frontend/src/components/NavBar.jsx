import { useContext } from 'react'
import { UserLoggedContext } from '../context/UserLoggedContext'
import { NotificationContext } from '../context/NotificationContext'
import Login from './Login'
import { Link } from 'react-router'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import { Stack } from '@mui/material'

const NavBar = () => {
  const { user, userDispatch } = useContext(UserLoggedContext)
  const { showNotification } = useContext(NotificationContext)

  const logoutHandler = () => {
    userDispatch({ type: 'clearUserLogged' })
    window.localStorage.removeItem('loggedBlogsappUser')
    showNotification('Logout sucefully')
  }

  return <NavBarUI user={user} logoutHandler={logoutHandler} />
}

const NavBarUI = ({ user, logoutHandler }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Stack direction={'row'} spacing={4}>
              <Link className="appLink" to={'/'}>
                blogs
              </Link>{' '}
              <Link className="appLink" to={'/users'}>
                users
              </Link>
            </Stack>
          </Typography>
          {user && (
            <div>
              <span>
                {user.name}{' '}
                <IconButton
                  size="large"
                  onClick={logoutHandler}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </span>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
