'use strict';
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from,i,numKeys,keys,s;
	var numArgs = arguments.length;
	var to = ToObject(target);

	for (s = 1; s < numArgs; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));
		numKeys = keys.length;

		for (i = 0; i < numKeys; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};
