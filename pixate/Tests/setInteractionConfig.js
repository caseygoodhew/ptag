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
			
			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');

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
			configTwo.direction = Pixate.DragDirection.vertical;
			
			Pixate.setInteractionConfig(interaction, configTwo);
			Assert.areEqual(configOne.direction, interaction.direction, 'Expected the direction to STILL be vertical');
			Assert.areEqual(configOne.min, interaction.min, 'Expected the min value to STILL be set');
			Assert.areEqual(configOne.minReferenceEdge, interaction.minReferenceEdge, 'Expected the minReferenceEdge to STILL be set');

			// Test that it doesn't set anything if we set a min value and the direction to free
			var configThree = {};
			configThree.direction = Pixate.DragDirection.free;
			configThree.min = 70;
			configThree.minReferenceEdge = Pixate.Edge.bottom;

			Pixate.setInteractionConfig(interaction, configThree);
			Assert.areEqual(configOne.direction, interaction.direction, 'Expected the direction to STILL be vertical');
			Assert.areEqual(configOne.min, interaction.min, 'Expected the min value to STILL be set');
			Assert.areEqual(configOne.minReferenceEdge, interaction.minReferenceEdge, 'Expected the minReferenceEdge to STILL be set');

			// Test that everything is cleared up when the direction is set to free
			var configFour = {};
			configFour.direction = Pixate.DragDirection.free;

			Pixate.setInteractionConfig(interaction, configFour);
			Assert.areEqual(configFour.direction, interaction.direction, 'Expected the direction to be free');
			Assert.isNullOrUndefined(interaction.min, 'Expected that the min value would not be set');
			Assert.areEqual(Pixate.Edge.left, interaction.minReferenceEdge, 'Expected that the minReferenceEdge would be reset');

		}
	}, {
		name: 'min accepts any number',
		test: function(Assert, context) {

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			interaction.direction = Pixate.DragDirection.vertical;

			Pixate.each([0, 10000, -10000, context.rand(1000000, -1000000), null, undefined, true, '10'], function(value) {

				if (typeof value === 'number') {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { min: value });

				Assert.areEqual(expectedValue, interaction.min, 'Expected ' + expectedValue + ', got ' + interaction.min)
			});
		}
	}, {
		name: 'max accepts any number',
		test: function(Assert, context) {

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			interaction.direction = Pixate.DragDirection.vertical;

			Pixate.each([0, 10000, -10000, context.rand(1000000, -1000000), null, undefined, true, '10'], function(value) {

				if (typeof value === 'number') {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { max: value });

				Assert.areEqual(expectedValue, interaction.max, 'Expected ' + expectedValue + ', got ' + interaction.max)
			});
		}
	}, {
		name: 'stretchMin accepts expected numbers',
		test: function(Assert, context) {

			var minValue = 0;
			var maxValue = 10;

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			interaction.direction = Pixate.DragDirection.vertical;

			Pixate.each([0, 10, 11, -1, 5, context.rand(1000000, -1000000), context.rand(10, 0), null, undefined, true, '5'], function(value) {

				if (typeof value === 'number' && value >= minValue && value <= maxValue) {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { stretchMin: value });

				Assert.areEqual(expectedValue, interaction.stretchMin, 'Expected ' + expectedValue + ', got ' + interaction.stretchMin)
			});
		}
	}, {
		name: 'stretchMax accepts expected numbers',
		test: function(Assert, context) {

			var minValue = 0;
			var maxValue = 10;

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			interaction.direction = Pixate.DragDirection.vertical;

			Pixate.each([0, 10, 11, -1, 5, context.rand(1000000, -1000000), context.rand(10, 0), null, undefined, true, '5'], function(value) {

				if (typeof value === 'number' && value >= minValue && value <= maxValue) {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { stretchMax: value });

				Assert.areEqual(expectedValue, interaction.stretchMax, 'Expected ' + expectedValue + ', got ' + interaction.stretchMax)
			});
		}
	}, {
		name: 'minReferenceEdge only accepts Edge enum values',
		test: function(Assert, context) {

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			interaction.direction = Pixate.DragDirection.vertical;

			var edges = [];
			for (var x in Pixate.Edge) {
				edges.push(Pixate.Edge[x]);
			}

			Pixate.each(edges.concat([null, undefined, 4, true, 'bob']), function(value) {

				if (Pixate.isEnumValue(Pixate.Edge, value)) {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { minReferenceEdge: value });

				Assert.areEqual(expectedValue, interaction.minReferenceEdge, 'Expected ' + expectedValue + ', got ' + interaction.minReferenceEdge)
			});
		}
	}, {
		name: 'maxReferenceEdge only accepts Edge enum values',
		test: function(Assert, context) {

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'drag');
			interaction.direction = Pixate.DragDirection.vertical;

			var edges = [];
			for (var x in Pixate.Edge) {
				edges.push(Pixate.Edge[x]);
			}

			Pixate.each(edges.concat([null, undefined, 4, true, 'bob']), function(value) {

				if (Pixate.isEnumValue(Pixate.Edge, value)) {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { maxReferenceEdge: value });

				Assert.areEqual(expectedValue, interaction.maxReferenceEdge, 'Expected ' + expectedValue + ', got ' + interaction.maxReferenceEdge)
			});
		}
	}, {
		name: 'paging only accepts PagingMode enum values',
		test: function(Assert, context) {

			var expectedValue;

			var interaction = Pixate.createInteraction(Pixate.createLayer('test'), 'scroll');
			
			var edges = [];
			for (var x in Pixate.PagingMode) {
				edges.push(Pixate.PagingMode[x]);
			}

			Pixate.each(edges.concat([null, undefined, 4, true, 'bob']), function(value) {

				if (Pixate.isEnumValue(Pixate.PagingMode, value)) {
					expectedValue = value;
				}

				Pixate.setInteractionConfig(interaction, { paging: value });

				Assert.areEqual(expectedValue, interaction.paging, 'Expected ' + expectedValue + ', got ' + interaction.paging)
			});
		}
	}]
});


	
