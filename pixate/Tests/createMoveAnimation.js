'use strict';

Pixate.ApiTest.bundle({
	createMoveAnimation: [{
		name: 'creates animation',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');

			var interaction = Pixate.createTapInteraction(layer);

			Assert.isNotNullOrUndefined(interaction, 'Expected interaction to exist');

			var animation = Pixate.createMoveAnimation(layer, Pixate.basedOn(layer, 'tap'));

			Assert.isNotNullOrUndefined(animation, 'Expected animation to exist');
		}
	}, {
		name: 'does not create animation without layer',
		test: function(Assert) {
			var animation = Pixate.createMoveAnimation(null, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'does not create animation without config',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer);

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'does not create animation without basedOn',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'does not create animation without interaction',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createMoveAnimation(layer, Pixate.basedOn(layer, 'tap'));

			Assert.isNullOrUndefined(animation, 'Expected animation to be created');
		}
	}]
});
