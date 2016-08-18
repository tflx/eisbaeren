/**
 * Create a custom JSON service that takes params, and returns a response.
 * If you return an Object it will be parsed to JSON, and used as the response.
 *
 * @param req
 * @param res
 * @param query {Object} The querystring params
 * @returns Object If you don't return an Object, make sure to call res.end({result}) to return the response.
 */
module.exports = function(req, res, query) {
  if (query.name) {
    return {
      name: query.name
    }
  } else if (query.error) {
    //Set a custom status code
    res.statusCode = 400;
    return {
      error: true
    }
  }
  return {
    name: 'Nobody'
  }
};