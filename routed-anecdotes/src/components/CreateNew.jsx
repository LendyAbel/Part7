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
      content: content.inputsProps.value,
      author: author.inputsProps.value,
      info: info.inputsProps.value,
      votes: 0,
    })
    showNotification(`a new anecdote: "${content.inputsProps.value}" created!`)
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
          <input name='content' {...content.inputsProps} />
        </div>
        <div>
          author
          <input name='author' {...author.inputsProps} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.inputsProps} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
