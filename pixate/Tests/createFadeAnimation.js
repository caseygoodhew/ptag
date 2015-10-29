'use strict';

Pixate.ApiTest.bundle({
	createFadeAnimation: [{
		name: 'creates animation',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');

			var interaction = Pixate.createTapInteraction(layer);

			Assert.isNotNullOrUndefined(interaction, 'Expected interaction to exist');

			var animation = Pixate.createFadeAnimation(layer, Pixate.basedOn(layer, 'tap'));

			if (Assert.isNotNullOrUndefined(animation, 'Expected animation to exist')) {

				if (Assert.areEqual(1, layer.animations.length, 'Expected layer.animations to contain one animation')) {
					Assert.areSame(layer.animations[0], animation, 'Expected layer.animations to contain animation')
				}

				Assert.isNotNullOrUndefined(animation.id, 'Expected id to be set');
				Assert.areEqual(Pixate.Api.Types.Animation.Fade.type, animation.type, 'Unexpected animation type "'+animation.type+'"');
				Assert.areEqual(Pixate.Api.Types.Animation.Fade.defaultName, animation.name, 'Unexpected animation name "'+animation.name+'"');
				Assert.areEqual(Pixate.AnimationMode.withDuration, animation.animates, 'Unexpected animation mode "'+animation.animates+'"');
				Assert.isTrue(Pixate.isArray(animation.conditions), 'Expected conditions to be an array');
			}
		}
	}, {
		name: 'does not create animation without layer',
		test: function(Assert) {
			var animation = Pixate.createFadeAnimation(null, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'does not create animation without config',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createFadeAnimation(layer);

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'does not create animation without basedOn',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createFadeAnimation(layer, { });

			Assert.isNullOrUndefined(animation, 'Expected animation to be null or undefined');
		}
	}, {
		name: 'does not create animation without interaction',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var animation = Pixate.createFadeAnimation(layer, Pixate.basedOn(layer, 'tap'));

			Assert.isNullOrUndefined(animation, 'Expected animation to be created');
		}
	}]
});
