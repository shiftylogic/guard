/*

The MIT License (MIT)

Copyright (c) 2015 Robert Anderson.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

'use strict';

module.exports = function (value) {

    var _value = value,
        _valueType = typeof value,
        _typeValid,
        _valid = true,
        _required = true,

        _guard = {
            isRequired: isRequired,
            isOptional: isOptional,

            isArray: isArray,
            orArray: isArray,
            isBoolean: isBoolean,
            orBoolean: isBoolean,
            isFunction: isFunction,
            orFunction: isFunction,
            isNumber: isNumber,
            orNumber: isNumber,
            isString: isString,
            orString: isString,
            isType: isType,
            orType: isType,
            isInstanceOf: isInstanceOf,
            orInstanceOf: isInstanceOf,

            isEmpty: isEmpty,
            isNotEmpty: isNotEmpty,
            isIn: isInSet,

            isGreaterThan: isGreaterThan,
            isLessThan: isLessThan,
            isInRange: isInRange,
            isInRangeExclusive: isInRangeExclusive,

            check: check
        };

    return Object.freeze(_guard);

    /*
     * General validator functions
     */

    function isRequired() {
        _required = true;
        return _guard;
    }

    function isOptional() {
        _required = false;
        return _guard;
    }

    /*
     * Type specifier functions
     */

    function isArray() {
        _typeValid = _typeValid || _value instanceof Array;
        return _guard;
    }

    function isBoolean() {
        _typeValid = _typeValid || _valueType === 'boolean';
        return _guard;
    }

    function isFunction() {
        _typeValid = _typeValid || _valueType === 'function';
        return _guard;
    }

    function isNumber() {
        _typeValid = _typeValid || _valueType === 'number';
        return _guard;
    }

    function isString() {
        _typeValid = _typeValid || _valueType === 'string';
        return _guard;
    }

    function isType(type) {
        _typeValid = _typeValid || _valueType === type;
        return _guard;
    }

    function isInstanceOf(type) {
        _typeValid = _typeValid || _value instanceof type;
        return _guard;
    }

    /*
     * String functions
     */

    function isEmpty() {
        if (_valueType === 'string') {
            _valid = _valid && _value === '';
        } else if (_valueType instanceof Array) {
            _valid = _valid && _value.length === 0;
        }
        return _guard;
    }

    function isNotEmpty() {
        if (_valueType === 'string') {
            _valid = _valid && _value !== '';
        } else if (_valueType instanceof Array) {
            _valid = _valid && _value.length > 0;
        }
        return _guard;
    }

    function isInSet(set) {
        if (_valueType === 'string') {
            _valid = _valid && set.indexOf(_value) !== -1;
        }
        return _guard;
    }

    /*
     * Number functions
     */

    function isGreaterThan(x) {
        if (_valueType === 'number') {
            _valid = _valid && _value > x;
        }
        return _guard;
    }

    function isLessThan(x) {
        if (_valueType === 'number') {
            _valid = _valid && _value < x;
        }
        return _guard;
    }

    function isInRange(x, y) {
        if (_valueType === 'number') {
            _valid = _valid && _value >= x && _value <= y;
        }
        return _guard;
    }

    function isInRangeExclusive(x, y) {
        if (_valueType === 'number') {
            _valid = _valid && _value > x && _value < y;
        }
        return _guard;
    }

    /*
     * Validation checks
     */

    function check(msg) {
        if (!_required && (_valueType === 'undefined' || _value === null)) {
            // The value is optional and was not specified, so skip check
            return;
        }

        if (typeof _typeValid === 'undefined' && _valueType !== 'undefined' && _value !== null) {
            // No type was specified and no type was requested for the contract, so don't enforce a type.
            _typeValid = true;
        }

        if (!_typeValid) {
            throw new TypeError(msg);
        }

        if (!_valid) {
            // TODO: Possibly maintain errors along the checking path and report them.
            throw new Error(msg);
        }
    }

};
