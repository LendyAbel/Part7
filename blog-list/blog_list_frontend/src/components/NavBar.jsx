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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
              <spam>
                {user.name} logged in{' '}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={logoutHandler}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </spam>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
