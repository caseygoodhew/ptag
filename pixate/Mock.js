'use strict';

/**
 * Creates a virtual implementation of the Pixate API that can be used for debugging.
 *
 * var {ApiMethod} = function({ApiMethod.parameterNames}) {
 *     // included if definition attribute debug is false, or local forceDebug is true
 *     debugger; 
 *     // included if definition returnType has value
 *     // specific return values are set in the definition's returns attribute
 *     return {ApiMethod.returns};
 * }
 */

if (true) {
	
	var forceDebug = false;

	for (var x in Pixate.Api) {
		var result = [];

		result.push('window.' + x + ' = function(');

		if (Pixate.Api[x].parameterNames) {
			for (var i = 0; i < Pixate.Api[x].parameterNames.length; i++) {
				if (i) {
					result.push(', ');
				}
				result.push(Pixate.Api[x].parameterNames[i])
			}
		}

		result.push(') { \n');
		
		if (forceDebug || Pixate.Api[x].debug !== false) {
			result.push('    // included if definition attribute debug is false, or local forceDebug is true\n');
			result.push('    debugger;\n');
		}

		if (Pixate.Api[x].returnType) {
			result.push('    // included if definition returnType has value\n');
			result.push('    // specific return values are set in the definition\'s returns attribute\n');
			result.push('    return ' + (Pixate.Api[x].returns || '{}') + ';\n');
		}

		result.push('}');

		eval(result.join(''));
	}
}