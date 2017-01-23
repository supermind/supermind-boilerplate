import Inferno from 'inferno'
import { connect } from 'inferno-mobx'
import Todos from '../todos/todos-component'

@connect([ 'ui' ])
function Home({ ui }) {
  return (
    <div>
      <h2>{`UI: ${JSON.stringify(ui)}`}</h2>
      <Todos/>
    </div>
  )
}

export default Home
