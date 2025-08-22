import { useContext, useRef } from 'react'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { UserLoggedContext } from '../context/UserLoggedContext'
import blogService from '../services/blogs'

import ToggleVisibility from './ToggleVisibility'
import Post from './Post'

const BlogsView = () => {
  const createBlogFormRef = useRef()
  const { user } = useContext(UserLoggedContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })
  const blogs = result.data
  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {user && (
        <ToggleVisibility buttonLabel="Create new blog" ref={createBlogFormRef}>
          <Post createBlogFormRef={createBlogFormRef} />
        </ToggleVisibility>
      )}
      <h2 className="subtitle">Blogs</h2>
      {sortedBlogs?.map((blog) => (
        <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              Title: {blog.title} Author: {blog.author}
            </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogsView
