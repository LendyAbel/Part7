import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const userLoggedId = useSelector((state) => state.userSigned.id)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog Name: ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const removeButtonStyle = {
    border: '3px solid red',
    backgroundColor: '#ff9191',
    borderRadius: '10px',
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div className="defalutContainer">
        <p id="defaultInfo">
          Title: {blog.title} Author: {blog.author}{' '}
          <button onClick={toggleVisibility} id="toggleButton">
            {visible ? 'hide' : 'view'}
          </button>
        </p>
      </div>
      {visible ? (
        <div className="moreInfoContainer">
          <p id="urlInfo">URL: {blog.url}</p>
          <p id="likesInfo">
            likes: {blog.likes}{' '}
            <button
              onClick={() => dispatch(updateLikes(blog.id))}
              id="likeButton"
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {userLoggedId === blog.user || userLoggedId === blog.user.id ? (
            <button style={removeButtonStyle} onClick={handleRemove}>
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
