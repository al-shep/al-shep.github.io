const httpServer = require('./servers/http'),
	resources = require('./resources/model'),
	wsServer = require('./servers/websockets');

const ledPlugin = require('./plugins/internal/ledsPlugin')
ledPlugin.start({})

const pirPlugin = require('./plugins/internal/pirPlugin')
pirPlugin.start({})

const dhtPlugin = require('./plugins/internal/dhtPlugin')
dhtPlugin.start({'frequency': 2000})

const server = httpServer.listen(resources.pi.port, function () {
	wsServer.listen(server)
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	pirPlugin.stop()
	dhtPlugin.stop()
	process.exit()
});
