const Anecdote = ({ anecdote }) => {
  const { content, author, votes, info } = anecdote
  return (
    <div>
      <h2>{`${content} by ${author}`}</h2>
      <div>{`has ${votes} votes`}</div>
      <div>
        <p>
          for more info see{' '}
          <a href={info} target='_blank' rel='noopener noreferrer'>
            {info}
          </a>{' '}
        </p>
      </div>
    </div>
  )
}

export default Anecdote
