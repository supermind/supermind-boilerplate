import { observable } from 'mobx'

export default observable({
  filter: '',
  todos: [{
    id: 0,
    todo: 'One'
  }, {
    id: 1,
    todo: 'Two'
  }]
})
