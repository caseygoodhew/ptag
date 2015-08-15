'use strict';
Pixate.Api = {
	getSelectedLayer: {
		returnType: 'Layer or null'
	},
	
	getSelectedLayers: {
		returnType: 'Layer[]'
	},
	
	getSelectedAnimations: {
		returnType: 'Animation[]'
	},
	
	getLayerByName: {
		parameterNames: ['name'],
		returnType: 'Layer or null'
	},
	
	getAllLayers: {
		returnType: 'Layer[]',
		returns: '[]'
	},
	
	getAssetByName: {
		parameterNames: ['name'],
		returnType: 'Asset or null'
	},

	createLayer: {
		debug: false,
		parameterNames: ['name'],
		returnType: 'Layer',
		returns: '{ name: name }'
	},

	setLayerConfig: {
		parameterNames: ['layer', 'config'],
		custom: function(layer, config) {
			layer = layer.result || layer;
			Pixate.apply(layer, config);
		}
	},

	nestLayers: {
		debug: false,
		parameterNames: ['target', 'source']
	},

	addAnimationCondition: {
		parameterNames: ['animation'],
		returnType: 'AnimationCondition'
	},

	createDragInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createTapInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createDoubleTapInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createLongPressInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createRotateInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createPinchInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createScrollInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	}
};
