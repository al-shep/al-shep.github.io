const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;

let sensor;
const device = resources.pi.sensors.pir;

function connectHardware(){
	sensor = new Gpio(device.gpio, 'in', 'both')
	sensor.watch(funtion(err, value){
		if(err === false){
			device.value = !!value
		}
	})
}

exports.start = function(params){
	connectHardware()
}

exports.stop = function(params){
	sensor.unexport()
}

