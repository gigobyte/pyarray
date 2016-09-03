'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = pyarray;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pyarray(obj) {
	var pyarr = new Pyarray(obj);

	var proxy = new Proxy(pyarr, {
		get: function get(target, name) {
			if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'symbol') return target;

			if (name in [] && typeof target.obj[name] === 'function') {
				return target.obj[name].bind(target.obj);
			}

			if (name in target.obj) return target.obj[name];
			if (name in target) return target[name];

			//handle negative indexes
			var prop = parseInt(name, 10);
			if (prop && prop < 0) return target.obj[target.obj.length + prop];
		},

		has: function has(target, key) {
			return key in target.obj;
		},

		deleteProperty: function deleteProperty(target, key) {
			delete target.obj[key];
			return true;
		},

		enumerate: function enumerate(target) {
			return Object.keys(target.obj)[Symbol.iterator]();
		},

		ownKeys: function ownKeys(target) {
			return Reflect.ownKeys(target.obj);
		}
	});

	return proxy;
}

var Pyarray = function () {
	function Pyarray(obj) {
		_classCallCheck(this, Pyarray);

		this.obj = obj;
	}

	_createClass(Pyarray, [{
		key: '_transformIndex',
		value: function _transformIndex(index) {
			if (index < 0) return this.obj.length + index;

			return index;
		}
	}, {
		key: '_validateIndex',
		value: function _validateIndex(index) {
			if (typeof index !== 'number') {
				throw new Error('pyarray: TypeError: an integer is required');
			}

			if (index >= this.obj.length) {
				throw new Error('pyarray: IndexError: list index out of range');
			}
		}
	}, {
		key: 'get',
		value: function get(start, end, step) {
			if (typeof start === 'number') {
				start = this._transformIndex(start);
				this._validateIndex(start);
			}
			if (typeof end === 'number') {
				end = this._transformIndex(end);
				this._validateIndex(end);
			}

			switch (arguments.length) {
				case 0:
					return this.obj;
				case 1:
					return this.obj[start];
			}

			var isThereStep = typeof step === 'number';

			if (start == null) start = 0;
			if (end == null) end = this.obj.length;

			var result = this.obj.slice(start, end);

			if (isThereStep) {
				if (step === 0) throw new Error('pyarray: ValueError: slice step cannot be zero');

				if (step < 0) result.reverse();
				step = Math.abs(step);

				if (step > 1) {
					var final = [];
					for (var i = result.length - 1; i >= 0; i--) {
						i % step === 0 && final.push(result[i]);
					}
					final.reverse();
					result = final;
				}
			}

			return result;
		}
	}, {
		key: 'append',
		value: function append(obj) {
			this.obj.push(obj);
		}
	}, {
		key: 'extend',
		value: function extend(obj) {
			Array.prototype.push.apply(this.obj, obj);
		}
	}, {
		key: 'insert',
		value: function insert(index, obj) {
			index = this._transformIndex(index);
			this._validateIndex(index);

			this.obj.splice(index, 0, obj);
		}
	}, {
		key: 'remove',
		value: function remove(index) {
			index = this._transformIndex(index);
			this._validateIndex(index);

			this.obj.splice(index, 1);
		}
	}, {
		key: 'pypop',
		value: function pypop(index) {
			if (typeof index === 'undefined') {
				return this.obj.pop();
			}

			index = this._transformIndex(index);
			this._validateIndex(index);

			var valueAtIndex = this.obj[index];
			this.obj.splice(index, 1);

			return valueAtIndex;
		}
	}, {
		key: 'index',
		value: function index(obj) {
			var nativeIndex = this.obj.indexOf(obj);
			if (nativeIndex === -1) throw new Error('pyarray: ValueError: ' + obj + ' is not in list');
		}
	}, {
		key: 'count',
		value: function count(obj) {
			return this.obj.reduce(function (n, val) {
				return n + (val === obj);
			}, 0);
		}
	}]);

	return Pyarray;
}();
