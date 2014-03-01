describe('Bouncer middleware', function () {
    var cmdUrl, client;
    client = require('../helpers/bouncerClient').client();
    beforeEach(function () {
        cmdUrl = '/command';
    });
    describe('Responding with fixed data', function () {
        var responseBody, res, next;
        /**
         * The data will look something like this
         * Request:
         *   headers:
         *     accept: "text/html,application/xhtml"
         *     accept-encoding: "gzip,deflate,sdch"
         *     accept-language: "en-US,en;q=0.8"
         *     connection: "keep-alive"
         *     cookie: "XSRF-TOKEN=sdgfjsdhfjsdhfh"
         *     host: "127.0.0.1:9001"
         *     user-agent: "Mozilla/5.0/....."
         *   method: "GET"
         *   originalUrl: "/"
         *   url: "/"
         */
        beforeEach(function () {
            responseBody = '[{"id": 1, "name": "Gary Taylor"},{"id": 2, "name": "Fred Bloggs"}]';
            res = jasmine.createSpyObj('ServerResponse', ['writeHead', 'end']);
            next = jasmine.createSpy('Next');
            client.sendCmd('createResponse', {
                method: 'GET',
                url: '/users.json',
                response: responseBody,
                headers: {'Content-Type': 'application/json'}
            }, res, next);
        });
        it('Should respond with the correct json when the url is accessed', function () {
            client.get('/users.json', res, next);
            expect(res.end).toHaveBeenCalledWith(responseBody, 'utf8');
            expect(res.writeHead).toHaveBeenCalledWith({'Content-Length': responseBody.length, 'Content-Type': 'application/json'});

        });
    });
});