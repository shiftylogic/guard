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

describe('Guard tests', function () {
    var expect = require('chai').expect,
        guard = require('../lib/guard.js');

    describe('> string checks (pass)', function () {
        var checks = [{
                title: 'a string',
                contract: guard('dude').isString()
            }, {
                title: 'empty - no check',
                contract: guard('').isString()
            }, {
                title: 'non-empty check',
                contract: guard('what?').isString().isNotEmpty()
            }, {
                title: 'empty check',
                contract: guard('').isString().isEmpty()
            }, {
                title: 'in set (start)',
                contract: guard('first').isString().isIn(['first', 'second', 'third', 'last'])
            }, {
                title: 'in set (end)',
                contract: guard('last').isString().isIn(['first', 'second', 'third', 'last'])
            }, {
                title: 'in set (middle)',
                contract: guard('third').isString().isIn(['first', 'second', 'third', 'last'])
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                item.contract.check();
            });
        });
    });

    describe('> string checks (fail)', function () {
        var checks = [{
                title: 'array',
                contract: guard([1, 2, 3]).isString(),
                error: TypeError
            }, {
                title: 'boolean',
                contract: guard(true).isString(),
                error: TypeError
            }, {
                title: 'number',
                contract: guard(42).isString(),
                error: TypeError
            }, {
                title: 'empty with non-empty check',
                contract: guard('').isString().isNotEmpty(),
                error: Error
            }, {
                title: 'non-empty with empty check',
                contract: guard('what?').isString().isEmpty(),
                error: Error
            }, {
                title: 'not in set',
                contract: guard('me').isString().isIn(['first', 'second', 'third', 'last']),
                error: Error
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                expect(item.contract.check).to.throw(item.error);
            });
        });
    });

    describe('> number checks (pass)', function () {
        var checks = [{
                title: 'a number',
                contract: guard(42).isNumber()
            }, {
                title: 'greater than',
                contract: guard(3).isNumber().isGreaterThan(2)
            }, {
                title: 'less than',
                contract: guard(28).isNumber().isLessThan(29)
            }, {
                title: 'greater and less chain',
                contract: guard(17).isNumber().isGreaterThan(16).isLessThan(18)
            }, {
                title: 'in range (closed)',
                contract: guard(26).isNumber().isInRange(1, 100)
            }, {
                title: 'in range (start)',
                contract: guard(1).isNumber().isInRange(1, 100)
            }, {
                title: 'in range (end)',
                contract: guard(100).isNumber().isInRange(1, 100)
            }, {
                title: 'in range exclusive (closed)',
                contract: guard(26).isNumber().isInRangeExclusive(0, 100)
            }, {
                title: 'in range exclusive (start)',
                contract: guard(1).isNumber().isInRangeExclusive(0, 100)
            }, {
                title: 'in range exclusive (end)',
                contract: guard(99).isNumber().isInRangeExclusive(0, 100)
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                item.contract.check();
            });
        });
    });

    describe('> number checks (fail)', function () {
        var checks = [{
                title: 'array',
                contract: guard([1, 2, 3]).isNumber(),
                error: TypeError
            }, {
                title: 'boolean',
                contract: guard(true).isNumber(),
                error: TypeError
            }, {
                title: 'string',
                contract: guard('dude').isNumber(),
                error: TypeError
            }, {
                title: 'greater than - equal',
                contract: guard(3).isNumber().isGreaterThan(3),
                error: Error
            }, {
                title: 'greater than',
                contract: guard(3).isNumber().isGreaterThan(4),
                error: Error
            }, {
                title: 'less than - equal',
                contract: guard(28).isNumber().isLessThan(28),
                error: Error
            }, {
                title: 'less than',
                contract: guard(28).isNumber().isLessThan(26),
                error: Error
            }, {
                title: 'in range (below)',
                contract: guard(0).isNumber().isInRange(1, 100),
                error: Error
            }, {
                title: 'in range (above)',
                contract: guard(101).isNumber().isInRange(1, 100),
                error: Error
            }, {
                title: 'in range exclusive (below)',
                contract: guard(1).isNumber().isInRangeExclusive(1, 100),
                error: Error
            }, {
                title: 'in range exclusive (above)',
                contract: guard(100).isNumber().isInRangeExclusive(1, 100),
                error: Error
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                expect(item.contract.check).to.throw(item.error);
            });
        });
    });

    describe('> boolean checks (pass)', function () {
        var checks = [{
                title: 'true',
                contract: guard(true).isBoolean()
            }, {
                title: 'false',
                contract: guard(false).isBoolean()
            }, {
                title: 'Boolean(true)',
                contract: guard(Boolean(true)).isBoolean()
            }, {
                title: 'Boolean(false)',
                contract: guard(Boolean(false)).isBoolean()
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                item.contract.check();
            });
        });
    });

    describe('> boolean checks (fail)', function () {
        var checks = [{
                title: 'array',
                contract: guard([1, 2, 3]).isBoolean(),
                error: TypeError
            }, {
                title: 'number',
                contract: guard(42).isBoolean(),
                error: TypeError
            }, {
                title: 'string',
                contract: guard('dude').isBoolean(),
                error: TypeError
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                expect(item.contract.check).to.throw(item.error);
            });
        });
    });

    describe('> function checks (pass)', function () {
        var checks = [{
                title: 'a function',
                contract: guard(function () {}).isFunction()
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                item.contract.check();
            });
        });
    });

    describe('> function checks (fail)', function () {
        var checks = [{
                title: 'array',
                contract: guard([1, 2, 3]).isFunction(),
                error: TypeError
            }, {
                title: 'number',
                contract: guard(42).isFunction(),
                error: TypeError
            }, {
                title: 'string',
                contract: guard('dude').isFunction(),
                error: TypeError
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                expect(item.contract.check).to.throw(item.error);
            });
        });
    });

    describe('> required / optional checks (pass)', function () {
        var checks = [{
                title: 'required object',
                contract: guard({a: 1}).isRequired()
            }, {
                title: 'defined empty object',
                contract: guard({}).isRequired()
            }, {
                title: 'defined number',
                contract: guard(1).isRequired()
            }, {
                title: 'defined string',
                contract: guard('dude').isRequired()
            }, {
                title: 'defined array',
                contract: guard([1, 2, 3]).isRequired()
            }, {
                title: 'defined empty array',
                contract: guard([]).isRequired()
            }, {
                title: 'undefined',
                contract: guard().isOptional()
            }, {
                title: 'null',
                contract: guard().isOptional()
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                item.contract.check();
            });
        });
    });

    describe('> required / optional checks (fail)', function () {
        var checks = [{
                title: 'undefined',
                contract: guard().isRequired(),
                error: TypeError
            }, {
                title: 'null',
                contract: guard(null).isRequired(),
                error: TypeError
            }];

        checks.forEach(function (item) {
            it('[ ' + item.title + ' ]', function () {
                expect(item.contract.check).to.throw(item.error);
            });
        });
    });

});
