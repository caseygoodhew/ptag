'use strict';
if (false) {
	
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
		
		if (Pixate.Api[x].debug !== false) {
			result.push('    debugger;\n');
		}

		if (Pixate.Api[x].returnType) {
			result.push('    return ');
			
			result.push(Pixate.Api[x].returns || '{}');

			result.push(';\n');
		}

		result.push('}');

		eval(result.join(''));
	}
}