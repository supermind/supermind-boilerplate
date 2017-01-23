import Inferno from 'inferno'
import { renderToString } from 'inferno-server'
import StyletronServer from 'styletron-server'
import { StyletronProvider } from 'styletron-inferno'

export default function render() {
  const title = 'Hello World'
  const styletron = new StyletronServer()
  const html = renderToString(
    <StyletronProvider styletron={styletron}>
      <App title={title} color="red"/>
    </StyletronProvider>
  )
  const styles = styletron.getStylesheetsHtml('styletron')
  return `<!DOCTYPE html>${html}`
}
