import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserLoggedContext } from '../context/UserLoggedContext'
import blogService from '../services/blogs'
import { useMatch, useNavigate } from 'react-router'

const BlogView = () => {
  const [comment, setComment] = useState('')
  const { user } = useContext(UserLoggedContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const blogMatch = useMatch('/blogs/:id')

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

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

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  })

  if (result.isLoading) {
    return <div>...is Loading</div>
  }
  const blogs = result.data

  const blogLinked = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const updateLikes = () => {
    const updatedBlog = {
      ...blogLinked,
      user: blogLinked.user.id,
      likes: blogLinked.likes + 1,
    }
    updateLikesMutation.mutate({ id: blogLinked.id, updatedBlog })
  }

  const handleRemove = () => {
    if (
      window.confirm(
        `Remove blog Name: ${blogLinked.title} by ${blogLinked.author}`
      )
    ) {
      deleteMutation.mutate(blogLinked.id)
      navigate('/')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    commentMutation.mutate({ id: blogLinked.id, comment })
    setComment('')
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
          Title: {blogLinked.title} Author: {blogLinked.author}{' '}
        </p>
      </div>
      <div className="moreInfoContainer">
        <p id="urlInfo">URL: {blogLinked.url}</p>
        <p id="likesInfo">
          likes: {blogLinked.likes}{' '}
          <button onClick={updateLikes} id="likeButton">
            like
          </button>
        </p>
        <p>{blogLinked.user.name}</p>
        <div>
          {user && (
            <form onSubmit={handleAddComment}>
              <input type="text" onChange={(e) => setComment(e.target.value)} />
              <button type="submit">add comment</button>
            </form>
          )}
          <p>Comments:</p>
          <ul>
            {blogLinked.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
        {user && user?.id === blogLinked.user.id ? (
          <button style={removeButtonStyle} onClick={handleRemove}>
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default BlogView
