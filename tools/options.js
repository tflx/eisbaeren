var path = require('path');
var args = require('./args');

module.exports = {
  paths: {
    api: path.join(__dirname, '../mock-api'),
    dist: path.join(__dirname, '../dist'),
    src: path.join(__dirname, '../src'),
    node: path.join(__dirname, '../node_modules'),
    static: path.join(__dirname, '../src/static'),
    sprites: path.join(__dirname, '../src/sprites/svgs')
  },
  apiEndpoint: '/api',
  demoUrl: 'https://masterpass.aerobatic.io',
  HMR: true,
  cssModules: true,
  vendorModules: [
    'babel-polyfill',
    'classnames',
    'react',
    'react-dom',
    'whatwg-fetch'
  ], //true to include all dependencies, Array to include specific modules, or false to skip vendor.
  excludeFromVendor: ['normalize.css'],

  isWatching: args.isWatching,
  isProduction: args.isProduction,
  isDevelopment: args.isDevelopment
};