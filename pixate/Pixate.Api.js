
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
