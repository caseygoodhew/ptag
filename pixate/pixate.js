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
		
		getSelectedLayer: function() {
			var layer = executeCommand('getSelectedLayer', []);
			
			if (layer) {
				Pixate.Assets.registerLayer(layer);
			}

		    return layer;
		},

		getSelectedLayers: function() {
			var layers = executeCommand('getSelectedLayers', []);

			Pixate.each(layers, function(layer) {
				Pixate.Assets.registerLayer(layer);
			});

			return layers;
		},

		getSelectedAnimations: function() {
		    return executeCommand('getSelectedAnimations', []);
		},

		getLayerByName: function(name) {
		    Pixate.Assert.isText(name, 'name');

		    var layer = executeCommand('getLayerByName', [name]);
		    if (layer) {
		    	Pixate.Assets.registerLayer(layer);
		    }

		    return layer;
		},

		getAllLayers: function() {
		    return executeCommand('getAllLayers', []);
		},

		getAssetByName: function(name) {
		    Pixate.Assert.isText(name, 'name');

		    return executeCommand('getAssetByName', [name]);
		},

		createLayer: function(name, config) {
			Pixate.Assert.isText(name, 'name');

			var layer = executeCommand('createLayer', [name]);
			
			Pixate.Assets.registerLayer(layer);

			if (config) {
				setLayerConfig(layer, config);
			}

			return layer;
		},

		setLayerConfig: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');
		    Pixate.Assert.isConfig(Pixate.Properties.Layer, config, 'config');

		    executeCommand('setLayerConfig', [layer, config]);
		},

		nestLayers: function(target, source) {
			Pixate.Assert.isLayer(target, 'target');
			Pixate.Assert.isLayer(source, 'source');

			executeCommand('nestLayers', [target, source]);
		},

		addAnimationCondition: function(animation) {
		    Pixate.Assert.isAnimation(animation, 'animation');

		    return executeCommand('addAnimationCondition', [animation]);
		},

		createDragInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createDragInteraction', [layer]);
		},

		createTapInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createTapInteraction', [layer]);
		},

		createDoubleTapInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createDoubleTapInteraction', [layer]);
		},

		createLongPressInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createLongPressInteraction', [layer]);
		},

		createRotateInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createRotateInteraction', [layer]);
		},

		createPinchInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createPinchInteraction', [layer]);
		},

		createScrollInteraction: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createScrollInteraction', [layer]);
		},

		createMoveAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');
		    Pixate.Assert.hasAttributes(config, 'config', ['animates', 'basedOn']);

		    return executeCommand('createMoveAnimation', [layer]);
		},

		createRotateAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');
		    Pixate.Assert.hasAttributes(config, 'config', ['animates', 'basedOn']);

		    return executeCommand('createRotateAnimation', [layer]);
		},

		createScaleAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');
		    Pixate.Assert.hasAttributes(config, 'config', ['animates', 'basedOn']);

		    return executeCommand('createScaleAnimation', [layer]);
		},

		createFadeAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');
		    Pixate.Assert.hasAttributes(config, 'config', ['animates', 'basedOn']);

		    return executeCommand('createFadeAnimation', [layer]);
		},

		createColorAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');
		    Pixate.Assert.hasAttributes(config, 'config', ['animates', 'basedOn']);

		    return executeCommand('createColorAnimation', [layer]);
		},

		createImageAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createImageAnimation', [layer]);
		},

		createReorderAnimation: function(layer, config) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    return executeCommand('createReorderAnimation', [layer]);
		},

		// tested
		selectLayer: function(layer) {
		    Pixate.Assert.isLayer(layer, 'layer');

		    Pixate.Assets.setSelectedLayer(layer);

		    executeCommand('selectLayer', [layer]);
		},

		clearLayerSelection: function() {
		    executeCommand('clearLayerSelection', []);
		}
	}
}();



