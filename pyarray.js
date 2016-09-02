function pyarray(obj) {
	const pyarr = new Pyarray(obj);

	const proxy = new Proxy(pyarr, {
		get: function(target, name) {
			if(typeof name === 'symbol') return target;

			if(name in [] && typeof target.obj[name] === 'function') {
				return target.obj[name].bind(target.obj);
			}

			if (name in target.obj) return target.obj[name];
			if (name in target) return target[name];

			//handle negative indexes
			const prop = parseInt(name, 10);
			if(prop && prop < 0) return target.obj[target.obj.length+prop];
		}
	});

	return proxy;
}

class Pyarray {
	constructor(obj) {
		this.obj = obj;
	}

	_transformIndex(index) {
		if(index < 0) return this.obj.length+index;

		return index;
	}

	_validateIndex(index) {
		if(typeof index !== 'number') {
			throw new Error('pyarray: TypeError: an integer is required');
		}

		if(index >= this.obj.length) {
			throw new Error('pyarray: IndexError: list index out of range');
		}
	}

	append(obj) {
		this.obj.push(obj);
	}
 
	extend(obj) {
		Array.prototype.push.apply(this.obj, obj)
	}

	insert(index, obj) {
		index = this._transformIndex(index);
		this._validateIndex(index);

		this.obj.splice(index, 0, obj);
	}

	remove(index) {
		index = this._transformIndex(index);
		this._validateIndex(index);

		this.obj.splice(index, 1);
	}

	pypop(index) {
		if(typeof index === 'undefined') {
			return this.obj.pop();
		}

		index = this._transformIndex(index);
		this._validateIndex(index);

		const valueAtIndex = this.obj[index];
		this.obj.splice(index, 1);

		return valueAtIndex;
	}

	index(obj) {
		const nativeIndex = this.obj.indexOf(obj);
		if(nativeIndex === -1) throw new Error(`pyarray: ValueError: ${obj} is not in list`)
	}

	count(obj) {
		return this.obj.reduce((n, val) => {
			return n + (val === obj)
		}, 0);
	}
}

let test = pyarray([1,2,3]);
test.insert(-1, 200);
console.log(test);