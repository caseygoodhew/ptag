'use strict';

Pixate.ApiTest.bundle({
	setAnimationConfig: [{

		context: {
			rand: function(max, min) { 
				max = max || 1000;
				min = min || 0;
				return Math.floor((Math.random() * max - min) + min + 1); 
			},

			generateRand: function(type, min, max) {
				switch (type) {
					case 'number':
						return this.rand(max, min);
					case 'Edge':
						switch (this.rand(6)) {
							case 1:
								return Pixate.Edge.top;
							case 2:
								return Pixate.Edge.centerY;
							case 3:
								return Pixate.Edge.bottom;
							case 4:
								return Pixate.Edge.left;
							case 5:
								return Pixate.Edge.centerX;
							case 6:
								return Pixate.Edge.right;
						}
					case 'DragDirection':
						switch (this.rand(2) + 1) {
							// this will be independantly tested as there are odd restrictions on free
							//case 1:
							//	return Pixate.DragDirection.free;
							case 2:
								return Pixate.DragDirection.horizontal;
							case 3:
								return Pixate.DragDirection.vertical;
						}
					case 'PagingMode':
						return this.rand()%2 ? Pixate.PagingMode.none : Pixate.PagingMode.paging;
				}

				return null;
			},

			createAnimations: function(layer) {
				Pixate.createTapInteraction(layer);

				return {
				    move: Pixate.createMoveAnimation(layer, Pixate.basedOn(layer, 'tap')),
				    rotate: Pixate.createRotateAnimation(layer, Pixate.basedOn(layer, 'tap')),
				    scale: Pixate.createScaleAnimation(layer, Pixate.basedOn(layer, 'tap')),
				    fade: Pixate.createFadeAnimation(layer, Pixate.basedOn(layer, 'tap')),
				    color: Pixate.createColorAnimation(layer, Pixate.basedOn(layer, 'tap')),
				    image: Pixate.createImageAnimation(layer, Pixate.basedOn(layer, 'tap')),
				    reorder: Pixate.createReorderAnimation(layer, Pixate.basedOn(layer, 'tap'))
				};
			},

			each: function(animations, handler, scope) {
				var types = [];
				
				for (var x in Pixate.Api.Types.Animation) {
					types.push(Pixate.Api.Types.Animation[x].type);
				}

				return Pixate.each(types, function(type) {
					handler.call(scope||this, animations[type], type);
				});
			},

			assertSettable: function(Assert, animation, attribute, values) {
				
				var config = {};
					
				Pixate.each(values, function(value) {
					
					config[attribute] = value;
					
					Pixate.setAnimationConfig(animation, config);
					Assert.areSame(value, animation[attribute], 'Expected '+attribute+' to be changed ('+value+')');
				});
			},

			assertNotSettable: function(Assert, animation, attribute, values) {
				
				var originalValue = animation[attribute];
				var config = {};
					
				Pixate.each(values, function(value) {
									
					config[attribute] = value;
					
					Pixate.setAnimationConfig(animation, config);
					Assert.areSame(originalValue, animation[attribute], 'Expected '+attribute+' to be unchanged ('+value+')');
				});
			}
		}
	}, {
		name: 'verify createAnimations',
		test: function(Assert, context) {
			
			var layer = Pixate.createLayer('test');
			var result = context.createAnimations(layer);

			context.each(result, function(animation, type) {
				if (Assert.isNotNullOrUndefined(animation, 'Expected '+type+' animation to exist')) {
					Assert.areEqual(type, animation.type, 'Inconsistent animation type for '+type);
				}	
			});
		}
	}, {
		name: 'cannot set id',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			var result = context.createAnimations(layer);

			context.each(result, function(animation) {
				Assert.isNotNullOrUndefined(animation.id, 'Expected id to be set');
				context.assertNotSettable(Assert, animation, 'id', [null, Pixate.id()]);
			});
		}
	}, {
		name: 'cannot set type',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			var result = context.createAnimations(layer);

			var types = [];
			for (var x in Pixate.Api.Types.Animation) {
				types.push(Pixate.Api.Types.Animation[x].type);
			}
			
			context.each(result, function(animation) {
				Assert.isNotNullOrUndefined(animation.type, 'Expected type to be set');
				context.assertNotSettable(Assert, animation, 'type', types);
			});
		}
	}, {
		name: 'can set name as expected',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			var result = context.createAnimations(layer);

			context.each(result, function(animation) {
				
				Assert.isNotNullOrUndefined(animation.name, 'Expected name to be set');
				
				context.assertNotSettable(Assert, animation, 'name', [undefined, null, true, false, 0, 1, -1, '', {}, []]);
				context.assertSettable(Assert, animation, 'name', [' ', Pixate.id()]);
			});
		}
	}, {
		name: 'can set enabled as expected',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			var result = context.createAnimations(layer);

			var testValues = [undefined, null, 0, 1, -1, '', {}, [], Pixate.id()];

			context.each(result, function(animation) {
				
				Assert.isNotNullOrUndefined(animation.enabled, 'Expected enabled to be set');
				
				context.assertSettable(Assert, animation, 'enabled', false);
				context.assertNotSettable(Assert, animation, 'enabled', testValues);
				context.assertSettable(Assert, animation, 'enabled', true);
				context.assertNotSettable(Assert, animation, 'enabled', testValues);
			});
		}
	}, {
		name: 'can set collapsed as expected',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			var result = context.createAnimations(layer);

			var testValues = [undefined, null, 0, 1, -1, '', {}, [], Pixate.id()];

			context.each(result, function(animation) {
				
				Assert.isNotNullOrUndefined(animation.collapsed, 'Expected collapsed to be set');
				
				context.assertSettable(Assert, animation, 'collapsed', false);
				context.assertNotSettable(Assert, animation, 'collapsed', testValues);
				context.assertSettable(Assert, animation, 'collapsed', true);
				context.assertNotSettable(Assert, animation, 'collapsed', testValues);
			});
		}
	}, {
		name: 'can set animates',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			
			var result = context.createAnimations(layer);

			var testValues = Pixate.toAttributeArray(Pixate.AnimationMode);

			context.each(result, function(animation) {
				
				Assert.isNotNullOrUndefined(animation.animates, 'Expected animates to be set');				
				context.assertSettable(Assert, animation, 'animates', testValues);
			});
		}
	}]
});
/*
animates: { type: 'AnimationMode' },
referenceEdge: { type: 'Edge', forInteraction: ['drag'] },
begin: { type: 'number', forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.continuousWithRate] },
end: { type: 'number', forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.continuousWithRate] },
condition: { type: 'string', forAnimationMode: [Pixate.AnimationMode.withDuration] },
to: [{ 
	type: 'Asset', 
	forType: ['image'], 
forAnimationMode: [Pixate.AnimationMode.withDuration]
}, { 
	type: 'Stacking ', 
	forType: ['reorder'], 
	forAnimationMode: [Pixate.AnimationMode.withDuration]
}, {
	type: 'string', 
	forType: ['color'], 
	forAnimationMode: [Pixate.AnimationMode.withDuration]
}],
rate: { type: 'number', forType: ['move', 'scale', 'fade', 'color', 'image', 'reorder'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
duration: [
	{ type: 'number', forType: ['image', 'color'], min: 0, max: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
	{ type: 'number', forAnimationMode: [Pixate.AnimationMode.withDuration] }
],
delay: [
	{ type: 'number', forType: ['image', 'color'], min: 0, max: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
	{ type: 'number', forAnimationMode: [Pixate.AnimationMode.withDuration] }
],
easing: { type: 'EasingCurve', forAnimationMode: [Pixate.AnimationMode.withDuration] },
springTension: { type: 'number', min: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
springFriction: { type: 'number', min: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
toX: { type: 'number', forType: ['move', 'rotate', 'scale'], forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.withDuration] },
toY: { type: 'number', forType: ['move', 'rotate', 'scale'], forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.withDuration] },
toZ: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.withDuration] },
rateX: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
rateY: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
rateZ: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
anchorX: { type: 'AnchorX', forType: ['rotate', 'scale'] },
anchorY: { type: 'AnchorY', forType: ['rotate', 'scale'] },
anchorZ: { type: 'AnchorZ', forType: ['rotate', 'scale'] },
dimension: { type: 'DimensionType', forType: ['rotate'] },
backLayer: { type: 'Layer', forType: ['rotate'] },
target: { type: 'Layer', forType: ['reorder'] },
scales: { type: 'ScaleType', forType: ['scale'] }
*/