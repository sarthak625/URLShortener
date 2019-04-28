# A URL Shortener built using Node and Mongo

URL shortener works by hashing a URL and storing it into a DB. The user gets the URL with the hash key which is much smaller than the original URL. When the user requests for the content using the shortened URL, the hash is retrieved from the DB and user is redirected to the URL.
In this usecase, instead of hashing the URL, I hashed the document id, and unhashed it to retrieve the url. This gives better performance and much shorter URLs.

## Installation

```sh
npm install
```

Set up a .env file with the following properties:

> NODE_ENV=dev
> PORT=5000
> MONGODB_HOST=127.0.0.1
> MONGODB_PORT=27017

To start the application
```sh
npm start
```

## Routes

- Route to shorten the URL

    <Service>:<PORT>/shorten POST

    Request Body:
```js
    {
        "url" : "<url-to-shorten>"
    }
```

- Route to view the shortened URL

    <Service:PORT>/<hash> GET


## Example

- localhost:5000/shorten POST
 Request body 
    > { "url" : "https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters" }

    ```js
    {
        "code": 200,
        "message": "Retrieved",
        "url": "https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters",
        "hash": "MTAwMDE="
    }
    ```

- localhost:5000/MTAwMDE= GET


