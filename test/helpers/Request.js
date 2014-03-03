exports.Request = (function() {
    function Request(method, url, params, headers) {
        this.method = method;
        this.url = url;
        this.params = params;
        this.headers = {};
        this._events = {};
        this.on = function (evt, handler) {
            this._events[evt] = handler;
        };
        this.once = function (evt, handler) {
            this._events[evt] = handler;
        };
        this.post = function (data) {
            this._events.data(data);
            this._events.end();
        }
        this.removeListener = function (evt) {
            delete this._events[evt];
        }

    }

    return Request;

})();
