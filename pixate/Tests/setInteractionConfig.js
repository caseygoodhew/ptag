'use strict';

Pixate.ApiTest.bundle({
	setInteractionConfig: [{
		context: {
			rand: function(max, min) { 
				max = max || 1000;
				min = min || 0;
				return Math.floor((Math.random() * max - min) + min + 1); 
			},

			generateRand: function(type, min, max) {
				switch (type) {
					case 'number':
						return this.rand(max, min);
					case 'Edge':
						switch (this.rand(6)) {
							case 1:
								return Pixate.Edge.top;
							case 2:
								return Pixate.Edge.centerY;
							case 3:
								return Pixate.Edge.bottom;
							case 4:
								return Pixate.Edge.left;
							case 5:
								return Pixate.Edge.centerX;
							case 6:
								return Pixate.Edge.right;
						}
					case 'DragDirection':
						switch (this.rand(2) + 1) {
							// this will be independantly tested as there are odd restrictions on free
							//case 1:
							//	return Pixate.DragDirection.free;
							case 2:
								return Pixate.DragDirection.horizontal;
							case 3:
								return Pixate.DragDirection.vertical;
						}
					case 'PagingMode':
						return this.rand()%2 ? Pixate.PagingMode.none : Pixate.PagingMode.paging;
				}

				return null;
			},

			createInteractions: function(layer) {
				return {
				    drag: Pixate.createDragInteraction(layer),
				    tap: Pixate.createTapInteraction(layer),
				    doubletap: Pixate.createDoubleTapInteraction(layer),
				    longpress: Pixate.createLongPressInteraction(layer),
				    rotate: Pixate.createRotateInteraction(layer),
				    pinch: Pixate.createPinchInteraction(layer),
				    scroll: Pixate.createScrollInteraction(layer)
				};
			}
		}
	}, {
		name: 'does not set unknown properties',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('layer');
			var interactions = context.createInteractions(layer);
			
			for (var x in interactions) {
				Pixate.setInteractionConfig(interactions[x], { test1: 'abc', test2: 4 });
			}

			var baselineLayer = Pixate.createLayer('baseline');
			var baselineInteractions = context.createInteractions(baselineLayer);

			for (var x in interactions) {
				Assert.areEqual(
					Pixate.exclude(baselineInteractions[x], ['id']), 
					Pixate.exclude(interactions[x], ['id']), 
					'Expected no change in interactions');
			}
		}
	}, {
		name: 'expected properties can be set',
		test: function(Assert, context) {
			
			// ARRANGE
			var configByType = { all: {} };

			for (var x in Pixate.Api.Properties.Interaction) {
				var property = Pixate.Api.Properties.Interaction[x];

				if (!property.readOnly) {
					var value = context.generateRand(property.type, property.min, property.max);
					
					if (property.forType) {
						
						Pixate.each(property.forType, function(interactionType) {
							configByType[interactionType] = configByType[interactionType] || {};
							configByType[interactionType][x] = value;
						});

					} else {
						configByType.all[x] = value;
					}
				}
			}

			// ACT
			var layer = Pixate.createLayer('layer');
			var interactions = context.createInteractions(layer);

			// fill the gaps
			for (var x in interactions) { 
				configByType[x] = Pixate.apply(configByType[x]||{}, configByType.all); 
			}

			for (var x in interactions) {
				
				Pixate.setInteractionConfig(interactions[x], configByType[x]);
				
				Assert.areEqual(
					configByType[x], 
					Pixate.exclude(interactions[x], ['id', 'type']), 
					'Expected interaction to match configByType ('+x+')');
			}
		}

	}, {
		name: 'cannot modify readOnly properties',
		test: function(Assert, context) {
			
			var config = { id: 44 };

			var layer = Pixate.createLayer('test');
			var interaction = Pixate.createInteraction(layer, 'tap');
			
			Pixate.setInteractionConfig(interaction, config);

			Assert.isTrue(Pixate.Api.Properties.Interaction.id.readOnly, 'Expected that id attribute is readOnly');
			Assert.areNotEqual(config.id, interaction.id, 'Expected that id would not equal config.id');
		}
	}, {
		name: 'DragDirection is set before min max stretchMin stretchMax',
		test: function(Assert, context) {
			
			// Test direction set on config after min
			var configOne = {};
			configOne.min = 10;
			configOne.direction = Pixate.DragDirection.horizontal;			
						
			Pixate.setInteractionConfig(interaction, configOne);
			Assert.areEqual(configOne.direction, interaction.direction, 'Expected the direction to be horizontal');
			Assert.areEqual(configOne.min, interaction.min, 'Expected the min value to be set');

			// Test direction set on config before min
			var configTwo = {};
			configTwo.direction = Pixate.DragDirection.vertical;
			configTwo.max = 10;

			Pixate.setInteractionConfig(interaction, configTwo);
			Assert.areEqual(configTwo.direction, interaction.direction, 'Expected the direction to be vertical');
			Assert.isNullOrUndefined(interaction.min, 'Expected that the min value would not be set');
			Assert.areEqual(configTwo.max, interaction.max, 'Expected the max value to be set');
		}
	}, {
		name: 'Attributes reset when DragDirection changes',
		test: function(Assert, context) {
	
			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			Assert.areEqual(Pixate.DragDirection.free, interaction.direction, 'Expected the direction to be DragDirection.free');
			Assert.areEqual(Pixate.Edge.left, interaction.minReferenceEdge, 'Expected the minReferenceEdge to be Edge.left');
			Assert.areEqual(Pixate.Edge.left, interaction.maxReferenceEdge, 'Expected the maxReferenceEdge to be Edge.left');

			// Test that the initial properties get set
			var configOne = {};
			configOne.direction = Pixate.DragDirection.vertical;
			configOne.min = 10;
			configOne.minReferenceEdge = Pixate.Edge.right;

			Pixate.setInteractionConfig(interaction, configOne);
			Assert.areEqual(configOne.direction, interaction.direction, 'Expected the direction to be vertical');
			Assert.areEqual(configOne.min, interaction.min, 'Expected the min value to be set');
			Assert.areEqual(configOne.minReferenceEdge, interaction.minReferenceEdge, 'Expected the minReferenceEdge to be set');

			// Test that it doesn't set anything if we set a min value and the direction to free
			var configTwo = {};
			configTwo.direction = Pixate.DragDirection.free;
			configTwo.min = 70;
			configTwo.minReferenceEdge = Pixate.Edge.bottom;

			Pixate.setInteractionConfig(interaction, configTwo);
			Assert.areEqual(configOne.direction, interaction.direction, 'Expected the direction to STILL be vertical');
			Assert.areEqual(configOne.min, interaction.min, 'Expected the min value to STILL be set');
			Assert.areEqual(configOne.minReferenceEdge, interaction.minReferenceEdge, 'Expected the minReferenceEdge to STILL be set');

			// Test that everything is cleared up when the direction is set to free
			var configThree = {};
			configThree.direction = Pixate.DragDirection.free;

			Pixate.setInteractionConfig(interaction, configThree);
			Assert.areEqual(configThree.direction, interaction.direction, 'Expected the direction to be free');
			Assert.isNullOrUndefined(interaction.min, 'Expected that the min value would not be set');
			Assert.areEqual(Pixate.Edge.left, interaction.minReferenceEdge, 'Expected that the minReferenceEdge would be reset');

		}
	} /*, {
		
		Interaction: {
			id: { type: 'string', readOnly: true },
			type: { type: 'string', readOnly: true },
			min: { type: 'number', forType: ['Pixate does not support this attribute even though its in the API docs'] },
			minReferenceEdge: { type: 'Edge', forType: ['drag'] },
			max: { type: 'number', forType: ['Pixate does not support this attribute even though its in the API docs'] },
			maxReferenceEdge: { type: 'Edge', forType: ['drag'] },
			stretchMin : { type: 'number', min: 0, max: 10, forType: ['Pixate does not support this attribute even though its in the API docs'] },
			stretchMax : { type: 'number', min: 0, max: 10, forType: ['Pixate does not support this attribute even though its in the API docs'] },
			direction: { type: 'DragDirection', forType: ['drag'] },
			paging: { type: 'PagingMode', forType: ['scroll'] }
		},







		name: 'only sets pixate properties',
		test: function(Assert, context) {
			
			var config = {};

			for (var x in Pixate.Api.Properties.Layer) {
				if (!Pixate.Api.Properties.Layer[x].readOnly) {
					config[x] = context.generateRand(Pixate.Api.Properties.Layer[x].type);
				}
			}

			config.backgroundColor = Pixate.Api.Colors.Named.Black;
			config.anyOther = 'value';

			var layer = Pixate.createLayer(config.name);

			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			
			Pixate.setLayerConfig(layer, config);

			var result = Pixate.getLayerByName(config.name);

			for (var x in Pixate.Api.Properties.Layer) {
				if (!Pixate.Api.Properties.Layer[x].readOnly) {
					Assert.areEqual(config[x], result[x], 'Attribute "'+x+'" is not equal');
				}
			}

			Assert.isUndefined(result.anyOther, 'Expected "anyOther" to be undefined');
		}
	}, {
		name: 'cannot modify readOnly properties',
		test: function(Assert, context) {
			
			var config = { id: 44 };

			var layer = Pixate.createLayer('test');

			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			
			Pixate.setLayerConfig(layer, config);

			var result = Pixate.getLayerByName(config.name);

			Assert.isTrue(Pixate.Api.Properties.Layer.id.readOnly, 'Expected that id attribute is readOnly');
			Assert.areNotEqual(config.id, layer.id, 'Expected that id would not equal config.id');
		}
	}, {
		name: 'name accepts expected values',
		test: function(Assert, context) {
			
			var layer = Pixate.createLayer('test');
			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			
			Pixate.setLayerConfig(layer, { name: undefined });
			Assert.areEqual('test', layer.name, 'Expected name to be unchanged (undefined)');

			Pixate.setLayerConfig(layer, { name: null });
			Assert.areEqual('test', layer.name, 'Expected name to be unchanged (null)');

			Pixate.setLayerConfig(layer, { name: '' });
			Assert.areEqual('test', layer.name, 'Expected name to be unchanged (empty string)');

			Pixate.setLayerConfig(layer, { name: true });
			Assert.areEqual('test', layer.name, 'Expected name to be unchanged (true)');

			Pixate.setLayerConfig(layer, { name: false });
			Assert.areEqual('test', layer.name, 'Expected name to be unchanged (false)');

			Pixate.setLayerConfig(layer, { name: ' ' });
			Assert.areEqual(' ', layer.name, 'Expected name to be set (one space)');

			var config = {};
			
			config.name = context.generateRand('number');
			Pixate.setLayerConfig(layer, config);
			Assert.areEqual(''+config.name, layer.name, 'Expected name to be set (number)');

			config.name = context.generateRand('string');
			Pixate.setLayerConfig(layer, config);
			Assert.areEqual(''+config.name, layer.name, 'Expected name to be set (string)');	
		}
	}, {
		name: 'backgroundColor accepts expected values',
		// this test will only run outside of Pixate Studio because PS always returns
		// the background color as rgb or rgba no matter what it's initially set as
		when: function() { return !Pixate.isPixateStudio(); },
		test: function(Assert, context) {
			
			var layer = Pixate.createLayer('test');
			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			
			var namedColors = []
			for (var x in Pixate.Api.Colors.Named) {
				if (typeof Pixate.Api.Colors.Named[x] === 'string') {
					var rand = Math.floor((Math.random() * 3) + 1);
					namedColors.push(rand === 1 ? x : rand === 2 ? x.toLowerCase() : x.toUpperCase());
				}
			}

			Assert.areNotEqual(0, namedColors.length, 'Expected namedColors to contain values');

			var config = {};

			Pixate.each(namedColors.concat([
				'#00ff00',
				'#FF00FF',
				'rgb(255, 128, 0)',
				'rgb(500, 500, 500)',
				'rgba(100, 100, 100, 0)',
				'rgba(100, 100, 100, 0.5)',
				'rgba(100, 100, 100, 1)',
				'hsl(255, 0.7, 90.4)',
				'hsl(255, 100, 0)',
				'hsla(255, 66.66, 0, 0.4)',
				'transparent',
				'TRANSPARENT',
			]), function(expression) {
				config.backgroundColor = expression;
				Pixate.setLayerConfig(layer, config);
				Assert.areEqual(config.backgroundColor, layer.backgroundColor, 'Expected backgroundColor to be set ('+config.backgroundColor+')');
			});

			Pixate.each([
				'#00gg00',
				'#FF00FF0',
				'rgc(255, 128, 0)',
				'rgb(100, 10, -100)',
				'rgba(100, 100, 100)',
				'rgba(100, 100, 100, -0.5)',
				'rgba(100, 100, 100, 1.1)',
				'hsl(255, 100.7, 90.4)',
				'hsl(255, -100, 0)',
				'hsla(255, 66.66, 0)',
				'hsla(255, 66.66, 0, 0.4, 0.1)',
				'transparen',
				'TRANSPARENTs',
			], function(expression) {
				config.backgroundColor = expression;
				Pixate.setLayerConfig(layer, config);
				Assert.areNotEqual(config.backgroundColor, layer.backgroundColor, 'Expected backgroundColor to remain unchanged ('+config.backgroundColor+')');
			});
		}
	}, {
		name: 'number attributes only accept numbers',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			Assert.isNotNullOrUndefined(layer, 'Expected layer');

			var testAttribute = function(attribute) {
				var config = {};
				
				config[attribute] = context.generateRand('boolean');
				Pixate.setLayerConfig(layer, config);
				Assert.areNotEqual(config[attribute], layer[attribute], 'Expected ' + attribute + ' to remain unchanged (boolean)');

				config[attribute] = context.generateRand('string');
				Pixate.setLayerConfig(layer, config);
				Assert.areNotEqual(config[attribute], layer[attribute], 'Expected ' + attribute + ' to remain unchanged (string)');

				config[attribute] = context.generateRand('number');
				Pixate.setLayerConfig(layer, config);
				Assert.areEqual(config[attribute], layer[attribute], 'Expected ' + attribute + ' to be set (number)');
			}

			for (var x in Pixate.Api.Properties.Layer) {
				if (!Pixate.Api.Properties.Layer[x].readOnly && Pixate.Api.Properties.Layer[x].type === 'number') {
					testAttribute(x);
				}
			}
		}
	}, {
		name: 'clipping only accepts valid ClippingType',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			Assert.isNotNullOrUndefined(layer, 'Expected layer');

			var config = {};

			config.clipping = Pixate.Api.Enums.ClippingType.none;
			Pixate.setLayerConfig(layer, config);
			Assert.areEqual(config.clipping, layer.clipping, 'Expected clipping to be set (ClippingType.none)');

			config.clipping = Pixate.Api.Enums.ClippingType.bounds;
			Pixate.setLayerConfig(layer, config);
			Assert.areEqual(config.clipping, layer.clipping, 'Expected clipping to be set (ClippingType.bounds)');

			config.clipping = context.generateRand('string');
			Pixate.setLayerConfig(layer, config);
			Assert.areNotEqual(config.clipping, layer.clipping, 'Expected clipping to remain unchanged (random string)');

			config.clipping = null;
			Pixate.setLayerConfig(layer, config);
			Assert.areNotEqual(config.clipping, layer.clipping, 'Expected clipping to remain unchanged (null)');
		}
	}*/]
});


	
