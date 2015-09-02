Pixate.ApiTest.bundle({
	getParentLayer: [{
		name: 'returns null when not nested',
		test: function(Assert) {
			var layer = Pixate.createLayer('test');
			var parent = Pixate.getParentLayer(layer);
			Assert.isNull(parent, 'Expected parent layer to be null');
		}
	}, {
		name: 'returns undefined when not a layer',
		test: function(Assert) {
			Assert.isUndefined(Pixate.getParentLayer(), 'Expected parent layer to be undefined (empty)');
			Assert.isUndefined(Pixate.getParentLayer(undefined), 'Expected parent layer to be undefined (undefined)');
			Assert.isUndefined(Pixate.getParentLayer(null), 'Expected parent layer to be undefined (null)');
			Assert.isUndefined(Pixate.getParentLayer('layer'), 'Expected parent layer to be undefined (string)');
			Assert.isUndefined(Pixate.getParentLayer({}), 'Expected parent layer to be undefined (object)');
		}
	}, {
		name: 'returns parent layer when nested',
		test: function(Assert) {
			var parent = Pixate.createLayer('parent');
			var child = Pixate.createLayer('child');
			Pixate.nestLayers(parent, child);
			
			var result = Pixate.getParentLayer(child);
			Assert.isNotNull(result, 'Expected result not to be null');
			Assert.areSame(parent, result, 'Expected to find parent layer');
		}
	}]
});

