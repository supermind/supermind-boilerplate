/* eslint-disable max-statements */
/* eslint-disable camelcase */

import { join } from 'path'
import { compact, flatten, get } from 'lodash'
import {
  optimize,
  DefinePlugin,
  NoErrorsPlugin,
  NamedModulesPlugin,
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin
} from 'webpack'
import MD5Plugin from 'webpack-md5-hash'
import AssetsPlugin from 'assets-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import { ifElse, cleanMap, switchMap } from './source/shared/utils'
import {
  SOURCE_DIR,
  CLIENT_SOURCE_DIR,
  SERVER_SOURCE_DIR,
  CLIENT_BUILD_DIR,
  SERVER_BUILD_DIR
} from './source/shared/paths'

const {
  UglifyJsPlugin,
  OccurrenceOrderPlugin
} = optimize

//----------------------------------------
// Webpack Config Factory
//----------------------------------------

module.exports = function createWebpackConfig(options) {
  const nodeEnv = get(options, 'NODE_ENV', 'development')
  const target = get(options, 'TARGET', 'server')

  const isDevelopment = nodeEnv === 'development'
  const isProduction = nodeEnv === 'production'
  const isClient = target === 'client'
  const isServer = target === 'server'

  const whenTarget = switchMap(target)
  const ifDevelopment = ifElse(isDevelopment)
  const ifProduction = ifElse(isProduction)
  const ifClient = ifElse(isClient)
  const ifServer = ifElse(isServer)

  return cleanMap({

    //----------------------------------------
    // Input » Output
    //----------------------------------------

    entry: whenTarget({
      client: {
        index: join(CLIENT_SOURCE_DIR, 'client.js')
      },
      server: {
        express: join(SERVER_SOURCE_DIR, 'express-server.js'),
        lambda: join(SERVER_SOURCE_DIR, 'lambda-server.js')
      }
    }),

    output: {
      filename: ifProduction('[name]_[chunkhash].js', '[name].js'),
      path: ifServer(SERVER_BUILD_DIR, CLIENT_BUILD_DIR),
      libraryTarget: ifServer('commonjs2', 'var'),
      // library: ifServer('handler'),
      publicPath: 'assets/'
    },

    //----------------------------------------
    // Environment
    //----------------------------------------

    target: ifServer('node', 'web'),

    devtool: ifElse(isServer || isDevelopment)('source-map'),

    externals: ifServer([
      nodeExternals({ modulesFromFile: true })
    ]),

    //----------------------------------------
    // Module + Rules
    //----------------------------------------

    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: SOURCE_DIR
      }]
    },

    //----------------------------------------
    // Plugins
    //----------------------------------------

    plugins: compact(flatten([
      new MD5Plugin(),
      new DefinePlugin({
        'process.env.IS_CLIENT': JSON.stringify(isClient),
        'process.env.IS_SERVER': JSON.stringify(isServer),
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        'process.env.TARGET': JSON.stringify(target)
      }),

      //------------------------------
      // Client Plugins
      //------------------------------

      ifClient([
        new AssetsPlugin({
          filename: 'assets.json',
          path: SERVER_BUILD_DIR
        })
      ]),

      //------------------------------
      // Development Plugins
      //------------------------------

      ifDevelopment([
        new NoErrorsPlugin(),
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin()
      ]),

      //------------------------------
      // Production Plugins
      //------------------------------

      ifProduction([
        new OccurrenceOrderPlugin(),
        new LoaderOptionsPlugin({
          minimize: true
        }),
        new UglifyJsPlugin({
          sourceMap: true,
          compress: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        })
      ])
    ]))
  })
}
