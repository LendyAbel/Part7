import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = ({   userLoggedId }) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="subtitle">Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userLoggedId={userLoggedId}
        />
      ))}
    </div>
  )
}

export default Blogs
