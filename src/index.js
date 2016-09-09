export default function pyarray(obj) {
	if(typeof obj !== 'undefined' && !(obj instanceof Array)) {
		throw new Error(`pyarray: Only array objects are allowed (${typeof obj} found)`)
	}

	const pyarr = new Pyarray(obj || [])

	const proxy = new Proxy(pyarr, {
		get: function(target, name) {
			if(typeof name === 'symbol') return target

			if(name in [] && typeof target.obj[name] === 'function') {
				return target.obj[name].bind(target.obj)
			}

			if (name in target.obj) return target.obj[name]
			if (name in target) return target[name]

			const [ start, end, step ] = name.split(':').map((e) => {
				const result = parseInt(e, 10)
				return isNaN(result) ? null : result
			});

			return target.get(start, end, step)
		},

		has: function(target, key) {
			return key in target.obj
		},

		deleteProperty: function(target, key) {
			delete target.obj[key]
			return true
		}
	});

	return proxy;
}

export class Pyarray {
	constructor(obj) {
		this.obj = obj
	}

	_transformIndex(index) {
		if(index < 0) return this.obj.length+index

		return index
	}

	_validateIndex(index) {
		if(index >= this.obj.length) {
			throw new Error('pyarray: IndexError: list index out of range')
		}
	}

	get(start, end, step) {
		const args = [...arguments].filter(arg => typeof arg !== 'undefined')

		if(typeof start === 'number') {
			start = this._transformIndex(start)
			this._validateIndex(start)
		}
		if(typeof end === 'number') {
			end = this._transformIndex(end)
			this._validateIndex(end)
		}

		switch(args.length) {
			case 0: return this.obj
			case 1: return this.obj[start]
		}

		if(start == null) start = 0
		if(end == null) end = this.obj.length

		let result = this.obj.slice(start, end)

		if(typeof step === 'number') {
			 if(step === 0) throw new Error('pyarray: ValueError: slice step cannot be zero')

			 if(step < 0) result.reverse()
			 step = Math.abs(step)

			 if(step > 1) {
			 	let final = []
				for(let i = result.length - 1; i >= 0; i--) {
					(i % step === 0) && final.push(result[i])
				}
				final.reverse()
				result = final
			 }
		}

		return result;
	}

	append(obj) {
		this.obj.push(obj)
	}
 
	extend(obj) {
		if(!(obj instanceof Array)) {
			throw new Error(`pyarray: TypeError: ${typeof obj} object is not iterable`)
		}

		Array.prototype.push.apply(this.obj, obj)
	}

	insert(index, obj) {
		if(typeof index !== 'number') {
			throw new Error('pyarray: TypeError: an integer is required')
		}

		index = this._transformIndex(index)
		this._validateIndex(index)

		this.obj.splice(index, 0, obj)
	}

	remove(obj) {
		let newArr = []
		let found = false;

		for(let e of this.obj) {
			if((e === obj && found) || e !== obj) newArr.push(e)
			if(e === obj) found = true
		}

		if(!found) {
			throw new Error('pyarray: ValueError: list.remove(x): x not in list')
		}

		this.obj = newArr;
	}

	pypop(index) {
		if(typeof index === 'undefined') {
			return this.obj.pop()
		}

		if(typeof index !== 'number') {
			throw new Error('pyarray: TypeError: an integer is required')
		}

		index = this._transformIndex(index)
		this._validateIndex(index)

		const valueAtIndex = this.obj[index]
		this.obj.splice(index, 1)

		return valueAtIndex
	}

	index(obj) {
		const nativeIndex = this.obj.indexOf(obj)
		if(nativeIndex === -1) throw new Error(`pyarray: ValueError: ${obj} is not in list`)

		return nativeIndex
	}

	count(obj) {
		return this.obj.reduce((n, val) => {
			return n + (val === obj)
		}, 0)
	}
}