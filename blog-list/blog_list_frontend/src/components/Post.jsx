import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { NotificationContext } from '../context/NotificationContext'

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
    <div>
      <h2 className="subtitle">Create new blog</h2>
      <form onSubmit={postNewBlogHandler}>
        <div>
          Title:{' '}
          <input
            id="titleInput"
            type="text"
            name="title"
            value={title}
            onChange={handlerTitleChange}
          />
        </div>
        <div>
          Author:{' '}
          <input
            id="authorInput"
            type="text"
            name="author"
            value={author}
            onChange={handlerAuthorChange}
          />
        </div>
        <div>
          Url:{' '}
          <input
            id="urlInput"
            type="text"
            name="url"
            value={url}
            onChange={handlerUrlChange}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Post
