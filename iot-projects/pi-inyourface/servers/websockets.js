var WebSocketServer = require('ws').Server,
	resources = require('./../resources/model'),
	utils = require('./../utils/utils');

var refreshRate = 10;

exports.listen = function (server) {
	var wss = new WebSocketServer({server: server});
	console.log("WebSocket server started");
	wss.on('connection', function (ws, req) {
		// TODO 3: Construct a callback for handling client subscription requests
		const url = req.url

		let resource = selectResource(url)
		if (!resource){
			return console.log("bummer, there's an error: ws server")
		}

		utils.monitor(resource, refreshRate,
			function (changes) {
				ws.send(JSON.stringify(changes))
			}
		)
	});
};

function selectResource(url) {
	var parts = url.split('/');
	console.log(parts);
	parts.shift();
	var result = resources;
	for (var i = 0; i < parts.length; i++) {
		result = result[parts[i]];
	}
	return result;
}


