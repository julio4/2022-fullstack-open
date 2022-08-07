import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)

export default App
