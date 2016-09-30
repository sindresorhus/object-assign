import test from 'ava';

Object.assign = require('./');
const objectAssign = require('./');

test('have the correct length', t => {
	t.is(objectAssign.length, 2);
});

test('throw when target is not an object', t => {
	t.throws(() => {
		objectAssign(null);
	}, TypeError);
	t.throws(() => {
		objectAssign(undefined);
	}, TypeError);
});

test('objectAssign own enumerable properties from source to target object', t => {
	t.deepEqual(objectAssign({foo: 0}, {bar: 1}), {
		foo: 0,
		bar: 1
	});
	t.deepEqual(objectAssign({foo: 0}, null, undefined), {foo: 0});
	t.deepEqual(objectAssign({foo: 0}, null, undefined, {bar: 1}, null), {
		foo: 0,
		bar: 1
	});
});

test('throw on null/undefined target', t => {
	t.throws(() => {
		objectAssign(null, {});
	});

	t.throws(() => {
		objectAssign(undefined, {});
	});

	t.throws(() => {
		objectAssign(undefined, undefined);
	});
});

test('not throw on null/undefined sources', t => {
	t.notThrows(() => {
		objectAssign({}, null);
	});

	t.notThrows(() => {
		objectAssign({}, undefined);
	});

	t.notThrows(() => {
		objectAssign({}, undefined, null);
	});
});

test('support multiple sources', t => {
	t.deepEqual(objectAssign({foo: 0}, {bar: 1}, {bar: 2}), {
		foo: 0,
		bar: 2
	});
	t.deepEqual(objectAssign({}, {}, {foo: 1}), {foo: 1});
});

test('only iterate own keys', t => {
	const Unicorn = function () {};
	Unicorn.prototype.rainbows = 'many';
	const unicorn = new Unicorn();
	unicorn.bar = 1;

	t.deepEqual(objectAssign({foo: 1}, unicorn), {
		foo: 1,
		bar: 1
	});
});

test('return the modified target object', t => {
	const target = {};
	const returned = objectAssign(target, {a: 1});
	t.is(returned, target);
});

test('support `Object.create(null)` objects', t => {
	const obj = Object.create(null);
	obj.foo = true;
	t.deepEqual(objectAssign({}, obj), {foo: true});
});

test('preserve property order', t => {
	const letters = 'abcdefghijklmnopqrst';
	const source = {};
	letters.split('').forEach(letter => {
		source[letter] = letter;
	});
	const target = objectAssign({}, source);
	t.is(Object.keys(target).join(''), letters);
});

test('accept primitives as target', t => {
	const target = objectAssign('abcdefg', {foo: 'bar'});
	const strObj = Object('abcdefg');
	strObj.foo = 'bar';
	t.deepEqual(target, strObj);
});

if (typeof global.Symbol !== 'undefined') {
	test('support symbol properties', t => {
		const target = {};
		const source = {};
		const sym = Symbol('foo');
		source[sym] = 'bar';
		objectAssign(target, source);
		t.is(target[sym], 'bar');
	});

	test('only copy enumerable symbols', t => {
		const target = {};
		const source = {};
		const sym = Symbol('foo');
		Object.defineProperty(source, sym, {
			enumerable: false,
			value: 'bar'
		});
		objectAssign(target, source);
		t.is(target[sym], undefined);
	});
}
