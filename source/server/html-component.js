import Inferno from 'inferno'

function HtmlComponent({
  lang = 'en',
  title = 'Title',
  children
}) {
  return (
    <html lang={lang}>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}

export default HtmlComponent
