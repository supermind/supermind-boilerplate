import Inferno from 'inferno'
import { Router } from 'inferno-router'
import { createBrowserHistory } from 'history'
import createRoutes from '../shared/routes/routes'

const browserHistory = createBrowserHistory()

const routes = createRoutes({})

Inferno.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('root'))
