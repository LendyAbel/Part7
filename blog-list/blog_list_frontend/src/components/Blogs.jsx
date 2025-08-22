import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

import Blog from './Blog'
import ToggleVisibility from './ToggleVisibility'
import Post from './Post'
import { useContext, useRef } from 'react'
import { UserLoggedContext } from '../context/UserLoggedContext'

const Blogs = () => {
  const createBlogFormRef = useRef()
  const { user } = useContext(UserLoggedContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

  const sortedBlogs = result.data?.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user && (
        <ToggleVisibility buttonLabel="Create new blog" ref={createBlogFormRef}>
          <Post createBlogFormRef={createBlogFormRef} />
        </ToggleVisibility>
      )}
      <h2 className="subtitle">Blogs</h2>
      {sortedBlogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
