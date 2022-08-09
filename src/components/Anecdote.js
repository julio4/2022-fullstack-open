const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>{anecdote.author}</div>
    <div>{anecdote.info}</div>
    <div>{anecdote.votes}</div>
  </div>
)

export default Anecdote
