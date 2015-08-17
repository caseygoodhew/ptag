Pixate.Api = {
	getSelectedLayer: {
		returnType: 'Layer or null'
	},
	
	getSelectedLayers: {
		returnType: 'Layer[]'
	},
	
	getSelectedAnimations: {
		returnType: 'Animation[]'
	},
	
	getLayerByName: {
		parameterNames: ['name'],
		returnType: 'Layer or null'
	},
	
	getAllLayers: {
		returnType: 'Layer[]',
		returns: '[]'
	},
	
	getAssetByName: {
		parameterNames: ['name'],
		returnType: 'Asset or null'
	},

	createLayer: {
		debug: false,
		parameterNames: ['name'],
		returnType: 'Layer',
		returns: '{ name: name }'
	},

	nestLayers: {
		debug: false,
		parameterNames: ['target', 'source']
	},

	addAnimationCondition: {
		parameterNames: ['animation'],
		returnType: 'AnimationCondition'
	},

	createDragInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createTapInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createDoubleTapInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createLongPressInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createRotateInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createPinchInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createScrollInteraction: {
		parameterNames: ['layer'],
		returnType: 'Interaction'
	},

	createMoveAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createRotateAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createScaleAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createFadeAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createColorAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createImageAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	createReorderAnimation: {
		parameterNames: ['layer'],
		returnType: 'Animation'
	},

	selectLayer: {
		parameterNames: ['layer']
	},

	clearLayerSelection: { },

	setLayerConfig: {
		parameterNames: ['layer', 'config'],
		custom: function(layer, config) {
			layer = layer.result || layer;
			Pixate.apply(layer, config);
		}
	}
};

try
{
	Pixate.AnimationMode = AnimationMode;
}
catch (ex)
{
	Pixate.AnimationMode = {
		continuousToValue: 'AnimationMode.continuousToValue',
		continuousWithRate: 'AnimationMode.continuousWithRate',
		withDuration: 'AnimationMode.withDuration'
	};
}

try
{
	Pixate.ClippingType = ClippingType;
}
catch (ex)
{
	Pixate.ClippingType = {
		none: 'ClippingType.none',
		bounds: 'ClippingType.bounds'
	};
}

try
{
	Pixate.DragDirection = DragDirection;
}
catch (ex)
{
	Pixate.DragDirection = {
		free: 'DragDirection.freee',
		horizontal: 'DragDirection.horizontal',
		vertical: 'DragDirection.vertical'
	};
}

try
{
	Pixate.PagingMode = PagingMode;
}
catch (ex)
{
	Pixate.PagingMode = {
		none: 'PagingMode.none',
		paging: 'PagingMode.paging'
	};
}

try
{
	Pixate.DimensionType = DimensionType;
}
catch (ex)
{
	Pixate.DimensionType = {
		two: 'DimensionType.two',
		three: 'DimensionType.three'
	};
}

try
{
	Pixate.Stacking = Stacking;
}
catch (ex)
{
	Pixate.Stacking = {
		front: 'Stacking.front',
		back: 'Stacking.back',
		before: 'Stacking.before',
		behind: 'Stacking.behind'
	};
}

try
{
	Pixate.ScaleType = ScaleType;
}
catch (ex)
{
	Pixate.ScaleType = {
		byFactor: 'ScaleType.byfactor',
		toSize: 'ScaleType.toSize'
	};
}

try
{
	Pixate.Edge = Edge;
}
catch (ex)
{
	Pixate.Edge = {
		top: 'Edge.top',
		centerY: 'Edge.centerY',
		bottom: 'Edge.bottom',
		left: 'Edge.left',
		centerX: 'Edge.centerX',
		right: 'Edge.right'
	};
}

try
{
	Pixate.EasingCurve = EasingCurve;
}
catch (ex)
{
	Pixate.EasingCurve = {
		linear: 'EasingCurve.linear',
		spring: 'EasingCurve.spring',
		easeInQuadratic: 'EasingCurve.easeInQuadratic',
		easeInCubic: 'EasingCurve.easeInCubic',
		easeInQuartic: 'EasingCurve.easeInQuartic',
		easeInQuintic: 'EasingCurve.easeInQuintic',
		easeInSine: 'EasingCurve.easeInSine',
		easeInExponential: 'EasingCurve.easeInExponential',
		easeInCircular: 'EasingCurve.easeInCircular',
		easeInBounce: 'EasingCurve.easeInBounce',
		easeInBack: 'EasingCurve.easeInBack',
		easeOutQuadratic: 'EasingCurve.easeOutQuadratic',
		easeOutCubic: 'EasingCurve.easeOutCubic',
		easeOutQuartic: 'EasingCurve.easeOutQuartic',
		easeOutQuintic: 'EasingCurve.easeOutQuintic',
		easeOutSine: 'EasingCurve.easeOutSine',
		easeOutExponential: 'EasingCurve.easeOutExponential',
		easeOutCircular: 'EasingCurve.easeOutCircular',
		easeOutBounce: 'EasingCurve.easeOutBounce',
		easeOutBack: 'EasingCurve.easeOutBack',
		easeInOutQuadratic: 'EasingCurve.easeInOutQuadratic',
		easeInOutCubic: 'EasingCurve.easeInOutCubic',
		easeInOutQuartic: 'EasingCurve.easeInOutQuartic',
		easeInOutQuintic: 'EasingCurve.easeInOutQuintic',
		easeInOutSine: 'EasingCurve.easeInOutSine',
		easeInOutExponential: 'EasingCurve.easeInOutExponential',
		easeInOutCircular: 'EasingCurve.easeInOutCircular',
		easeInOutBounce: 'EasingCurve.easeInOutBounce',
		easeInOutBack: 'EasingCurve.easeInOutBack'
	};
}

