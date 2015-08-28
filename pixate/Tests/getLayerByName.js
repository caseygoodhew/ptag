Pixate.ApiTest.bundle({
	getLayerByName: [{
		name: 'returns null when layer does not exist',
		test: function(Assert) {
			var layer = Pixate.getLayerByName('dxfghgftyuhgfdsder56uikloiuytfde56yuikiuytrdfrtyui');
			Assert.isNull(layer, 'Expected null');
		}
	}, {
		name: 'returns null with no parameters',
		test: function(Assert) {
			var originalReturns = Pixate.Api.getLayerByName.returns;
			Pixate.Api.getLayerByName.returns = '{}';

			var layer = Pixate.getLayerByName();
			Assert.isNull(layer, 'Expected null');

			Pixate.Api.getLayerByName.returns = originalReturns;

		}
	}, {
		name: 'returns expected layer',
		test: function(Assert) {
			var layerOne = Pixate.createLayer('test-one');
			var layerTwo = Pixate.createLayer('test-two');

			Assert.isNotNullOrUndefined(layerOne, 'Expected layer (layerOne)');
			Assert.isNotNullOrUndefined(layerTwo, 'Expected layer (layerTwo)');

			var layer = Pixate.getLayerByName(layerOne.name);
			Assert.isNotNullOrUndefined(layer, 'Expected layer');

			Assert.areSame(layer, layerOne, 'Expected layer to be layerOne');

			layer = Pixate.getLayerByName(layerTwo.name);
			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			Assert.areSame(layer, layerTwo, 'Expected layer to be layerTwo');
		}
	}, {
		name: 'returns first layer of name',
		test: function(Assert) {
			var layerOne = Pixate.createLayer('test');
			var layerTwo = Pixate.createLayer('test');

			Assert.isNotNullOrUndefined(layerOne, 'Expected layer (layerOne)');
			Assert.isNotNullOrUndefined(layerTwo, 'Expected layer (layerTwo)');
			Assert.areEqual(layerOne, layerTwo, 'Expected layers to be equal');
			Assert.areNotSame(layerOne, layerTwo, 'Expected layers not to be the same');

			var layer = Pixate.getLayerByName(layerOne.name);
			Assert.isNotNullOrUndefined(layer, 'Expected layer (layer)');
			Assert.areSame(layerOne, layer, 'Expected layer to be layerOne');
			Assert.areNotSame(layerTwo, layer, 'Expected layer not to be layerTwo');
		}
	}]
});

	