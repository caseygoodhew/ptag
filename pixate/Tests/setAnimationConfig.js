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

			createAnimations: function(layer, config) {
				
				config = config || {};
				config.interactionType = config.interactionType || Pixate.Api.Types.Interaction.Tap;

				if (!config.event) {
					var events = Pixate.toAttributeArray(config.interactionType.events);
					if (events[0].canAnimate === false) {
						events.splice(0, 1);
					}
					config.event = events[0].name || events[0];
				}

				Pixate.createInteraction(layer, config.interactionType);

				return {
				    move: Pixate.createMoveAnimation(layer, Pixate.basedOn(layer, config.event)),
				    rotate: Pixate.createRotateAnimation(layer, Pixate.basedOn(layer, config.event)),
				    scale: Pixate.createScaleAnimation(layer, Pixate.basedOn(layer, config.event)),
				    fade: Pixate.createFadeAnimation(layer, Pixate.basedOn(layer, config.event)),
				    color: Pixate.createColorAnimation(layer, Pixate.basedOn(layer, config.event)),
				    image: Pixate.createImageAnimation(layer, Pixate.basedOn(layer, config.event)),
				    reorder: Pixate.createReorderAnimation(layer, Pixate.basedOn(layer, config.event))
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
					Assert.areSame(value, animation[attribute], 'Expected '+attribute+' to be changed ('+animation.type+', '+value+')');
				});
			},

			assertNotSettable: function(Assert, animation, attribute, values) {
				
				var originalValue = animation[attribute];
				var config = {};
				
				Pixate.each(values, function(value) {
									
					config[attribute] = value;
					
					Pixate.setAnimationConfig(animation, config);
					Assert.areSame(originalValue, animation[attribute], 'Expected '+attribute+' to be unchanged ('+animation.type+', '+value+')');
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
		name: 'can set animates as expected',
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');
			
			var result = context.createAnimations(layer);

			var testValues = Pixate.toAttributeArray(Pixate.AnimationMode);

			context.each(result, function(animation) {
				
				Assert.isNotNullOrUndefined(animation.animates, 'Expected animates to be set');	
				context.assertNotSettable(Assert, animation, 'animates', [undefined, null, true, false, 0, 1, -1, '', {}, [], Pixate.id()]);		
				context.assertSettable(Assert, animation, 'animates', testValues);
			});
		}
	}, {
		name: 'can set referenceEdge as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var layer = Pixate.createLayer('test');

			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			var testValues = Pixate.toAttributeArray(Pixate.Edge);

			Pixate.each(interactionTypes, function(interactionType) {

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					
					context.assertNotSettable(Assert, animation, 'referenceEdge', [undefined, null, true, false, 0, 1, -1, '', {}, [], Pixate.id()]);		
					
					if (interactionType === Pixate.Api.Types.Interaction.Drag) {
						context.assertSettable(Assert, animation, 'referenceEdge', testValues);
					} else {
						context.assertNotSettable(Assert, animation, 'referenceEdge', testValues);
					}
				});
			});
		}
	}, {
		name: 'can set begin and end as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertNotSettable(Assert, animation, 'begin', [100, -100, 0, undefined, null, true, false, '', {}, [], Pixate.id()]);		
					context.assertNotSettable(Assert, animation, 'end', [100, -100, 0, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertSettable(Assert, animation, 'begin', [0, 100, -100]);		
					context.assertSettable(Assert, animation, 'end', [0, 100, -100]);		
					context.assertNotSettable(Assert, animation, 'begin', [undefined, null, true, false, '', {}, [], Pixate.id()]);		
					context.assertNotSettable(Assert, animation, 'end', [undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertSettable(Assert, animation, 'begin', [0, 100, -100]);		
					context.assertSettable(Assert, animation, 'end', [0, 100, -100]);		
					context.assertNotSettable(Assert, animation, 'begin', [undefined, null, true, false, '', {}, [], Pixate.id()]);		
					context.assertNotSettable(Assert, animation, 'end', [undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set rate as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertNotSettable(Assert, animation, 'rate', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (animation.type === Pixate.Api.Types.Animation.Rotate.type) {
						context.assertNotSettable(Assert, animation, 'rate', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
					} else {
						context.assertSettable(Assert, animation, 'rate', [0, 0.5, 100, -100]);
						context.assertNotSettable(Assert, animation, 'rate', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'rate', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set duration as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					
					if (animation.type === Pixate.Api.Types.Animation.Image.type
						|| animation.type === Pixate.Api.Types.Animation.Color.type
					) {
						context.assertSettable(Assert, animation, 'duration', [0]);		
						context.assertNotSettable(Assert, animation, 'duration', [0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
					} else {
						context.assertSettable(Assert, animation, 'duration', [0, 0.5, 100, -100]);		
						context.assertNotSettable(Assert, animation, 'duration', [undefined, null, true, false, '', {}, [], Pixate.id()]);		
					}
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });	
					context.assertNotSettable(Assert, animation, 'duration', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'duration', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
				});
			});
		}
	}, {
		name: 'can set delay as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					
					if (animation.type === Pixate.Api.Types.Animation.Image.type
						|| animation.type === Pixate.Api.Types.Animation.Color.type
					) {
						context.assertSettable(Assert, animation, 'delay', [0]);		
						context.assertNotSettable(Assert, animation, 'delay', [0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
					} else {
						context.assertSettable(Assert, animation, 'delay', [0, 0.5, 100, -100]);		
						context.assertNotSettable(Assert, animation, 'delay', [undefined, null, true, false, '', {}, [], Pixate.id()]);		
					}
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });	
					context.assertNotSettable(Assert, animation, 'delay', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'delay', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);		
				});
			});
		}
	}, {
		name: 'can set easing as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertSettable(Assert, animation, 'easing', Pixate.toAttributeArray(Pixate.EasingCurve));
					context.assertNotSettable(Assert, animation, 'easing', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertNotSettable(Assert, animation, 'easing', Pixate.toAttributeArray(Pixate.EasingCurve));
					context.assertNotSettable(Assert, animation, 'easing', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'easing', Pixate.toAttributeArray(Pixate.EasingCurve));
					context.assertNotSettable(Assert, animation, 'easing', [0, 0.5, 100, -100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
				});
			});
		}
	}, {
		name: 'can set springTension as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertSettable(Assert, animation, 'springTension', [0, 0.5, 100]);
					context.assertNotSettable(Assert, animation, 'springTension', [-1, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertNotSettable(Assert, animation, 'springTension', [0, 0.5, 100, -1, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'springTension', [0, 0.5, 100, -1, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set springFriction as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				context.each(result, function(animation) {
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertSettable(Assert, animation, 'springFriction', [0, 0.5, 100]);
					context.assertNotSettable(Assert, animation, 'springFriction', [-1, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertNotSettable(Assert, animation, 'springFriction', [0, 0.5, 100, -1, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'springFriction', [0, 0.5, 100, -1, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set toX as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Move.type,
					Pixate.Api.Types.Animation.Rotate.type,
					Pixate.Api.Types.Animation.Scale.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'toX', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'toX', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'toX', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'toX', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'toX', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'toX', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertNotSettable(Assert, animation, 'toX', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set toY as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Move.type,
					Pixate.Api.Types.Animation.Rotate.type,
					Pixate.Api.Types.Animation.Scale.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'toY', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'toY', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'toY', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'toY', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'toY', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'toY', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertNotSettable(Assert, animation, 'toY', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		} 
	}, {
		name: 'can set toZ as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'toZ', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'toZ', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'toZ', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'toZ', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'toZ', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'toZ', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					context.assertNotSettable(Assert, animation, 'toZ', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set rateX as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertNotSettable(Assert, animation, 'rateX', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'rateX', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'rateX', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'rateX', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'rateX', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
				});
			});
		}
	}, {
		name: 'can set rateY as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertNotSettable(Assert, animation, 'rateY', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'rateY', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'rateY', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'rateY', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'rateY', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
				});
			});
		}
	}, {
		name: 'can set rateZ as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					context.assertNotSettable(Assert, animation, 'rateZ', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					context.assertNotSettable(Assert, animation, 'rateZ', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'rateZ', [-100, 0, 0.5, 100]);
						context.assertNotSettable(Assert, animation, 'rateZ', [undefined, null, true, false, '', {}, [], Pixate.id()]);
					} else {
						context.assertNotSettable(Assert, animation, 'rateZ', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					}
				});
			});
		}
	}, {
		name: 'can set anchorX as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validValues = Pixate.toAttributeArray(Pixate.AnchorX);
				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type,
					Pixate.Api.Types.Animation.Scale.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorX', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorX', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorX', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorX', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorX', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorX', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorX', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorX', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorX', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set anchorY as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validValues = Pixate.toAttributeArray(Pixate.AnchorY);
				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type,
					Pixate.Api.Types.Animation.Scale.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorY', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorY', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorY', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorY', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorY', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorY', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorY', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorY', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorY', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set anchorZ as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validValues = Pixate.toAttributeArray(Pixate.AnchorZ);
				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type,
					Pixate.Api.Types.Animation.Scale.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorZ', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorZ', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorZ', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorZ', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorZ', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorZ', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'anchorZ', validValues);
					} else {
						context.assertNotSettable(Assert, animation, 'anchorZ', validValues);
					}
					context.assertNotSettable(Assert, animation, 'anchorZ', [-100, 0.4, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set dimension as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Rotate.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'dimension', Pixate.toAttributeArray(Pixate.DimensionType));
					} else {
						context.assertNotSettable(Assert, animation, 'dimension', Pixate.toAttributeArray(Pixate.DimensionType));
					}
					context.assertNotSettable(Assert, animation, 'dimension', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'dimension', Pixate.toAttributeArray(Pixate.DimensionType));
					} else {
						context.assertNotSettable(Assert, animation, 'dimension', Pixate.toAttributeArray(Pixate.DimensionType));
					}
					context.assertNotSettable(Assert, animation, 'dimension', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'dimension', Pixate.toAttributeArray(Pixate.DimensionType));
					} else {
						context.assertNotSettable(Assert, animation, 'dimension', Pixate.toAttributeArray(Pixate.DimensionType));
					}
					context.assertNotSettable(Assert, animation, 'dimension', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}, {
		name: 'can set scales as expected',
		when: function() { return !Pixate.suppressLongTests; },
		test: function(Assert, context) {
			var interactionTypes = Pixate.toAttributeArray(Pixate.Api.Types.Interaction);
			
			Pixate.each(interactionTypes, function(interactionType) {
				var layer = Pixate.createLayer('test-'+interactionType.type);

				var result = context.createAnimations(layer, { interactionType: interactionType });

				var validTypes = Pixate.map([
					Pixate.Api.Types.Animation.Scale.type
				]);

				context.each(result, function(animation) {
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.withDuration });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'scales', Pixate.toAttributeArray(Pixate.ScaleType));
					} else {
						context.assertNotSettable(Assert, animation, 'scales', Pixate.toAttributeArray(Pixate.ScaleType));
					}
					context.assertNotSettable(Assert, animation, 'scales', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);

					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousToValue });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'scales', Pixate.toAttributeArray(Pixate.ScaleType));
					} else {
						context.assertNotSettable(Assert, animation, 'scales', Pixate.toAttributeArray(Pixate.ScaleType));
					}
					context.assertNotSettable(Assert, animation, 'scales', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
					
					Pixate.setAnimationConfig(animation, { animates: Pixate.AnimationMode.continuousWithRate });
					if (validTypes[animation.type]) {
						context.assertSettable(Assert, animation, 'scales', Pixate.toAttributeArray(Pixate.ScaleType));
					} else {
						context.assertNotSettable(Assert, animation, 'scales', Pixate.toAttributeArray(Pixate.ScaleType));
					}
					context.assertNotSettable(Assert, animation, 'scales', [-100, 0, 0.5, 100, undefined, null, true, false, '', {}, [], Pixate.id()]);
				});
			});
		}
	}]
});


/*
backLayer: { type: 'Layer', forType: ['rotate'] },
target: { type: 'Layer', forType: ['reorder'] },


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

*/