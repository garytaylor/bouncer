var proxyquire;
proxyquire = require('proxyquire');
describe('Bouncer client', function () {
    var Client, client, requestMock;
    beforeEach(function () {
        requestMock = jasmine.createSpyObj('request mock', ['post']);
        Client = proxyquire('../../index.js', {request: requestMock}).bouncerClient();
        client = new Client({baseUrl: 'http://localhost:9000'});
    });
    it('Should post a request to add a new route', function () {
        var responseBody;
        responseBody = '[{"id": 1, "name": "Gary Taylor"},{"id": 2, "name": "Fred Bloggs"}]';
        client.sendCmd('createResponse', {
            method: 'get',
            url: '/users.json',
            response: responseBody,
            headers: {'Content-Type': 'application/json'}
        });
        expect(requestMock.post).toHaveBeenCalledWith(jasmine.objectContaining({url: 'http://localhost:9000/command/createResponse', json: {method: 'get', url: '/users.json', response: responseBody, headers: {'Content-Type': 'application/json'}}}));
    });
});