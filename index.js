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
var _ = require('underscore');
var request = require('request');

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
    var connectRoute, commandController, jsonBody, router;
    jsonBody = require("body/json");
    commandController = require('./lib/controllers/command');
    connectRoute = require('connect-route')(function (_router_) {
        router = _router_;
        router.post('/command/createResponse', commandController.createResponse);
    });
    commandController.setRouter(router);
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
        function bounceRouter () {
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
        if (req.method === 'POST') {
            jsonBody(req, res, function (err, body) {
                req.jsonBody = body;
                bounceRouter();
            });
        } else {
            bounceRouter();
        }
    }

};
/**
 * BouncerClient:
 *
 * The bouncer client is used within the test suite as a simple helper to send commands to bouncer.
 *
 *
 *
 * @param options
 * @returns {bouncerClient}
 */
exports.bouncerClient = function () {
    function bouncerClient(options) {
        this.options = _.extend({commandUrl: '/command'}, options);
    }
    _.extend(bouncerClient.prototype, {
        sendCmd: function (cmd, json) {
            request.post(_.extend({}, {url: this.options.baseUrl + this.options.commandUrl + '/' + cmd, json: json}));
        }
    });
    return bouncerClient;
}