$(function() {
	var JSESSION = {};
	window.JSESSION = JSESSION;

    JSESSION.init = {
        jsessionCookie : 'jsession',
        parseCookie : function() {
            var cookies = $.cookie(JSESSION.init.jsessionCookie)
            if(cookies) {
                var x = '';
                if(cookies.charAt(0) == '"' && cookies.charAt(cookies.length-1) == '"') {
                    x = $.base64Decode(cookies.substring(1,cookies.length-1));
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
});
