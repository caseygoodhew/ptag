'use strict';

Pixate.ApiTest.bundle({
	createMoveAnimation: [{
		name: 'without basedOn does not create animation',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}]
});
