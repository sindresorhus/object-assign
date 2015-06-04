'use strict';
var assert = require('assert');
Object.assign = undefined;
var objectAssign = require('./');

it('should have the correct length', function () {
	assert.equal(objectAssign.length, 2);
});

it('should throw when target is not an object', function () {
	assert.throws(function () { objectAssign(null); }, TypeError);
	assert.throws(function () { objectAssign(undefined); }, TypeError);
});

it('should objectAssign own enumerable properties from source to target object', function () {
	assert.deepEqual(objectAssign({foo: 0}, {bar: 1}), {foo: 0, bar: 1});
	assert.deepEqual(objectAssign({foo: 0}, null, undefined), {foo: 0});
	assert.deepEqual(objectAssign({foo: 0}, null, undefined, {bar: 1}, null), {foo: 0, bar: 1});
});

it('should throw on null/undefined target', function () {
	assert.throws(function () {
		objectAssign(null, {});
	});

	assert.throws(function () {
		objectAssign(undefined, {});
	});

	assert.throws(function () {
		objectAssign(undefined, undefined);
	});
});

it('should not throw on null/undefined sources', function () {
	assert.doesNotThrow(function () {
		objectAssign({}, null);
	});

	assert.doesNotThrow(function () {
		objectAssign({}, undefined);
	});

	assert.doesNotThrow(function () {
		objectAssign({}, undefined, null);
	});
});

it('should support multiple sources', function () {
	assert.deepEqual(objectAssign({foo: 0}, {bar: 1}, {bar: 2}), {foo: 0, bar: 2});
	assert.deepEqual(objectAssign({}, {}, {foo: 1}), {foo: 1});
});

it('should only iterate own keys', function () {
	var Unicorn = function () {};
	Unicorn.prototype.rainbows = 'many';
	var unicorn = new Unicorn();
	unicorn.bar = 1;

	assert.deepEqual(objectAssign({foo: 1}, unicorn), {foo: 1, bar: 1});
});

it('should return the modified target object', function () {
	var target = {};
	var returned = objectAssign(target, { a: 1 });
	assert.equal(returned, target);
});

it('should support `Object.create(null)` objects', function () {
	var obj = Object.create(null);
	obj.foo = true;
	assert.deepEqual(objectAssign({}, obj), {foo: true});
});

if (typeof Symbol !== 'undefined') {
	it('should support symbol properties', function () {
		var target = {};
		var source = {};
		var sym = Symbol('foo');
		source[sym] = 'bar';
		objectAssign(target, source);
		assert.equal(target[sym], 'bar');
	});
}
