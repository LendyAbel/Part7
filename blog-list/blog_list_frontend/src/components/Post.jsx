import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { NotificationContext } from '../context/NotificationContext'
import { Button, Stack, TextField } from '@mui/material'

const Post = ({ createBlogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { showNotification } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const addBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries(['blogs'])
      createBlogFormRef.current.toggleVisibility()
      showNotification(
        `New blog added: ${returnedBlog.title} ${returnedBlog.author}`
      )
    },
    onError: (error) => {
      console.log(error)
      showNotification('Blog could not be added', true)
    },
  })

  const handlerTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handlerAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handlerUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const postNewBlogHandler = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    addBlogMutation.mutate(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <PostUI
      postNewBlogHandler={postNewBlogHandler}
      title={title}
      author={author}
      url={url}
      handlerTitleChange={handlerTitleChange}
      handlerAuthorChange={handlerAuthorChange}
      handlerUrlChange={handlerUrlChange}
    />
  )
}

const PostUI = ({
  postNewBlogHandler,
  title,
  handlerTitleChange,
  author,
  handlerAuthorChange,
  url,
  handlerUrlChange,
}) => {
  return (
    <div>
      <h2 className="subtitle">Create new blog</h2>
      <form onSubmit={postNewBlogHandler}>
        <Stack direction="column" spacing={2} sx={{ width: '400px', mb: 2 }}>
          <TextField
            label="Title"
            name="Title"
            size="small"
            value={title}
            onChange={handlerTitleChange}
          />
          <TextField
            label="Author"
            name="Author"
            size="small"
            value={author}
            onChange={handlerAuthorChange}
          />
          <TextField
            label="Url"
            name="Url"
            size="small"
            value={url}
            onChange={handlerUrlChange}
          />
        </Stack>

        <Button variant="contained" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default Post
