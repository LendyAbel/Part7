import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'

const Post = ({ toggleVisibility }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const postNewBlogHandler = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    dispatch(createNewBlog(newBlog))
    toggleVisibility()
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author:{' '}
          <input
            id="authorInput"
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url:{' '}
          <input
            id="urlInput"
            type="text"
            name="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
            }}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Post
