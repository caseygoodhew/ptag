/***************************************************************************************
 * 
 ***************************************************************************************/
var pTag = {
	each: function(array, fn) {
		
		array = array || [];

		for (var i = 0; i < array.length; i++) {
			fn.call(array, array[i], i);
		}
	},
		/* function(dest, source, params[] exclude) */
	apply: function() {
	
		var dest = arguments[0];
		var source = arguments[1];
		var exclude = {};
			
		for (var i = 2; i < arguments.length; i++) {
			exclude[arguments[i]] = true;
		}

		for (var x in source) {
			if (!exclude[x]) {
				dest[x] = source[x];
			}
		}

		return dest;
	},

	applyToLayer: function(layer, config) {
		pTag.apply(layer, config, 'animation', 'children', 'name');
	},

	applyAnimation: function(layer, animation) {
		// do something
	},

	write: function(config) {
		var layer = createLayer(config.name);
		pTag.applyToLayer(layer, config);

		pTag.each(config.animation, function(animation) {
			pTag.applyAnimation(layer, animation);
		});

		pTag.each(config.children, function(child) {
			nestLayers(layer, pTag.write(child));
		});

		return layer;
	}
};

pTag.write({
	name: 'Flags',
	x: -400,
	y: -300,
	width: 50,
	height: 100,
	children: [{
	    name: 'show mini fab',
	    animation: [{
	        type: 'move',
	        name: 'Initial Move with Delay',
	        basedOn: { layer: 'screen', interaction: 'loaded' },
	        toX: 100
	    }]
	}]
});







var setAnimationDefaults = function(config) {
	config.name = config.type;
	config.enabled = config.enabled !== false;
	config.animates = config.animates || AnimationMode.withDuration;

	return config;
}
