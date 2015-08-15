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





'use strict';
Pixate.apply = function(target, source) {
	
	for (var x in source) {
		target[x] = source[x];
	}

	return target;
};

Pixate.apply(Pixate, {
	
	isArray: function(object) {
		return Object.prototype.toString.call(object) === '[object Array]';
	},

	exclude: function(source, paramExclude) {

		var exclude = {};

		for (var i = 1; i < arguments.length; i++) {
			exclude[arguments[i]] = true;
		}

		var result = {};

		for (var x in source) {
			if (!exclude[x]) {
				result[x] = source[x];
			}
		}

		return result;
	},

	each: function(array, fn, scope) {
		
		array = array == null ? [] : Pixate.isArray(array) ? array : [array];

		for (var i = 0; i < array.length; i++) {
			fn.call(scope||array, array[i], i);
		}
	},

	getExecutor: function() {
		if (!this.executor) {
			
			var isPixateStudio = false;
			try 
			{
				isPixateStudio = !!eval('createLayer');
			}
			catch (exception) {}

			this.executor = isPixateStudio ? Pixate.Executor.Immediate : Pixate.Executor.Logger;
		}

		return this.executor;
	},

	setExecutor: function(executor) {
		switch (executor) {
			case Pixate.Executor.Logger:
			case 'logger':
				this.executor = Pixate.Executor.Logger;
				break;
			
			case Pixate.Executor.Immediate:
			case 'immediate':
				this.executor = Pixate.Executor.Immediate;
				break;
			
			default:
				this.executor = null;
		}
	}
});




Pixate.Api = {
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
		custom: function(layer, config) {
			layer = layer.result || layer;
			Pixate.apply(layer, config);
		}
	},

	nestLayers: {
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

	createScrollInteraction: {
		parameterNames: ['layer'],
		returns: 'Interaction'
	}
};


'use strict';
Pixate.Assert = function() {
	
	var assertions = [];

	return {

		getAssertions: function(purge) {
			var result = [];
			Pixate.each(assertions, function(o) { result.push(o); });

			if (purge) {
				assertions = [];
			}

			return result;
		},

		isText: function(text, argument) {
			this.assert(typeof(text) === 'string', argument, 'Argument is not a string.');
		},

		isLayer: function(layer, argument) {
			this.assert(Pixate.Assets.isLayer(layer), argument, 'Argument is not a layer or layer is not registered.');
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
}();

Pixate.Assets = function() {

	var layers = [];

	return {
		
		isLayer: function(layer) {
			if (typeof(layer) != 'object') {
				return false;
			}

			layer = layer.layer || layer;

			return !!this.findLayer(layer.name);
		},

		getLayerName: function(layer) {
			if (typeof(layer) != 'object') {
				return null;
			}

			layer = layer.layer || layer;

			return layer.name;
		},

		findLayer: function(name) {
			
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].layer.name === name) {
					return layers[i];
				}
			}

			return null;
		},

		registerLayer: function(nameOrLayer) {
			
			var layer;

			if (typeof nameOrLayer === 'string'){
				layer = { name: nameOrLayer };
			} else {
				Pixate.Assert.assert(false, 'name', 'Argument is not type string');
			}

			layers.push({
				layer: layer
			});

			return layer;
		}
	}
}();

'use strict';
Pixate.Executor = Pixate.Executor || {};

Pixate.Executor.Immediate = function(config) {
	return {
		executeMany: function(commands) {
			Pixate.each(commands, function(command) {
				command.result = this.executeOne(command);
			}, this);
		},

		executeOne: function(command) {
			var func = Pixate.Api[command.command].custom || eval(command.command);
			command.result = func.apply(this, command.arguments);
			return command.result;
		}
	}
}();


'use strict';
Pixate.Loader = function() {
	
	var Screen = {};

	var loadLayer = function(config) {
		var layer = Pixate.createLayer(config.name, Pixate.exclude(config, 'animation', 'children', 'name'));

		Pixate.each(config.children, function(child) {
			Pixate.nestLayers(layer, loadLayer(child));
		});

		Pixate.each(config.animation, function(animation) {
			applyAnimation(layer, animation);
		});

		return layer;
	};

	var applyAnimation = function(layer, config) {
		
		/*
		var animation;

		switch (config.type) {
			case 'move':
				animation = Pixate.createMoveAnimation(layer);
				break;
		}

		var referenceLayer = (config.basedOn.layer === 'screen') ? Screen : getLayerByName(config.basedOn.layer);
		animation.basedOn = referenceLayer[config.basedOn.interaction];
		animation.animates = config.animates || AnimationMode.withDuration;

		pTag.apply(animation, config, 'basedOn', 'type');
		*/
	};
	
	return {
		load: function(config) {
			Pixate.each(config, loadLayer);
		}
	}
}();



/***************************************************************************************
 * 
 ***************************************************************************************/

Pixate.Loader.load({
	name: 'Flags',
	x: -400,
	y: -300,
	width: 50,
	height: 100,
	backgroundColor: 'red',
	children: [{
	    name: 'show mini fab',
	    width: 50,
	    height: 10,
	    backgroundColor: 'rgb(255, 255, 255)',
	    animation: [{
	        type: 'move',
	        name: 'Initial Move with Delay',
	        duration: 0,
	        delay: 5,
	        basedOn: { layer: 'screen', interaction: 'loaded' },
	        toX: 1
	    }]
	}]
});




