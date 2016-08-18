# Mock API

API middleware, that allows you to return JSON data to the application.

Want a full blown REST API instead? Try [json-server](https://github.com/typicode/json-server).

## Configuration
The middleware is added to the BrowserSync server: `tools/server.js`

* endPoint - The common URL path API calls. By default it will be `http://localhost:3000/api/`
* root - The directory containing the mock files

## Usage
The simplest way to use the API, is to just place a JSON file in the 'mock-api' directory, and fetch it.

```
fetch('/api/json-service')
    .then(response => response.json())
    .then(json => console.log(json))
```

If you need more control over the API, handle POST and arguments, then you can create a .js file.
This gives the request and response object from Node, so you can modify the response.

__Tip__ use modules like [faker](https://github.com/Marak/faker.js), [casual](https://github.com/boo1ean/casual) or [chance](https://github.com/victorquinn/chancejs).

If you return an Object it will be parsed to JSON, and used as the response. But if you don't return an Object, make sure to call res.end({result}) to return the response.

```
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
```

Return response based on query strying:
```
fetch('/api/js-service?name=The%20Dude')
    .then(response => response.json())
    .then(json => console.log(json))
```