from django.conf import settings
import json, base64, time
from django.utils.cache import patch_vary_headers
from django.utils.http import cookie_date


class JSessionStore(object):
    def __init__(self, data):
        if data:
            self.data = json.loads(base64.b64decode(data))
        else:
            self.data = {}
        self.modified = False

    def __setitem__(self, key, value):
        self.data[key] = value
        self.modified = True

    def __getitem__(self, key):
        return self.data.__getitem__(key)

    def __delitem__(self, key):
        self.data.__delitem__(key)
        self.modified = True

    def __iter__(self):
        return self.data.__iter__()

    def get(self, key, default=None):
        try:
            return self.data[key]
        except KeyError:
            return default

    def dumps(self):
        resp = base64.b64encode(json.dumps(self.data))
        return resp

    def empty(self):
        self.data = {}
        self.modified = True


class JSessionMiddleware(object):
    def process_request(self, request):
        data = request.COOKIES.get("jsession", None)
        request.jsession = JSessionStore(data)

    def process_response(self, request, response):
        try:
            modified = request.jsession.modified
        except AttributeError:
            pass
        else:
            patch_vary_headers(response, ('Cookie',))
            if modified:
                max_age = request.session.get_expiry_age()
                expires_time = time.time() + max_age
                expires = cookie_date(expires_time)

#                request.jsession.save()
                response.set_cookie("jsession",
                                    request.jsession.dumps(), max_age=max_age,
                                    expires=expires, domain=settings.SESSION_COOKIE_DOMAIN,
                                    path=settings.SESSION_COOKIE_PATH,
                                    secure=None,
                                    httponly=False)
        return response
