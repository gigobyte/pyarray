export default function pyarray(obj) {
	const pyarr = new Pyarray(obj);

	const proxy = new Proxy(pyarr, {
		get: function(target, name) {
			if(typeof name === 'symbol') return target;

			if(name in [] && typeof target.obj[name] === 'function') {
				return target.obj[name].bind(target.obj);
			}

			if (name in target.obj) return target.obj[name];
			if (name in target) return target[name];

			const [ start, end, step ] = name.split(':').map((e) => {
				const result = parseInt(e, 10);
				return isNaN(result) ? null : result;
			});

			return target.get(start, end, step);
		},

		has: function(target, key) {
			return key in target.obj;
		},

		deleteProperty: function(target, key) {
			delete target.obj[key];
			return true;
		},

		enumerate: function(target) {
			return Object.keys(target.obj)[Symbol.iterator]()
		},

		ownKeys: function(target) {
			return Reflect.ownKeys(target.obj);
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

	get(start, end, step) {
		if(typeof start === 'number') {
			start = this._transformIndex(start);
			this._validateIndex(start);
		}
		if(typeof end === 'number') {
			end = this._transformIndex(end);
			this._validateIndex(end);
		}

		switch(arguments.length) {
			case 0: return this.obj;
			case 1: return this.obj[start];
		}

		const isThereStep = typeof step === 'number';

		if(start == null) start = 0;
		if(end == null) end = this.obj.length;

		let result =  this.obj.slice(start, end);

		if(isThereStep) {
			 if(step === 0) throw new Error('pyarray: ValueError: slice step cannot be zero');

			 if(step < 0) result.reverse();
			 step = Math.abs(step);

			 if(step > 1) {
			 	let final = [];
				for(let i = result.length - 1; i >= 0; i--) {
					(i % step === 0) && final.push(result[i]);
				}
				final.reverse();
				result = final;
			 }
		}

		return result;
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
		if(nativeIndex === -1) throw new Error(`pyarray: ValueError: ${obj} is not in list`);

		return nativeIndex;
	}

	count(obj) {
		return this.obj.reduce((n, val) => {
			return n + (val === obj)
		}, 0);
	}
}