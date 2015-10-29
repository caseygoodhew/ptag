'use strict';

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
			
			var name = 'create layer test';
			var layer = Pixate.createLayer(name);
			Assert.areEqual(name, layer.name, 'Expected object with name attribute');
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
