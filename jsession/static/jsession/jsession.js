$(function() {
	var JSESSION = {};
	window.JSESSION = JSESSION;

    JSESSION.init = {
        withQuotes: false,
        jsessionCookie : 'jsession',
        parseCookie : function() {
            var cookies = $.cookie(JSESSION.init.jsessionCookie);
            if(cookies) {
                var x = '';
                if(cookies.charAt(0) == '"' && cookies.charAt(cookies.length-1) == '"') {
                    x = $.base64Decode(cookies.substring(1,cookies.length-1));
                    JSESSION.init.withQuotes = '"';
                }
                else {
                    x = $.base64Decode(cookies);
                }
                var json = $.parseJSON(x);
                return json
            }
            return false;
        }
    }
    JSESSION.set = function(key, value) {
            var data = JSESSION.init.parseCookie();
            data[key] = value;
            var json = JSON.stringify(data);
            if(JSESSION.init.withQuotes){
                json = '"'+json+'"';
            }
            var b64 = $.base64Encode(json);
            $.cookie(JSESSION.init.jsessionCookie, b64);
    }
    JSESSION.get = function(key) {
            var data = JSESSION.init.parseCookie();
            return data[key];
    }
});
