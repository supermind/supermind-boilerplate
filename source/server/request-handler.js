import Inferno from 'inferno'
import { Provider } from 'inferno-mobx'
import { renderToString } from 'inferno-server'
import { RouterContext, match } from 'inferno-router'
import routes from '../shared/routes/routes'
import stores from '../shared/stores/stores'
import Html from './html-component'

export default function handleRequest({ url }) {
  const route = match(routes, url)

  if (route.redirect) {

    return {
      statusCode: 301,
      headers: {
        Location: route.redirect
      }
    }

  } else if (route.matched) {

    const html = renderToString(
      <Html>
        <Provider {...stores}>
          <RouterContext {...route}/>
        </Provider>
      </Html>
    )

    return {
      statusCode: 200,
      body: `<!DOCTYPE html>${html}`
    }

  } else {

    return {
      statusCode: 500
    }
  }
}
