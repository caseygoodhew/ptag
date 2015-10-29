'use strict';

Pixate.ApiTest.bundle({
	getAllLayers: [{
		name: 'returns array',
		test: function(Assert) {
			var layers = Pixate.getAllLayers();

			Assert.isNotNullOrUndefined(layers, 'Expected layer array');
			Assert.isTrue(Pixate.isArray(layers), 'Expected array');

			if (layers && !Pixate.isPixateStudio()) {
				Assert.areEqual(0, layers.length);
			}
		}
	}, {
		name: 'returns sane result',
		test: function(Assert) {
			var layerOne = Pixate.createLayer('test');
			var layerTwo = Pixate.createLayer('test');
			var layerThree = Pixate.createLayer('test-three');
			
			layerOne.layer = 'one';
			layerTwo.layer = 'two';
			layerThree.layer = 'three';

			var layers = Pixate.getAllLayers();

			Assert.isNotNullOrUndefined(layers, 'Expected layer array');
			Assert.isTrue(Pixate.isArray(layers), 'Expected array');

			if (layers) {
				var map = {};
				Pixate.each(layers, function(layer) {
					if (layer.layer) {
						map[layer.layer] = layer;
					}
				});

				Assert.isNotNullOrUndefined(map.one, 'Expected layerOne in map');
				Assert.isNotNullOrUndefined(map.two, 'Expected layerTwo in map');
				Assert.isNotNullOrUndefined(map.three, 'Expected layerThree in map');
				
				if (map.one && map.two && map.three) {
					Assert.areSame(layerOne, map.one, 'Expected map.one to be layerOne');
					Assert.areSame(layerTwo, map.two, 'Expected map.one to be layerTwo');
					Assert.areSame(layerThree, map.three, 'Expected map.one to be layerThree');
				} else {
					Assert.isTrue(false, 'Test not finisehd');
				}
			}
		}
	}]
});

