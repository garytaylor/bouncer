/*!
 * Connect - bouncer
 * Copyright(c) 2014 GDT Software Services Ltd.
 * Copyright(c) 2014 Gary Taylor
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Bouncer:
 *
 * A connect server will be configured with this middleware to form part of a test framework.
 * The server will then bounce back any response that your test tells it to, either for the duration
 * of the test, for the next request or for the next 'n' requests.
 *
 *
 * Options:
 *
 *   - `commandUrl`  The url prefix for communicating with bouncer from the bouncer client within your test code. This is '/command' by default
 *      but you can change this to prevent clashes with any URL's in your application under test.
 *
 * Examples:
 *
 *   Setup bounce server with non default command url:
 *
 *     connect()
 *       .use(bouncer({commandUrl: '/someNewCommandUrl'}))
 *
 * @param {Object} options
 * @return {Function}flobalob
 * @api public
 */

exports.bouncer = function (options) {
    var connectRoute, commandController;
    commandController = require('./lib/controllers/command');
    connectRoute = require('connect-route')(function (router) {
        router.post('/command/createResponse', commandController.createResponse);
    });
    options = options || {};
    /**
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @param {Function} next
     */
    return function bouncer(req, res, next) {
        var body;
        /**
         * @TODO Take note of the command url - for now it is hard coded
         */
        connectRoute(req, res, function () {
            if (req.url.match(/^\/gary\.json/)) {
                body = '{"name": "Gary Taylor"}';
                res.writeHead(200, {
                    'Content-Length': body.length,
                    'Content-Type': 'application/json'
                });
                res.end(body, 'utf8');
                return;
            }
            next();
        });
    }

};