const resources = require('./../../resources/model');

let actuator1, actuator2;
let model = resources.pi.actuators.leds;
let pluginName = resources.pi.actuators.leds[1].name + ", " + resources.pi.actuators.leds[2].name;

exports.start = function (params) {
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

// TODO 1: Complete the ledsPlugin!

function connectHardware(){
	const Gpio = require('onoff').Gpio
	actuator1 = new Gpio(model[1].gpio, 'out')
	actuator2 = new Gpio(model[2].gpio, 'out')
}

exports.stop = function() {
	actuator1.write(0)
	actuator2.write(0)
	actuator1.unexport()
	actuator2.unexport()
}

exports.switchOnOff = {
	1: function (value) {
		Switch(value, 1)
	},
	2: function (value, value) {
		Switch(value, 2)
	}
}


function Switch(value, led) {
	actuator[led].write(value ? 1 : 0)
}
