'use strict';

Pixate.ApiTest.Assert = function() {

	var messages = [];

	var assert = function(result, message) {
		if (!result) {
			messages.push(message||'No message provided');
		}

		return result;
	}

	var objectify = function(o) {
		if (!o || typeof o !== 'object' || Pixate.isArray(o)) {
			return o;
		}

		var result = [];

		for (var x in o) {
			result.push({ a: x, v: o[0] });
		}

		result.sort(function(a, b) {
			return a.a < b.a;
		});

		return result;
	};

	var stringify = function(arg) {
		if (arg === undefined) {
			return 'undefined';
		} else if (arg === null) {
			return 'null'	;
		} else if (typeof arg === 'string') {
			return '"'+arg+'"';
		} else if (typeof arg === 'object') {
			return JSON.stringify(objectify(arg));
		}

		return arg+'';
	};	

	return {
		areEqual: function(conditionA, conditionB, message) {
			return assert(stringify(conditionA) === stringify(conditionB), message);
		},

		areNotEqual: function(conditionA, conditionB, message) {
			return assert(stringify(conditionA) !== stringify(conditionB), message);
		},

		areSame: function(conditionA, conditionB, message) {
			return assert(conditionA === conditionB, message);
		},

		areNotSame: function(conditionA, conditionB, message) {
			return assert(conditionA !== conditionB, message);
		},

		isUndefined: function(condition, message) {
			return assert(condition === undefined, message);
		},

		isNotUndefined: function(condition, message) {
			return assert(condition !== undefined, message);
		},

		isNull: function(condition, message) {
			return assert(condition === null, message);
		},

		isNotNull: function(condition, message) {
			return assert(condition !== null, message);
		},

		isNullOrUndefined: function(condition, message) {
			return assert(condition === null || condition === undefined, message);
		},

		isNotNullOrUndefined: function(condition, message) {
			return assert(condition !== null && condition !== undefined, message);
		},

		isTrue: function(condition, message) {
			return assert(condition === true, message);
		},

		isFalse: function(condition, message) {
			return assert(condition === false, message);
		},

		getAssertions: function() {
			var result = [].concat(messages);
			messages = [];
			return result;
		}
	}
}();
