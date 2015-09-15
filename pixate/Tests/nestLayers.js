'use strict';

Pixate.ApiTest.bundle({
	nestLayers: [{
		name: 'with one child layer succeeds',
		test: function(Assert) {
			var parent = Pixate.createLayer('parent');
			var child = Pixate.createLayer('child');
			
			Pixate.nestLayers(parent, child);

			Assert.areSame(parent, Pixate.getParentLayer(child), 'Expected parent layer');
		}
	}, {
		name: 'with two child layers succeeds',
		test: function(Assert) {
			var parent = Pixate.createLayer('parent');
			var childOne = Pixate.createLayer('child-one');
			var childTwo = Pixate.createLayer('child-two');
			
			Pixate.nestLayers(parent, childOne, childTwo);

			Assert.areSame(parent, Pixate.getParentLayer(childOne), 'Expected parent layer (one)');
			Assert.areSame(parent, Pixate.getParentLayer(childTwo), 'Expected parent layer (two)');
		}
	}, {
		name: 'with many child layers succeeds',
		test: function(Assert) {
			var parent = Pixate.createLayer('parent');
			var children = [
				Pixate.createLayer('child-one'), 
				Pixate.createLayer('child-two'),
				Pixate.createLayer('child-three'),
				Pixate.createLayer('child-four'),
				Pixate.createLayer('child-five'),
				Pixate.createLayer('child-six'),
				Pixate.createLayer('child-seven'),
				Pixate.createLayer('child-eight')
			];

			Pixate.nestLayers.apply(Pixate, [parent].concat(children));

			Pixate.each(children, function(child) {
				Assert.areSame(parent, Pixate.getParentLayer(child), 'Expected parent layer');
			});
		}
	}, {
		name: 'with no arguments doesn\'t fall over',
		test: function(Assert) {			
			Pixate.nestLayers();
		}
	}, {
		name: 'with only one layer doesn\'t fall over',
		test: function(Assert) {
			
			var layer = Pixate.createLayer('layer');
			
			Pixate.nestLayers(layer);
		}
	}, {
		name: 'with one invalid source does not nest any',
		test: function(Assert) {
			
			var parent = Pixate.createLayer('parent');
			var children = [
				Pixate.createLayer('child-one'), 
				Pixate.createLayer('child-two'),
				'invalid',
				Pixate.createLayer('child-three'),
				Pixate.createLayer('child-four'),
				Pixate.createLayer('child-five'),
				Pixate.createLayer('child-six'),
				Pixate.createLayer('child-seven'),
				Pixate.createLayer('child-eight')
			];

			Pixate.nestLayers.apply(Pixate, [parent].concat(children));

			Pixate.each(children, function(child) {
				if (typeof child === 'object') {
					Assert.isNull(Pixate.getParentLayer(child), 'Expected null');
				} else {
					Assert.isUndefined(Pixate.getParentLayer(child), 'Expected undefined');
				}
			});
		}
	}]
});
