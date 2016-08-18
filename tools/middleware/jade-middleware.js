var url = require('url');
var pug = require('pug');
var fs = require('fs');

var PATHS = ['.pug', '.jade', '/index.pug', '/index.jade'];
var cache = {};
/**
 * Compile Jade/Pug files on the fly.
 * @type {module.jadeMiddleware}
 */
exports = module.exports = function jadeMiddleware(options, historyFallback) {
  options = options || {};
  historyFallback = historyFallback || false;

  var root = options.base || process.cwd() + '/src';
  var getData = options.data;

  return function(req, res, next) {
    var headers = req.headers;
    if (req.method !== 'GET') {
      return next();
    } else if (!headers || typeof headers.accept !== 'string') {
      return next();
    } else if (headers.accept.indexOf('application/json') === 0) {
      return next();
    } else if (!acceptsHtml(headers.accept, options)) {
      return next();
    }

    var parsedUrl = url.parse(req.url);
    var path = parsedUrl.pathname;
    if (path.charAt(path.length-1) == '/') {
      path = path.substr(0, path.length - 1);
    }
    if (path.indexOf('.') !== -1) {
      if (path.indexOf('.html') !== -1 || path.indexOf('.pug') !== -1 || path.indexOf('.jade') !== -1) {
        path = path.substr(0, path.indexOf('.'));
      } else {
        return next();
      }
    }

    getHTML(path, options, (html) => {
      if (html) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(html);
      } else if (!html && historyFallback) {
        //History fallback to root?
        html = getHTML('', options, (html) => {
          if (html) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(html);
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });
  };

  function getHTML(path, options, cb) {
    /**
     * Check for the match Jade file
     **/
    for (var i = 0; i < PATHS.length; i++) {
      var filePath = root + path + PATHS[i];
      if (fs.existsSync(filePath)) {
        //Found a match - Send it as response
        pug.renderFile(filePath, getData ? getData(filePath) : {}, (err, result) => {
          if (err) {
            console.log(err.message);
            cb(cache[filePath]); //Return the last valid state
          }
          cache[filePath] = result;
          cb(result);
        });
      }
    }
    cb(null);
  }
};

function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}