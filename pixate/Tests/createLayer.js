Pixate.ApiTest.bundle({
	createLayer: [{
		name: 'with no parameters fails',
		test: function(Assert) {
			var layer = Pixate.createLayer();
			Assert.isUndefined(layer, 'Expected undefined');
		}
	}, {
		name: 'with string succeeds',
		test: function(Assert) {
			
			var expected = { name: 'create layer testX' };
			var layer = Pixate.exclude(Pixate.createLayer(expected.name), ['_id', 'parentId']);
			Assert.areEqual(expected, layer, 'Expected layer object with name set');
		}
	}, {
		name: 'with Layer fails',
		test: function(Assert) {
			
			var firstLayer = Pixate.createLayer('create layer test');
			var result = Pixate.createLayer(firstLayer);
			
			Assert.isUndefined(result, 'Expected createLayer to fail');
		},
	}]
});
