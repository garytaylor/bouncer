var _;
_ = require('underscore');
module.exports = (function() {
    var centralRouter;
    function MemoryRouter(_centralRouter_) {
        centralRouter = _centralRouter_;
    }
    _.extend(MemoryRouter.prototype, {
        add: function (options) {
            centralRouter[options.method.toLowerCase()](options.url, function (req, res, next) {
                res.end(options.response, 'utf8');
                res.writeHead(_.extend({'Content-Length': options.response.length}, options.headers));

            });

        }
    });
    return MemoryRouter;

})();
