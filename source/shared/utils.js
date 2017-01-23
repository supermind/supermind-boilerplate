import { omitBy, isNil } from 'lodash'

export function ifElse(condition) {
  return function thenOtherwise(then, otherwise) {
    return condition ? then : otherwise
  }
}

export function switchMap(key) {
  return function when(valueMap) {
    return valueMap[key]
  }
}

export function cleanMap(object) {
  return omitBy(object, isNil)
}

export default ifElse
