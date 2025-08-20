import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ updateLikes, deleteBlog, userLoggedId }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })
  console.log('result.data', result.data)

  const sortedBlogs = result.data?.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="subtitle">Blogs</h2>
      {sortedBlogs?.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
          userLoggedId={userLoggedId}
        />
      ))}
    </div>
  )
}

export default Blogs
