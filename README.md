# pumlhorse-express

This project allows you to use [Pumlhorse](https://github.com/pumlhorse/pumlhorse) as a controller engine in [Express](https://www.expressjs.com).

## Setup

First, see the [Express](https://www.expressjs.com) documentation for setting up a project. Then run `npm install --save pumlhorse-express`.

Next, in your `server` file, add the following code:

```javascript
//This is probably already in your file
const express = require('express');
const app = express();
//Load Pumlhorse
const pumlhorseExpress = require('pumlhorse-express')

//...

app.use(pumlhorseExpress.Router(require('./site.json')));
```


## Route Configuration

The last line in the example above tells Pumlhorse to use a file named `site.json` for configuring routes. Here is an example configuration file.

```json
{
    "routes": {
        "/api/animals": {
            "get": "api/animals/list.puml",
            "post": "api/animals/create.puml"
        },
        "/api/animals/:id": {
            "get": "api/animals/test.puml",
            "delete": "api/animals/delete.puml"
        },
        "/home": {
            "get": "ui/home.puml"
        }
    }
}
```

For example, a POST request to the route `/api/animals` will call the `api/animals/create.puml` script.

## Request Parameters

In a script, you can access the request parameters

```yaml
name: Sample controller for route /users/:userId
steps:
  # Retrieve request headers
  - log: Authorization is $headers.Authorization 
  # Retrieve route values with "path"
  - log: User id is $path.userId
  # Retrieve query string values with "query"
  - log: Query param is $query.myValue
```

If you are using the [body-parser](https://github.com/expressjs/body-parser) package, you can also retrieve the body with `$body`.

## Returning Responses


The following functions are available for returning responses:

* `ok` - Returns 200
* `created` - Returns 201
* `accepted` - Returns 202
* `noContent` - Returns 204
* `badRequest` - Returns 400
* `notFound` - Returns 404

These functions can be used as follows:

```yaml
# Return a JSON response with status code 200
- ok:
    name: Horse
    weight: a lot
    color: Brown
```

Additionally, you can return other status codes:

```yaml
# Return a JSON response with status code 123
- sendResponse:
    code: 123
    data:
      name: Horse
      weight: a lot
      color: Brown
```

## Returning UI views

Pumlhorse supports returning HTML views. You can use whatever Express rendering engine you like.

```yaml
- html:
    view: ./myView.jade
    data: # View model used for the view (if applicable)
      firstName: John
      lastName: Smith
      lastLogin: July 1st, 1997
```