/* eslint-disable no-console */

import { get } from 'lodash'
import express from 'express'
import compression from 'compression'
import handleRequest from './request-handler'

const host = get(process, 'env.HOST', 'localhost')
const port = get(process, 'env.PORT', 8000)
const app = express()

const normaliseRequest = request => ({
  url: request.originalUrl
})

app.use(compression())
app.use((request, response) => {
  const normalisedRequest = normaliseRequest(request)
  const { statusCode, headers, body } = handleRequest(normalisedRequest)
  switch (statusCode) {
    case 200:
      response.send(body)
      break
    case 301:
      response.redirect(headers.Location)
      break
    default:
      response.sendStatus(500)
      break
  }
})

app.listen(port, host, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.log(`http://${host}:${port}`)
  }
})
