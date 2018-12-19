from bottle import route, run, static_file, template, request
from sys import argv




@route('/', method='GET')
def get_app():
    return template("static/html/index.html")


@route('/css/<filename:re:.*\.css>', method='GET')
def stylesheets(filename):
    return static_file(filename, root='static/css')


@route('/js/<filename:re:.*\.js>', method='GET')
def js(filename):
    return static_file(filename, root='static/js')


if __name__ == "__main__":
    run(host='0.0.0.0', port=argv[1])