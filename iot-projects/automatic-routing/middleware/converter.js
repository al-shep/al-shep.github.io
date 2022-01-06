const json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if(req.result){
			if(req.accepts('html')){

				let transform = {'<>': 'div', 'html': [
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'name: '},
						{'<>': 'p', 'html': '${name}'}
					]},
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'description: '},
						{'<>': 'p', 'html': '${description}'}
					]},
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'value: '},
						{'<>': 'p', 'html': '${value}'}
					]}
				]}

				console.log('sending HTML')
				let response = json2html.transform(req.result, transform)
				let links = generateLinks(req.links)
	
				res.send(response + links)
				return
			}

			res.send(req.result)
			return
		}

		next()
	}
};

function generateLinks (linkList) {
	let html = "<h4>Link</h4>"

	for (key in linkList) {
		html += '<a href='+linkList[link]+'>'+link+'</a><br>'
	}

	return html
}