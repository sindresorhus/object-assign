/* eslint-disable no-unused-vars */
'use strict';
(function (name, definition, context, dependencies) {
    if (typeof context['module'] !== 'undefined' && context['module']['exports']) 
    { 
    	if (dependencies && context['require']) { 
    		for (var i = 0; i < dependencies.length; i++) 
    		context[dependencies[i]] = context['require'](dependencies[i]); 
    	} 
    	context['module']['exports'] = definition.apply(context); 
    }
    else if (typeof context['define'] !== 'undefined' && typeof context['define'] === 'function' && context['define']['amd']) 
    { 
    	define(name, (dependencies || []), definition); 
    }
    else { 
    	context[name] = definition(); 
    }
})('objectAssign', function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }

        return Object(val);
    }

    return Object.assign || function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;

        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);

            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }

            if (Object.getOwnPropertySymbols) {
                symbols = Object.getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }

        return to;
    };

}, (this || {}));
