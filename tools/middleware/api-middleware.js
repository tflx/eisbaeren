var url = require('url');
var qs = require('query-string');
var fs = require('fs');

exports = module.exports = function apiMiddleware(options) {
  options = options || {};
  var root = options.base || '';
  var endpoint = options.endpoint || '/';
  if (endpoint && endpoint.charAt(0) != '/') endpoint = '/' + endpoint;

  return function(req, res, next) {
    var parsedUrl = url.parse(req.url);
    var path = parsedUrl.pathname;
    if (endpoint && path.indexOf(endpoint) != 0) {
      return next();
    }

    path = path.substr(endpoint.length);
    if (path.charAt(0) != '/') {
      return next(); //Not looking at service
    }

    //Set the absolute file path and ignore the extension.
    var absPath = root + path.replace(/\.[^/.]+$/, "");

    if (fs.existsSync(absPath + '.json')) {
      //JSON file found - Return it
      res.writeHead(200, {'Content-Type' : 'application/json'});
      fs.readFile(absPath + '.json', (err, data) => {
        res.end(data);
      })
    } else if (fs.existsSync(absPath + '.js')) {
      delete require.cache[absPath + '.js']; //Require the file again
      var handler = require(absPath + '.js');

      res.setHeader('Content-Type', 'application/json');
      var result = handler(req, res, qs.parse(parsedUrl.search));
      if (result) {
        res.end(JSON.stringify(result));
      }
    } else if (endpoint) {
      res.writeHead(404, {'Content-Type' : 'application/json'});
      res.end("Service not found: '" + absPath + "'");
    } else {
      return next();
    }
  };
};