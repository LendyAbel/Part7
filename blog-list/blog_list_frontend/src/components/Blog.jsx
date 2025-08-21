import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserLoggedContext } from '../context/UserLoggedContext'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const { user } = useContext(UserLoggedContext)
  const queryClient = useQueryClient()

  const updateLikesMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) =>
      blogService.updateBlog(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      console.log('ERROR: ', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const updateLikes = () => {
    const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    updateLikesMutation.mutate({ id: blog.id, updatedBlog })
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog Name: ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog.id)
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
            <button onClick={updateLikes} id="likeButton">
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {user && user?.id === blog.user.id ? (
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
