'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://10.9.70.69:8080/api"',
  BASE_API: '"http://10.9.70.61:8080/api"'
  // BASE_API: '"http://10.9.70.72:8080/api"'
  // BASE_API: '"http://10.9.60.11:8080/api"'
})
