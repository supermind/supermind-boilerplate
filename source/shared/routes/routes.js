import Inferno from 'inferno'
import { Redirect, Route, IndexRoute } from 'inferno-router'
import NotFound from '../components/not-found/not-found-component'
import About from '../components/about/about-component'
import Home from '../components/home/home-component'
import App from '../components/app/app-component'

export default (
  <Route path="/" component={App}>
    <Redirect from="/hello" to="/about"/>
    <IndexRoute component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="*" component={NotFound}/>
  </Route>
)
