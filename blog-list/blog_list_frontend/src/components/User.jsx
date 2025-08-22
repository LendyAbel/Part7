
const User = ({ user }) => {

  if (!user) {
    return <div></div>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>added blogs</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
