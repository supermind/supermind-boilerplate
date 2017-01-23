import { join, resolve } from 'path'

export const ROOT_DIR = resolve(__dirname, '../..')

export const ASSETS_DIR = join(ROOT_DIR, 'assets')
export const SOURCE_DIR = join(ROOT_DIR, 'source')
export const STATIC_DIR = join(ROOT_DIR, 'static')

export const CLIENT_SOURCE_DIR = join(SOURCE_DIR, 'client')
export const SERVER_SOURCE_DIR = join(SOURCE_DIR, 'server')
export const SHARED_SOURCE_DIR = join(SOURCE_DIR, 'shared')

export const CLIENT_BUILD_DIR = join(STATIC_DIR, 'assets')
export const SERVER_BUILD_DIR = join(STATIC_DIR, 'server')
