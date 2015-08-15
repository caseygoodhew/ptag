'use strict';
var Pixate = function() {
	
	var executeCommand = function(command, args) {
		var command = {
			command: command,
			arguments: args || [],
			assertions: Pixate.Assert.getAssertions(true) || []
		};

		command.result = Pixate.getExecutor().executeOne(command);

		return command.result;
	};

	return {
		
		setLoader: function(loader) {

		},

		createLayer: function(name, config) {
			Pixate.Assert.isText(name, 'name');

			Pixate.Assets.registerLayer(name);

			var result = executeCommand('createLayer', [name]);
			
			if (typeof(config) === 'object') {
				executeCommand('setLayerConfig', [result, config]);
			}

			return result;
		},

		nestLayers: function(target, source) {
			Pixate.Assert.isLayer(target, 'target');
			Pixate.Assert.isLayer(source, 'source');

			return executeCommand('nestLayers', [target, source]);
		},

		addAnimationCondition: function(animation) {
			Pixate.Assert.isAnimation(animation, 'animation');

			return executeCommand('addAnimationCondition', [animation]);
		}
	}
}();



