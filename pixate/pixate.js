var Pixate = function(enableDiagnostics) {
	
	var api = {
		getSelectedLayer: {
			returns: 'Layer or null'
		},
		
		getSelectedLayers: {
			returns: 'Layer[]'
		},
		
		getSelectedAnimations: {
			returns: 'Animation[]'
		},
		
		getLayerByName: {
			parameterNames: ['name'],
			returns: 'Layer or null'
		},
		
		getAllLayers: {
			returns: 'Layer[]'
		},
		
		getAssetByName: {
			parameterNames: ['name'],
			returns: 'Asset or null'
		},

		createLayer: {
			parameterNames: ['name'],
			returns: 'Layer'
		},

		setLayerConfig: {
			parameterNames: ['layer', 'config'],
			isCustom: true
		},

		nestLayer: {
			parameterNames: ['target', 'source']
		},

		addAnimationCondition: {
			parameterNames: ['animation'],
			returns: 'AnimationCondition'
		}
	};


	enableDiagnostics = !!enableDiagnostics;

	var assertions = [];
	var commandOutput = [];
	var layers = [];

	var registerCommand = function(command, arguments) {
		commandOutput.push({
			command: command,
			arguments: arguments || [],
			assertions: assertions || [];
		});

		assertions = [];
	};

	var findLayer = function(name) {
		for (var i = 0; i < layers.length; i++) {
			if (layers[i].layer.name === name) {
				return layers[i];
			}
		}

		return null;
	}

	var addLayer = function(nameOrLayer) {
		var layer = nameOrLayer;

		if (typeof nameOrLayer === 'string'){
			layer = { name: nameOrLayer };
		} else if (typeof nameOrLayer !== 'object') {
			Pixate.Assert.assert(false, 'nameOrLayer', 'Argument is not type string or object');
		} else if (!layer.name) {
			Pixate.Assert.assert(false, 'nameOrLayer', 'Object representing Layer does not have a name');
		}

		layers.push({
			layer: layer;
		});

		return layer;
	}

	return {
		
		getLayerByName: function(name) {
			Pixate.Assert.isText(name, 'name');

			if (!findLayer(name)) {
				addLayer(name);
			}
			
			return registerCommand('getLayerByName', [name]);
		},

		getAllLayers: function() {
			return registerCommand('getAllLayers', [name]);
		},

		getAssetByName: function(name) {
			Pixate.Assert.isText(name, 'name');

			return registerCommand('getAssetByName', [name]);
		},

		createLayer: function(name, config) {
			Pixate.Assert.isText(name, 'name');

			var layer = findLayer(name);

			if (!layer) {
				layer = addLayer(name);
				layer.isCreated = true;
			}

			var result = registerCommand('createLayer', [name]);
			if (config) {
				result = registerCommand('setLayerConfig', [layer, config]);
			}
		},

		nestLayer: function(target, source) {
			Pixate.Assert.isLayer(target, 'target');
			Pixate.Assert.isLayer(source, 'source');

			registerCommand('createLayer', [target, source]);
		},

		addAnimationCondition: function(animation) {
			Pixate.Assert.isAnimation(animation, 'animation');

			return registerCommand('addAnimationCondition', [animation])	;
		},

		Editor: {
			getSelectedLayer: function() {
				return registerCommand('getSelectedLayer');
			},

			getSelectedLayers: function() {
				return registerCommand('getSelectedLayers');
			},

			getSelectedAnimations: function() {
				return registerCommand('getSelectedAnimations');
			}
		},

		Assert: {
			isText: function(text, argument) {
				this.assert(typeof(text) === 'string', argument, 'Argument is not a string.');
			},

			isLayer: function(layer, argument) {
				this.assert(layer && findLayer(layer.name), argument, 'Argument is not a layer or layer is not registered.');
			},

			isAnimation: function(animation, argument) {
				this.assert(typeof(animation) === 'object' && animation.isAnimation, 'Argument is not an animation.');
			},

			assert: function(result, argument, message) {
				assertions.push({
					result: result,
					argument: argument,
					message: message
				});
			}
		}
	}
}();










var createLayer = function(name) {
	if (check.isText(name, 'createLayer failed. Argument "name" is not a string.')) {
		writeToConsole('createLayer("'+name+'")');
	}

	return { name: name, isLayer: true };
};

var getLayerByName = function(name) {
	if (check.isText(name, 'getLayerByName failed. Argument "name" is not a string.')) {
		writeToConsole('getLayerByName("'+name+'")');
	}

	return { name: name, isLayer: true };	
}

var nestLayers = function(layer, child) {
	if (check.isLayer(layer, 'nestLayers failed. Argument "layer" is not a layer')
	 && check.isLayer(child, 'nestLayers failed. Argument "child" is not a layer'))
	{
		writeToConsole('nestLayers(\''+layer.name+'\', \''+child.name+'\')');
	}
};

var createMoveAnimation = function(layer) {
	if (check.isLayer(layer, 'createMoveAnimation failed. Argument "layer" is not a layer.')) {
		writeToConsole('createMoveAnimation(\''+layer.name+'\')');
	}

	return { type: 'move', isAnimation: true };
}


var Screen = {};

// utility methods
var check = {
	isText: function(text, message) {
		return check.validate(typeof(text) === 'string', message);
	},

	isLayer: function(layer, message) {
		return check.validate(typeof(layer) === 'object' && layer.isLayer, message);
	},

	isAnimation: function(animation, message) {
		return check.validate(typeof(animation) === 'object' && animation.isAnimation, message);
	},

	validate: function(result, message) {
		if (!result) {
			writeToConsole(message, true);
		}
		return result;
	}
};

// PRIVATE: ui management
var stats = {
	el: document.getElementById('target'),
	count: 1
};

// PRIVATE: dump the output
var writeToConsole = function(msg, fail) {
	var el = document.createElement('div');
	
	if (fail) {
		el.className = 'fail';
	}

	el.innerHTML = (stats.count++) + ' - ' + msg;

	stats.el.appendChild(el);
};