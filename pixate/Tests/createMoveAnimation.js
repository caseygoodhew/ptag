'use strict';

Pixate.ApiTest.bundle({
	createMoveAnimation: [{
		name: 'without layer does not create animation',
		test: function(Assert) {
			var animation = Pixate.createMoveAnimation(null, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'without config does not create animation',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer);

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'without basedOn does not create animation',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx -> this should be failing because the interaction has not been created',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer, { basedOn: { source: layer, event: 'tap' }});

			Assert.isNotNullOrUndefined(animation, 'Expected animation to be created');
		}
	}]
});
