Pixate.ApiTest.bundle({
	setLayerConfig: [{
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
			}
		}
	}, {
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
				var rand = Math.floor((Math.random() * 10) + 1);
				if (rand === 1) {
					rand = Math.floor((Math.random() * 3) + 1);
					namedColors.push(rand === 1 ? x : rand === 2 ? x.toLowerCase() : x.toUpperCase());
				}
			}

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
	}]
});


	
