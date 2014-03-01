# Bouncer

Connect middleware for programatically bouncing back responses to your tests via an HTTP server.  Useful for UI testing without a real backend server

```js
app.use(bouncer({commandUrl: '/bounceCommand'}));
```

This middleware, with the help of a connect setup (or any server based on connect such as express) assists in UI testing simply by being a web server
that your integration tests (such as protractor) can talk to as well as your tests even though they are different processes.
So, your test can say :-

'on all requests made via GET to /users respond with this json '[{"name": "Gary Taylor", "username": "garyt"}]''

or

'on the next request only made via GET to /users respond with this json '[{"name": "Someone Else", "username": "someone"}]'

When the application under test makes its next request to these url's, the web server responds as your test told it to - i.e. it bounces back data from your test

## API

### bouncer(options)

Create new bounce middleware for use in your connect setup

**options**

    - `commandUrl` The url prefix for communicating with bouncer from the bouncer client within your test code. This is '/commandUrl' by default
                         but you can change this to prevent clashes with any URL's in your application under test.