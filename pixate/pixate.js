var Pixate = function(executor) {
	
	var api = {
		getSelectedLayer: {
			returns: 'Layer or null',
			notSupported: true
		},
		
		getSelectedLayers: {
			returns: 'Layer[]',
			notSupported: true
		},
		
		getSelectedAnimations: {
			returns: 'Animation[]',
			notSupported: true
		},
		
		getLayerByName: {
			parameterNames: ['name'],
			returns: 'Layer or null',
			notSupported: true
		},
		
		getAllLayers: {
			returns: 'Layer[]',
			notSupported: true
		},
		
		getAssetByName: {
			parameterNames: ['name'],
			returns: 'Asset or null',
			notSupported: true
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
		},

		createDragInteraction: {
			parameterNames: ['layer'],
			returns: 'Interaction'
		},

		createTapInteraction: {
			parameterNames: ['layer'],
			returns: 'Interaction'
		},

		createDoubleTapInteraction: {
			parameterNames: ['layer'],
			returns: 'Interaction'
		},

		createLongPressInteraction: {
			parameterNames: ['layer'],
			returns: 'Interaction'
		},

		createRotateInteraction: {
			parameterNames: ['layer'],
			returns: 'Interaction'
		},

		createPinchInteraction: {
			parameterNames: ['layer'],
			returns: 'Interaction'
		},

		createScrollInteraction{
			parameterNames: ['layer'],
			returns: 'Interaction'
		}
	};

	enableDiagnostics = !!enableDiagnostics;

	var assertions = [];
	var commands = [];
	var layers = [];

	var registerCommand = function(command, arguments) {
		commands.push({
			command: command,
			arguments: arguments || [],
			assertions: assertions || []
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

	var addLayer = function(name) {
		if (typeof nameOrLayer === 'string'){
			layer = { name: name };
		} else {
			Pixate.Assert.assert(false, 'name', 'Argument is not type string');
		}

		layers.push({
			layer: layer;
		});

		return layer;
	}

	return {
		
		createLayer: function(name, config) {
			Pixate.Assert.isText(name, 'name');

			var layer = addLayer(name);

			registerCommand('createLayer', [name]);
			
			if (config) {
				registerCommand('setLayerConfig', [layer, config]);
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
		},

		Executor: {
			logger: function(commands) {
				
				var logCommand = function() {

				}


				for (var i = 0; i < commands.length; i++) {

				}
			}
		}
	}
};

Pixate.Executor.Logger = function(config) {

	var targetEl = document.getElementById(config.targetId);
	var count = 1;

	return {
		execute: function(commands, api) {
			for (var i = 0; i < commands.length; i++) {
				var command = commands[i];

				var commandBlockTarget = document.createElement('div');
				commandBlockTarget.className = 'command-block';
				targetEl.appendChild(commandBlockTarget);

				var markup = [];
				markup.push('<div class="command">');
					
					markup.push('<span class="command-name">' + command.command + '</span>');
					markup.push('<span class="command-bracket">(</span>');
					
					var argumentsMarkup = [];
					for (var j = 0; j < (api[command.command].parameterNames||[]), j++) {
						argumentsMarkup.join('<span class="command-argument">'+api[command.command].parameterNames[j]+'</span>');
					}
					
					markup.push(argumentsMarkup.join('<span class="command-comma">, </span>');
					markup.push('<span class="command-bracket">)</span>');

					markup.push('<span class="command-comment"> // ');

						var argumentsMarkup = [];
						for (var j = 0; j < (command.arguments||[]), j++) {
							argumentsMarkup.join('<span class="command-argument">'+command.arguments[j]+'</span>');
						}
					
					markup.push('</span>');					

				markup.push('</div>')

				markup.push('<div class="assertions">');

					var hasFailure = false;

					for (var j = 0; j < (command.assertions||[]), j++) {
						var assertion = command.assertions[j];
						hasFailure = hasFailure || !assertion.result;
						
						markup.push('<div class="assertion' + assertions.result ? '' : ' fail' + '">');
							markup.push('<span class="assertion-argument">' + assertion.argument + '</span>');
							markup.push('<span class="assertion-spacing"> - </span>');
							markup.push('<span class="assertion-message">' + assertion.result ? 'OK' : assertion.message + '</span>');
						markup.push('</div>')
					}

				commandBlockTarget.innerHTML = markup.join(' ');
			}
		}

	};
}


/*
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
*/