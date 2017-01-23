import { useStrict } from 'mobx'
import todos from './todos/todos-store'
import ui from './ui/ui-store'

useStrict(false)

export default {
  todos,
  ui
}
