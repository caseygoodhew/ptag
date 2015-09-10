Pixate.ApiTest.bundle({
	setInteractionConfig: [{
		context: {
			rand: function() { 
				return Math.floor((Math.random() * 1000) + 1); 
			},

			generateRand: function(type) {
				switch (type) {
					case 'string':
						return this.rand()+'-'+this.rand()+'-'+this.rand();
					case 'number':
						return this.rand();
					case 'boolean':
						return this.rand()%2 === 0;
					case 'Asset':
						return {};
					case 'ClippingType':
						return this.rand()%2 ? Pixate.ClippingType.none : Pixate.ClippingType.bounds;
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
				Assert.areEqual(Pixate.exclude(baselineInteractions[x], ['id']), Pixate.exclude(interactions[x], ['id']), 'Expected no change in interactions');
			}

			Assert.isTrue(false, 'NEEDS MORE TESTS BELOW (this one works fine if you remove this line)');

		}
	}/*, {
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


	
