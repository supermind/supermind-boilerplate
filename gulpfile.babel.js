/* eslint-disable global-require */
/* eslint-disable no-console */

import del from 'del'
import gulp from 'gulp'
import dotenv from 'dotenv'
import webpack from 'webpack'
import sequence from 'run-sequence'
import { assign, attempt } from 'lodash'
import { STATIC_DIR } from './source/shared/paths'

// Load and parse .env file
const { parsed: env } = dotenv.load()

//----------------------------------------
// Webpack Helpers
//----------------------------------------

function createWebpackConfig(options) {
  return require('./webpack.config')(options)
}

function createWebpackHandler(callback) {
  return function webpackHandler(error, stats) {
    if (error) {
      console.log(error.stack || error)
      if (error.details) console.log(error.details)
      attempt(callback, error)
    } else {
      console.log(stats.toString({
        children: false,
        chunks: false,
        colors: true
      }))
      const { errors, warnings } = stats.toJson()
      if (stats.hasErrors()) attempt(callback, errors)
      else if (stats.hasWarnings()) attempt(callback, warnings)
      else attempt(callback, null, stats)
    }
  }
}

function bundleWithWebpack(options, callback) {
  const webpackConfig = createWebpackConfig(assign({}, env, options))
  const webpackHandler = createWebpackHandler(callback)
  webpack(webpackConfig, webpackHandler)
}

//----------------------------------------
// Gulp Tasks
//----------------------------------------

gulp.task('clean', () => del(STATIC_DIR))

gulp.task('build:client', callback => bundleWithWebpack({
  NODE_ENV: 'production',
  TARGET: 'client'
}, callback))

gulp.task('build:server', callback => bundleWithWebpack({
  NODE_ENV: 'production',
  TARGET: 'server'
}, callback))

gulp.task('build', sequence('clean', [ 'build:server' ]))

gulp.task('default', [ 'build' ])
