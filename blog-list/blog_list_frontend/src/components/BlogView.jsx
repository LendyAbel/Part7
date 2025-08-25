import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserLoggedContext } from '../context/UserLoggedContext'
import blogService from '../services/blogs'
import { useMatch, useNavigate } from 'react-router'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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

  return (
    <BlogUI
      blog={blogLinked}
      updateLikes={updateLikes}
      handleRemove={handleRemove}
      user={user}
      handleAddComment={handleAddComment}
      setComment={setComment}
      comment={comment}
    />
  )
}

const BlogUI = ({
  blog,
  updateLikes,
  handleRemove,
  user,
  handleAddComment,
  comment,
  setComment,
}) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 500, padding: 2, marginTop: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction={'row'} spacing={2} alignItems="center">
            <Typography
              gutterBottom
              sx={{ color: 'text.primary', fontSize: 26 }}
            >
              {blog.title} by {blog.author}
            </Typography>
            <IconButton
              size="small"
              onClick={updateLikes}
              id="likeButton"
              sx={{ color: 'blue' }}
            >
              <ThumbUpIcon /> {blog.likes}
            </IconButton>
          </Stack>
          {user && user?.id === blog.user.id ? (
            <IconButton
              sx={{ backgroundColor: '#ff9191', borderRadius: '10px' }}
              size="small"
              onClick={handleRemove}
              id="likeButton"
              color="inherit"
            >
              <DeleteForeverIcon />
            </IconButton>
          ) : null}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <a
            target="_blank"
            href={`${blog.url}`}
            rel="noopenner noreferrer"
            id="urlInfo"
          >
            URL: {blog.url}
          </a>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Publisher: {blog.user.name}
        </Typography>
      </CardContent>

      <CardActions>
        <Box sx={{ width: '100%' }}>
          {user && (
            <form onSubmit={handleAddComment}>
              <Stack
                direction={'row'}
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <TextField
                  size="small"
                  label="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  add comment
                </Button>
              </Stack>
            </form>
          )}

          <Typography variant="h6" sx={{ mb: 1 }}>
            Comments:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {blog.comments.map((comment, index) => (
              <Typography
                component="li"
                key={index}
                variant="body2"
                sx={{ mb: 0.5 }}
              >
                {comment}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}

export default BlogView
