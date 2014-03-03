module.exports = (function () {
    var MemoryRouter, memoryRouter;
    MemoryRouter = require('../routers/MemoryRouter');
    return {
        setRouter: function (router) {
            memoryRouter = new MemoryRouter(router);
        },
        createResponse: function (req, res, next) {
            var params;
            params = req.jsonBody;
            memoryRouter.add(params);

        }
    };
})();