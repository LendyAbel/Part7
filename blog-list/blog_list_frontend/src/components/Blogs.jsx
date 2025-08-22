import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

import Blog from './Blog'

const Blogs = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

  const sortedBlogs = result.data?.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="subtitle">Blogs</h2>
      {sortedBlogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
