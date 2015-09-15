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
		returns: '{ _id: Pixate.id(), name: name, interactions: {}, animations: [] }',
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
		returns: ['(function() { ',
		'	if (!layer.interactions.drag) { ',
		'		layer.interactions.drag = { ',
		'			type: Pixate.Api.Types.Interaction.Drag.type,  ',
		'			id: Pixate.id(), ',
		'			direction: Pixate.DragDirection.free, ',
		'			minReferenceEdge: Pixate.Edge.left, ',
		'			maxReferenceEdge: Pixate.Edge.left ',
		'		}; ',
		'		layer.animations.push(Pixate.apply({ basedOn: "drag" }, Pixate.Api.Types.Interaction.Drag.events.position.defaultAnimation)); ',
		'	} ',
		'	return layer.interactions.drag; ',
		'})()'].join('')
	},

	createTapInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction',
		returns: 'layer.interactions.tap = layer.interactions.tap || { type: Pixate.Api.Types.Interaction.Tap.type, id: Pixate.id() }'
	},

	createDoubleTapInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction',
		returns: 'layer.interactions.doubletap = layer.interactions.doubletap || { type: Pixate.Api.Types.Interaction.DoubleTap.type, id: Pixate.id() }'
	},

	createLongPressInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction',
		returns: 'layer.interactions.longpress = layer.interactions.longpress || { type: Pixate.Api.Types.Interaction.LongPress.type, id: Pixate.id() }'
	},

	createRotateInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction',
		returns: ['(function() { ',
		'	if (!layer.interactions.rotate) { ',
		'		layer.interactions.rotate = { type: Pixate.Api.Types.Interaction.Rotate.type, id: Pixate.id() }; ',
		'		layer.animations.push(Pixate.apply({ basedOn: "rotate" }, Pixate.Api.Types.Interaction.Rotate.events.rotate.defaultAnimation)); ',
		'	} ',
		'	return layer.interactions.rotate; ',
		'})()'].join('')
	},

	createPinchInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction',
		returns: ['(function() { ',
		'	if (!layer.interactions.pinch) { ',
		'		layer.interactions.pinch = { type: Pixate.Api.Types.Interaction.Pinch.type, id: Pixate.id() }; ',
		'		layer.animations.push(Pixate.apply({ basedOn: "pinch" }, Pixate.Api.Types.Interaction.Pinch.events.pinch.defaultAnimation)); ',
		'	} ',
		'	return layer.interactions.pinch; ',
		'})()'].join('')
	},

	createScrollInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction',
		returns: ['(function() { ',
		'	if (!layer.interactions.scroll) { ',
		'		layer.interactions.scroll = { type: Pixate.Api.Types.Interaction.Scroll.type, id: Pixate.id() }; ',
		'		layer.animations.push(Pixate.apply({ basedOn: "scroll" }, Pixate.Api.Types.Interaction.Scroll.events.postion.defaultAnimation)); ',
		'	} ',
		'	return layer.interactions.scroll; ',
		'})()'].join('')
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
			
			var validAttributes = [];
			for (var x in Pixate.Api.Properties.Layer) {
				if (!Pixate.Api.Properties.Layer[x].readOnly) {
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
			var interaction = Pixate.resolveInteractionType(type);

			if (!interaction || !Pixate[interaction.handler]) {
				return;
			}

			return Pixate[interaction.handler].call(Pixate, layer);
		}
	},

	setInteractionConfig: {
		parameterNames: ['interaction', 'config'],
		custom: function(interaction, config) {
			
			var validAttributes = [];
			for (var x in Pixate.Api.Properties.Interaction) {
				
				var property = Pixate.Api.Properties.Interaction[x];

				var isValid = !property.readOnly;

				if (isValid && property.forType) {
					isValid = Pixate.contains(property.forType, interaction.type);
				}

				if (isValid) {
					validAttributes.push(x);
				}
			}

			config = Pixate.include(config, validAttributes);

			for (var x in config) {
				var property = Pixate.Api.Properties.Interaction[x];

				if (property.type === 'string') {
					config[x] = ''+config[x];
				}
			}

			// Pixate has an order of operations limitation on min/max/stretchMin/stretchMax 
			// where they only apply to horizontal and vertical DragDirections.
			// If the DragDirection is set to free when setting one of these values, an error is generated
			if (interaction.direction !== config.direction) {
				interaction.direction = config.direction;
				// only clean up when we're not using pixate studio to emulate it's behaviour 
				// if they ever fix this, unit testing should start failing
				if (!Pixate.isPixateStudio()) {
					delete interaction.min;
					delete interaction.max;
					delete interaction.stretchMin;
					delete interaction.stretchMax;
					interaction.minReferenceEdge = Pixate.Edge.left;
					interaction.maxReferenceEdge = Pixate.Edge.left;
				}
			}

			Pixate.apply(interaction, config);
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


