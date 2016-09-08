'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../dist/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

describe('Initialization', function () {
	it('should initialize as an empty array', function () {
		var obj = (0, _index2.default)();
		expect(obj.get()).to.eql([]);
	});

	it('should take the value of a passed array', function () {
		var obj = (0, _index2.default)([1, 2, 3]);
		expect(obj.get()).to.eql([1, 2, 3]);
	});

	it('should not take anything other than array as an argument', function () {
		expect(function () {
			return (0, _index2.default)('string');
		}).to.throw(Error);
		expect(function () {
			return (0, _index2.default)(null);
		}).to.throw(Error);
		expect(function () {
			return (0, _index2.default)(123);
		}).to.throw(Error);
		expect(function () {
			return (0, _index2.default)({});
		}).to.throw(Error);
	});
});

describe('Indexes', function () {
	it('should return first element', function () {
		var obj = (0, _index2.default)([1, 2]);
		expect(obj[0]).to.equal(1);
	});

	it('should return last element', function () {
		var obj = (0, _index2.default)([1, 2]);
		expect(obj[-1]).to.equal(2);
	});

	it('should return from first to before last element', function () {
		var obj = (0, _index2.default)([1, 2, 3, 4]);
		expect(obj[':-1']).to.eql([1, 2, 3]);
	});

	it('should return from second to last element', function () {
		var obj = (0, _index2.default)([1, 2, 3, 4]);
		expect(obj['2:']).to.eql([3, 4]);
	});

	it('should return every second element', function () {
		var obj = (0, _index2.default)([1, 0, 1, 0, 1, 0]);
		expect(obj['::2']).to.eql([1, 1, 1]);
	});

	it('should return every second element starting from the end', function () {
		var obj = (0, _index2.default)([1, 0, 1, 0, 1, 0]);
		expect(obj['::-2']).to.eql([0, 0, 0]);
	});

	it('should return the array reversed', function () {
		var obj = (0, _index2.default)([1, 2, 3, 4]);
		expect(obj['::-1']).to.eql([4, 3, 2, 1]);
	});
});

describe('Methods', function () {
	describe('append()', function () {
		it('should append an element to the end of the array', function () {
			var obj = (0, _index2.default)();
			obj.append(1);
			expect(obj.get()).to.eql([1]);
		});
	});

	describe('extend()', function () {
		it('should not take anything other than array as an argument', function () {
			var obj = (0, _index2.default)();
			expect(function () {
				return obj.extend();
			}).to.throw(Error);
			expect(function () {
				return obj.extend({});
			}).to.throw(Error);
			expect(function () {
				return obj.extend('string');
			}).to.throw(Error);
			expect(function () {
				return obj.extend(123);
			}).to.throw(Error);
		});

		it('should append the contents of an array', function () {
			var obj = (0, _index2.default)([1, 2]);
			obj.extend([3, 4]);
			expect(obj.get()).to.eql([1, 2, 3, 4]);
		});
	});

	describe('insert()', function () {
		it('should not take anything other than integer as index', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			expect(function () {
				return obj.insert('str', 2);
			}).to.throw(Error);
		});

		it('should insert element at index position', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			obj.insert(1, 10);
			expect(obj.get()).to.eql([1, 10, 2, 3]);
		});

		it('should insert element at negative index position', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			obj.insert(-1, 10);
			expect(obj.get()).to.eql([1, 2, 10, 3]);
		});
	});

	describe('remove()', function () {
		it('should remove the first element from the array whose value is x', function () {
			var obj = (0, _index2.default)([1, 2, 3, 2]);
			obj.remove(2);
			expect(obj.get()).to.eql([1, 3, 2]);
		});

		it('should throw if there is no such element', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			expect(function () {
				return obj.remove(4);
			}).to.throw(Error);
		});
	});

	describe('pypop()', function () {
		it('should not take anything other than integer as index', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			expect(function () {
				return obj.pypop('str');
			}).to.throw(Error);
		});

		it('should remove the element at the given position', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			obj.pypop(1);
			expect(obj.get()).to.eql([1, 3]);
		});

		it('should remove the last element if no argument is given', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			obj.pypop();
			expect(obj.get()).to.eql([1, 2]);
		});

		it('should return the removed element', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			expect(obj.pypop(1)).to.eql(2);
		});
	});

	describe('index()', function () {
		it('should return the index in the array of the first element whose value is x', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			expect(obj.index(3)).to.equal(2);
		});

		it('should throw if there is no such element', function () {
			var obj = (0, _index2.default)([1, 2, 3]);
			expect(function () {
				return obj.index(4);
			}).to.throw(Error);
		});
	});

	describe('count()', function () {
		it('should return the number of times x appears in the array', function () {
			var obj = (0, _index2.default)([1, 2, 3, 2, 2, 3]);
			expect(obj.count(2)).to.equal(3);
			expect(obj.count(3)).to.equal(2);
			expect(obj.count(1)).to.equal(1);
			expect(obj.count(4)).to.equal(0);
		});
	});
});