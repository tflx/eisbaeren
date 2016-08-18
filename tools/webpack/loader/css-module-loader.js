var opts = require('../../options');

/**
 * Split the CSS loader generation in a separate file to keep it sane. :)
 * @returns {Array}
 */
module.exports = function getLoaders() {
  var DEBUG = opts.isDevelopment();

  //Basic loaders
  var CSS = 'css-loader?' + JSON.stringify({sourceMap: true, minimize: !DEBUG});

  var loaders = opts.cssModules ? cssModuleLoaders() : [];
  var include = opts.cssModules ? opts.paths.src + '/global' : null;

  //Global CSS loader
  loaders.push({
    test   : /\.(css|scss)$/,
    include: include,
    loaders: ['style-loader', CSS, 'postcss']
  });

  function cssModuleLoaders() {
    var loaders = [];
    var cssModuleLoader = 'css-loader?' + JSON.stringify({
        sourceMap     : true,
        importLoaders : 1,
        modules       : true, // CSS Modules https://github.com/css-modules/css-modules
        localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:8]',
        minimize      : !DEBUG, // CSS Nano http://cssnano.co/options/
        camelCase     : true
      });

    //CSS modules loader
    loaders.push({
      test   : /\.(css|scss)$/,
      include: opts.paths.src,
      exclude: /(global|node_modules)/,
      loaders: ['style-loader', cssModuleLoader, 'postcss']
    });

    return loaders;
  }

  return loaders;
};

