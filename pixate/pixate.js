var createLayer = function(name) {
	if (check.isText(name, 'createLayer failed. Argument "name" is not a string.')) {
		writeToConsole('createLayer("'+name+'")');
	}

	return { name: name, isLayer: true };
};

var nestLayers = function(layer, child) {
	if (check.isLayer(layer, 'nestLayers failed. Argument "layer" is not a layer')
	 && check.isLayer(child, 'nestLayers failed. Argument "child" is not a layer'))
	{
		writeToConsole('nestLayers(\''+layer.name+'\', \''+child.name+'\')');
	}
};


var check = {
	isText: function(text, message) {
		return check.validate(typeof(text) === 'string', message);
	},

	isLayer: function(layer, message) {
		return check.validate(typeof(layer) === 'object' && layer.isLayer, message);
	},

	validate: function(result, message) {
		if (!result) {
			writeToConsole(message, true);
		}
		return result;
	}
};

var stats = {
	el: document.getElementById('target'),
	count: 1
};

var writeToConsole = function(msg, fail) {
	var el = document.createElement('div');
	
	if (fail) {
		el.className = 'fail';
	}

	el.innerHTML = (stats.count++) + ' - ' + msg;

	stats.el.appendChild(el);
};