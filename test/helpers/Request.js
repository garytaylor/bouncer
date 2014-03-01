exports.Request = (function() {
    function Request(method, url, params) {
        this.method = method;
        this.url = url;
        this.params = params;
    }

    return Request;

})();
