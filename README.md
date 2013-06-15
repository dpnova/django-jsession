django-jsession
===============

JSession is a simple way to pass data from serer to browser via cookies without messing around with extra ajax calls etc.
This is most useful for indicating to javascript whether the user is signed in or not. Obviously you would remember to clear
this cookie on logout. It can also be used to populate fields that may need to be updated by javascript after the page load,
which is handy if your html is heavily cached.

Installation
---------------
`pip install git+https://github.com/dpnova/django-jsession.git`

Then add to your INSTALLED_APPS in django:

```python
INSTALLED_APPS = [
    ....,
    "jsession"
]
```

and make sure you add the middleware too:

```python
MIDDLEWARE_CLASSES = [
    ...,
    "jsession.middleware.JSessionMiddleware"
]
```

In your templates make sure you include the relevant javascript files:

```html
    <script src="{{ STATIC_URL }}jsession/jquery.base64.js"></script>
    <script src="{{ STATIC_URL }}jsession/jquery.cookie.js"></script>
    <script src="{{ STATIC_URL }}jsession/jsession.js"></script>
```


Usage
-----
In a Django view you can simply access the structure on the request object:

```python
def fooview(request):
    request.jsession['user_fullname'] = request.user.get_full_name()
    return render(request, ...)
```

Now from javascript you can access the contents of the cookie like this:

```javascript
data = JSESSION.get("user_fullname");
console.log(data);
```

Warning
-------

This cookie is insecure, please do not put sensitive information into it! It is for convenience only.
