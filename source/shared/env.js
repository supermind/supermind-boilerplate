import { get } from 'lodash'
import { ifElse, switchMap } from './utils'

export const nodeEnv = get(process, 'env.NODE_ENV', 'development')
export const target = get(process, 'env.TARGET', 'client')

export const isDevelopment = nodeEnv === 'development'
export const isProduction = nodeEnv === 'production'
export const isClient = target === 'client'
export const isServer = target === 'server'

export const whenTarget = switchMap(target)
export const ifDevelopment = ifElse(isDevelopment)
export const ifProduction = ifElse(isProduction)
export const ifClient = ifElse(isClient)
export const ifServer = ifElse(isServer)
