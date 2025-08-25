import { useContext, useRef } from 'react'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { UserLoggedContext } from '../context/UserLoggedContext'
import blogService from '../services/blogs'
import ToggleVisibility from './ToggleVisibility'

import Post from './Post'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'

const BlogsView = () => {
  const createBlogFormRef = useRef()
  const { user } = useContext(UserLoggedContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })
  const blogs = result.data
  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes) || []

  return (
    <div>
      <h2 className="subtitle">Blogs</h2>
      {user && (
        <ToggleVisibility buttonLabel="Create new blog" ref={createBlogFormRef}>
          <Post createBlogFormRef={createBlogFormRef} />
        </ToggleVisibility>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }} align='center'>Title</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Author
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow
                key={blog.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="blog" align='center'>
                  <Link className="blogLink" to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell align="center">{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogsView
