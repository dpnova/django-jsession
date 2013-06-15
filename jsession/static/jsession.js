$(function() {
	var JSESSION = {};
	window.Scrunch = Scrunch;

    JSESSION.init = {
        loggedInCookie : 'jsession',
        parseAuthCookie : function() {
            var cookies = $.cookie(Scrunch.social.loggedInCookie)
            if(cookies) {
                var x = '';
                if(cookies.charAt(0) == '"' && cookies.charAt(cookies.length-1) == '"') {
                    x = $.base64Decode(cookies.substring(1,cookies.length-1));
                }
                else {
                    x = $.base64Decode(cookies);
                }
                var json = $.parseJSON(x);
                $.log(json);
                return json
            }
            return false;
        },