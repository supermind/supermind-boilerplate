import handleRequest from './request-handler'

const normaliseRequest = request => ({
  url: request.url
})

/**
 * Lambda event handler to interface with AWS Gateway.
 * @param {object} event Event object from AWS Gateway.
 * {
 *   method: 'GET',
 *   url: '/some/path?foo=bar',
 *   headers: {
 *     'Location': 'http://www.supermind.com/some/path?foo=bar',
 *     'Host': 'www.supermind.com',
 *     'Something': 'awesome'
 *   }
 *   host: 'www.supermind.com',
 *   path: '/some/path',
 *   query: {
 *     foo: 'bar'
 *   }
 * }
 * @param {object} context Lambda context API.
 * @param {function} callback Lambda callback.
 * @returns {void}
 */
export function handler(event, context, callback) {
  const normalisedRequest = normaliseRequest(event)
  const normalisedResponse = handleRequest(normalisedRequest)
  const { statusCode } = normalisedResponse
  switch (statusCode) {
    case 200:
    case 301:
      callback(null, normalisedResponse)
      break
    default:
      callback(statusCode)
      break
  }
}
