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
		referenceEdge: { type: 'Edge' },
		begin: { type: 'number' },
		end: { type: 'number' },
		condition: { type: 'string' },
		to: { },
		rate: { type: 'number' },
		duration: { type: 'number' },
		delay: { type: 'number' },
		easing: { type: 'EasingCurve' },
		springTension: { type: 'number' },
		springFriction: { type: 'number' },
		toX: { type: 'number' },
		toY: { type: 'number' },
		toZ: { type: 'number' },
		anchorX: { type: 'number' },
		anchorY: { type: 'number' },
		anchorZ: { type: 'number' },
		dimension: { type: 'DimensionType' },
		target: { type: 'Layer' },
		scales: { type: 'ScaleType' }
	}
};

Pixate.apply(Pixate.Properties.Animation, Pixate.Properties.AnimationCondition);

Pixate.InteractionEvents = {
	Drag: {
		position: 'dragPosition',
		start: 'dragStart',
		release: 'dragRelease'
	},

	Rotate: {
		rotate: 'rotate',
		start: 'rotateStart',
		release: 'rotateRelease'
	},

	Pinch: {
		pinch: 'pinch',
		start: 'pinchStart',
		release: 'pinchRelease'
	},

	Scroll: {
		postion: 'scrollPosition',
		start: 'scrollStart',
		release: 'scrollRelease',
		end: 'scrollEnd'
	},

	Tap: {
		tap: 'tap',
		doubleTap: 'doubletap',
		longPress: 'longpress'
	}
};
