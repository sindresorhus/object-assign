/*!
	object-assign
	ES6 Object.assign() ponyfill
	https://github.com/sindresorhus/object-assign
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	var objectAssign = Object.assign || function (target, source) {
		var keys = Object.keys(source);
		var i = keys.length;

		while (i--) {
			target[keys[i]] = source[keys[i]];
		}

		return target;
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = objectAssign;
	} else {
		window.objectAssign = objectAssign;
	}
})();
