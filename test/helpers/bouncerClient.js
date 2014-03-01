exports.client = function Client() {
    var cmdUrl, bouncer, Request;
    cmdUrl = '/command';
    bouncer = require('../../index.js').bouncer();
    Request = require('./Request.js').Request
    return {
        setCmdUrl: function (url) {
            cmdUrl = url;
        },
        sendCmd: function (cmd, params, res, next) {
            return this.postJson(cmdUrl + '/' + cmd, params, res, next);

        },
        get: function (url, res, next) {

        },
        postJson: function (url, params, res, next) {
            var req;
            req = new Request('POST', url, params, {});
            bouncer(req, res, next);
        }
    };
};