var options = require('../options');
var webpack = require('webpack');

var config = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: options.paths.src //Resolve root paths
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {test: /\.json$/, loader: 'json'},
      /* Parse CSS modules? */
      {
        test   : /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?' + JSON.stringify({
            sourceMap     : false,
            importLoaders : 1,
            modules       : true,
            localIdentName: '[name]_[local]_[hash:base64:3]'
          })
        ]
      },
    ]
  },
  plugins: [
    //Replace the following files with dummy files
    new webpack.NormalModuleReplacementPlugin(/\.(jpg|gif|png|scss)$/, 'node-noop')
  ],
  externals: {
    //Externals needed for Enzyme
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  }
};

module.exports = config;