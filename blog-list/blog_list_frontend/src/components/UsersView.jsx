import { Link } from 'react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const UsersView = ({ users }) => {
  return (
    <div>
      <h2 className="subtitle">Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }} align="center">
                User
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Blogs Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="user" align="center">
                  <Link className="blogLink" to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersView
