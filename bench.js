'use strict';
/* globals bench suite */
var lodash = require('lodash');
var objectAssign = require('./');

var source1 = {
	a: 1,
	b: 2,
	c: 3
};

var source2 = {
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
	k: 11,
	l: 12,
	m: 13,
	n: 15,
	o: 15,
	p: 16
};

if (Object.assign) {
	suite('Object.assign', function () {
		bench('small', function () {
			Object.assign({foo: 0}, {bar: 1});
		});

		bench('default options', function () {
			Object.assign({}, {foo: 0}, {foo: 1});
		});

		bench('big', function () {
			Object.assign({}, source1, source2);
		});
	});
}

suite('object-assign', function () {
	bench('small', function () {
		objectAssign({foo: 0}, {bar: 1});
	});

	bench('default options', function () {
		objectAssign({}, {foo: 0}, {foo: 1});
	});

	bench('big', function () {
		objectAssign({}, source1, source2);
	});
});

suite('lodash', function () {
	bench('small', function () {
		lodash.assign({foo: 0}, {bar: 1});
	});

	bench('default options', function () {
		lodash.assign({}, {foo: 0}, {foo: 1});
	});

	bench('big', function () {
		lodash.assign({}, source1, source2);
	});
});
