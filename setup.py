from setuptools import setup, find_packages

setup(name="django-jsession",
           version="0.1",
           description="A simple way to share data between the server and JS.",
           author="David Novakovic <dpn@dpn.name>",
           packages=find_packages(),
           include_package_data=True,
           zip_safe=False
)