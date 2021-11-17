const http = require('http')
let port = 8686


http.createServer(function (req, res) {
    var json2html = require("node-json2html");

    let data = {
        "name": "Alec",
        "age": 17,
    };
    let transform = {
        "<>": 'h3', 'html': [
            {'<>': 'li', 'html': '${name}'},
            {'<>': 'li', 'html': '${age}'}
        ]
    };
    let html = json2html.transform(data, transform);
    console.log(html.split('><').join('>\n<'))
    res.end(html.split('><').join('>\n<'));        
}).listen(port)
