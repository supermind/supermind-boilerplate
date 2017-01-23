import Inferno from 'inferno'
import { connect } from 'inferno-mobx'
import Todo from './todo-component'

@connect([ 'todos' ])
function Todos({ todos }) {
  return (
    <div>
      <h3>{'Todos'}</h3>
      <ul>
        {todos.todos.map(todo =>
          <Todo key={todo.id} {...todo}/>)}
      </ul>
    </div>
  )
}

export default Todos
