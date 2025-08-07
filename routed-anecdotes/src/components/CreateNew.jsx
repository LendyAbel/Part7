import { useNavigate } from 'react-router-dom'
import { useField } from '../Hooks'

const CreateNew = ({ addNew, showNotification }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    showNotification(`a new anecdote: "${content.value}" created!`)
    navigate('/')
  }

  const handleReset = ()=> {
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