try
{
	Pixate.Screen = Screen;
}
catch (ex)
{
	Pixate.Screen = {
		width: 200,
		height: 400,
		centerX: 100,
		centerY: 200,
		density: 2
	};
}

Pixate.AnchorX = {
	Left: 0,
	Center: 0.5,
	Right: 1,
	Default: 0.5
};

Pixate.AnchorY = {
	Top: 0,
	Center: 0.5,
	Bottom: 1,
	Default: 0.5
};

Pixate.AnchorZ = {
	Default: 0
};

Pixate.Types = {
	Interaction: {
		Drag: { 
			type: 'drag', 
			handler: 'createDragInteraction', 
			events: {
				position: 'dragPosition',
				start: 'dragStart',
				release: 'dragRelease'
			}
	 	},
		Tap: { 
			type: 'tap', 
			handler: 'createTapInteraction', 
			events: {
				tap: 'tap',
			}
		},
		DoubleTap: { 
			type: 'doubletap', 
			handler: 'createDoubleTapInteraction', 
			events: {
				doubleTap: 'doubletap'
			}
		},
		LongPress: { 
			type: 'longpress', 
			handler: 'createLongPressInteraction', 
			events: {
				longPress: 'longpress'
			} 
		},
		Rotate: { 
			type: 'rotate', 
			handler: 'createRotateInteraction', 
			events: {
				rotate: 'rotate',
				start: 'rotateStart',
				release: 'rotateRelease'
			} 
		},
		Pinch: { 
			type: 'pinch', 
			handler: 'createPinchInteraction', 
			events: {
				pinch: 'pinch',
				start: 'pinchStart',
				release: 'pinchRelease'
			} 
		},
		Scroll: { 
			type: 'scroll', 
			handler: 'createScrollInteraction', 
			events: {
				postion: 'scrollPosition',
				start: 'scrollStart',
				release: 'scrollRelease',
				end: 'scrollEnd'
			} 
		}
	},

	Animation: {
		Move: { type: 'move', handler: 'createMoveAnimation' },
        Rotate: { type: 'rotate', handler: 'createRotateAnimation' },
        Scale: { type: 'scale', handler: 'createScaleAnimation' },
        Fade: { type: 'fade', handler: 'createFadeAnimation' },
        Color: { type: 'color', handler: 'createColorAnimation' },
        Image: { type: 'image', handler: 'createImageAnimation' },
        Reorder: { type: 'reorder', handler: 'createReorderAnimation' },
	}
};

Pixate.Properties = {
	Layer: {
		id: { type: 'string', readOnly: true },
		name: { type: 'string' },
		x: { type: 'number' },
		y: { type: 'number' },
		left: { type: 'number' },
		top: { type: 'number' },
		centerX: { type: 'number' },
		centerY: { type: 'number' },
		right: { type: 'number' },
		bottom: { type: 'number' },
		width: { type: 'number' },
		height: { type: 'number' },
		rotation: { type: 'number' },
		scale: { type: 'number' },
		opacity: { type: 'number' },
		backgroundColor: { type: 'string' },
		backgroundImage: { type: 'Asset' },
		clipping: { type: 'ClippingType' },
		animations: { type: 'Animation[]', readOnly: true }
	},

	Interaction: {
		id: { type: 'string', readOnly: true },
		type: { type: 'string', readOnly: true },
		min: { type: 'number' },
		minReferenceEdge: { type: 'Edge' },
		max: { type: 'number' },
		maxReferenceEdge: { type: 'Edge' },
		stretchMin : { type: 'number', min: 10, max: 10 },
		stretchMax : { type: 'number', min: 10, max: 10 },
		direction: { type: 'DragDirection', forType: ['drag'] },
		paging: { type: 'PagingMode', forType: ['paging'] }
	},

	Animation: {
		conditions: { type: 'AnimationCondition[]', readOnly: true }
	},

	AnimationCondition: {
		id: { type: 'string', readOnly: true },
		type: { type: 'string', readOnly: true },
		name: { type: 'string' },
		enabled: { type: 'boolean' },
		collapsed: { type: 'boolean' },
		animates: { type: 'AnimationMode' },
		basedOn: { type: 'InteractionEvent' },
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
	}
};

Pixate.apply(Pixate.Properties.Animation, Pixate.Properties.AnimationCondition);


