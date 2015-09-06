'use strict';

Pixate.Api = {
	getSelectedLayer: {
		debug: false,
		returnType: 'Layer or null',
		returns: 'null'
	},
	
	getSelectedLayers: {
		debug: false,
		returnType: 'Layer[]',
		returns: '[]'
	},
	
	getSelectedAnimations: {
		returnType: 'Animation[]'
	},
	
	getLayerByName: {
		debug: false,
		parameterNames: ['name'],
		returnType: 'Layer or null',
		returns: 'null'
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
		returns: '{ _id: Pixate.id(), name: name, interactions: {} }',
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
		returnType: 'Interaction',
		returns: 'layer.interactions.drag = layer.interactions.drag || { type: Pixate.Api.Types.Interaction.Drag.type }'
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
	},

	createMoveAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createRotateAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createScaleAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createFadeAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createColorAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createImageAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createReorderAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	selectLayer: {
		debug: false,
		parameterNames: ['layer'],
		custom: function(layer) {
			if (Pixate.isPixateStudio()) {
				Pixate.Editor.selectLayer();
			} else {
				Pixate.Assets.setSelectedLayer(layer);
			}
		}
	},

	clearLayerSelection: { 
		custom: function() {
			if (Pixate.isPixateStudio()) {
				Pixate.Editor.clearLayerSelection();
			} else {
				Pixate.Assets.setSelectedLayer();
			}
		}
	},

	setLayerConfig: {
		parameterNames: ['layer', 'config'],
		custom: function(layer, config) {
			//layer = layer.result || layer;
			
			var validAttributes = [];
			for (var x in Pixate.Api.Properties.Layer) {
				if (!Pixate.Api.Properties.Layer.readOnly) {
					validAttributes.push(x);
				}
			}

			config = Pixate.include(config, validAttributes);

			for (var x in config) {
				if (Pixate.Api.Properties.Layer[x].type === 'string') {
					config[x] = ''+config[x];
				}
			}

			Pixate.apply(layer, config);
		}
	},

	getParentLayer: {
		parameterNames: ['layer'],
		returnType: 'Layer or null',
		custom: function(layer) {
			
			if (!layer || !layer.parentId) {
				return null;
			}

			return Pixate.each(Pixate.getAllLayers(), function(o) {
				if (o._id === layer.parentId) {
					return o;
				}
			}) || null;
		}
	},

	createInteraction: {
		parameterNames: ['layer', 'type'],
		custom: function(layer, type) {
			if (!type || !Pixate[type.handler]) {
				return;
			}

			return Pixate[type.handler].call(Pixate, layer);
		}
	}
};


try
{
	Pixate.Screen = Screen;
}
catch (ex)
{
	Pixate.Screen = {
		width: 200,
		height: 400,
		centerX: 100,
		centerY: 200,
		density: 2
	};
}

try
{
	Pixate.Editor = Editor;
}
catch (ex)
{
	Pixate.Editor = {
		selectLayer: function(layer) {
			Pixate.Assets.setSelectedLayer(layer);
		},

		clearLayerSelection: function() {
			Pixate.Assets.setSelectedLayer();
		}
	};
}


