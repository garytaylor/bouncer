exports.Request = (function() {
    function Request(method, url, params, headers) {
        this.method = method;
        this.url = url;
        this.params = params;
        this.headers = {};
        this.on = function () {};
        this.once = function () {};
    }

    return Request;

})();
