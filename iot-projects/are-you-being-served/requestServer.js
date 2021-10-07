// requestServer.js file


// grab URL
let args = process.argv.slice(2)

//import http and request, setting port
const http = require('http')
const request = require('request')
const port = 8686

// server creation
http.createServer(function(req, res) {
    let url = args[0] ? args[0] : "<a default url>";
    request(url, function(error, response, body) {
        if (!body || !response || (error === null && response.statusCode !== 200)) {
            res.end('bad URL\n')
        } else if (response.statusCode === 200 && !error === true) {
            res.writeHead(200, 'text/html')
            res.write(body)
            res.end()
        } else {
            res.writeHead(response.statusCode, 'text/plain')
            res.write(error.toString())
            res.end()
        }
    })
}).listen(port)