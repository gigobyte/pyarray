import chai from 'chai'
import pyarray, { Pyarray } from '../../dist/index.js'
const expect = chai.expect

describe('Initialization', () => {
	it('should initialize as an empty array', () => {
		const obj = pyarray()
		expect(obj.get()).to.eql([])
	})

	it('should take the value of a passed array', () => {
		const obj = pyarray([1,2,3])
		expect(obj.get()).to.eql([1,2,3])
	})

	it('should not take anything other than array as an argument', () => {
		expect(() => pyarray('string')).to.throw(Error)
		expect(() => pyarray(null)).to.throw(Error)
		expect(() => pyarray(123)).to.throw(Error)
		expect(() => pyarray({})).to.throw(Error)
	})
})

describe('Indexes', () => {
	it('should return first element', () => {
		const obj = pyarray([1,2])
		expect(obj[0]).to.equal(1)
	})

	it('should return last element', () => {
		const obj = pyarray([1,2])
		expect(obj[-1]).to.equal(2)
	})

	it('should return from first to before last element', () => {
		const obj = pyarray([1,2,3,4])
		expect(obj[':-1']).to.eql([1,2,3])
	})

	it('should return from second to last element', () => {
		const obj = pyarray([1,2,3,4])
		expect(obj['2:']).to.eql([3,4])
	})

	it('should return every second element', () => {
		const obj = pyarray([1,0,1,0,1,0])
		expect(obj['::2']).to.eql([1,1,1])
	})

	it('should return every second element starting from the end', () => {
		const obj = pyarray([1,0,1,0,1,0])
		expect(obj['::-2']).to.eql([0,0,0])
	})

	it('should return the array reversed', () => {
		const obj = pyarray([1,2,3,4])
		expect(obj['::-1']).to.eql([4,3,2,1])
	})

	it('shoudnt accept step equal to 0', () => {
		const obj = pyarray([1,2,3,4])
		expect(() => obj['::0']).to.throw(Error)
	})
})

describe('Methods', () => {
	describe('append()', () => {
		it('should append an element to the end of the array', () => {
			const obj = pyarray()
			obj.append(1)
			expect(obj.get()).to.eql([1])
		})
	})

	describe('extend()', () => {
		it('should not take anything other than array as an argument', () => {
			const obj = pyarray()
			expect(() => obj.extend()).to.throw(Error)
			expect(() => obj.extend({})).to.throw(Error)
			expect(() => obj.extend('string')).to.throw(Error)
			expect(() => obj.extend(123)).to.throw(Error)
		})

		it('should append the contents of an array', () => {
			const obj = pyarray([1,2])
			obj.extend([3,4])
			expect(obj.get()).to.eql([1,2,3,4])
		})
	})

	describe('insert()', () => {
		it('should not take anything other than integer as index', () => {
			const obj = pyarray([1,2,3])
			expect(() => obj.insert('str', 2)).to.throw(Error)
		})

		it('should insert element at index position', () => {
			const obj = pyarray([1,2,3])
			obj.insert(1, 10)
			expect(obj.get()).to.eql([1,10,2,3])
		})

		it('should insert element at negative index position', () => {
			const obj = pyarray([1,2,3])
			obj.insert(-1, 10)
			expect(obj.get()).to.eql([1,2,10,3])
		})
	})

	describe('remove()', () => {
		it('should remove the first element from the array whose value is x', () => {
			const obj = pyarray([1,2,3,2])
			obj.remove(2)
			expect(obj.get()).to.eql([1,3,2])
		})

		it('should throw if there is no such element', () => {
			const obj = pyarray([1,2,3])
			expect(() => obj.remove(4)).to.throw(Error)
		})
	})

	describe('pypop()', () => {
		it('should not take anything other than integer as index', () => {
			const obj = pyarray([1,2,3])
			expect(() => obj.pypop('str')).to.throw(Error)
		})

		it('should remove the element at the given position', () => {
			const obj = pyarray([1,2,3])
			obj.pypop(1)
			expect(obj.get()).to.eql([1,3])
		})

		it('should remove the last element if no argument is given', () => {
			const obj = pyarray([1,2,3])
			obj.pypop()
			expect(obj.get()).to.eql([1,2])
		})

		it('should return the removed element', () => {
			const obj = pyarray([1,2,3])
			expect(obj.pypop(1)).to.eql(2)
		})
	})

	describe('index()', () => {
		it('should return the index in the array of the first element whose value is x', () => {
			const obj = pyarray([1,2,3])
			expect(obj.index(3)).to.equal(2)
		})

		it('should throw if there is no such element', () => {
			const obj = pyarray([1,2,3])
			expect(() => obj.index(4)).to.throw(Error)
		})
	})

	describe('count()', () => {
		it('should return the number of times x appears in the array', () => {
			const obj = pyarray([1,2,3,2,2,3])
			expect(obj.count(2)).to.equal(3)
			expect(obj.count(3)).to.equal(2)
			expect(obj.count(1)).to.equal(1)
			expect(obj.count(4)).to.equal(0)
		})
	})
})

describe('Other functionalities', () => {
	it('should return Pyarray object instead of proxy', () => {
		const obj = pyarray()
		expect(obj).to.be.instanceof(Pyarray)
	})

	it('should work with native JS methods', () => {
		const obj = pyarray()
		obj.push(2)
		expect(obj.get()).to.eql([2])
	})

	it('should support delete', () => {
		const obj = pyarray([1,2,3])
		delete obj[1]
		expect(obj.get()).to.eql([1,,3])
	})

	it('should support in operator', () => {
		const obj = pyarray([1,2,3])
		expect(2 in obj).to.be.true
	})

	it('should throw when index is out of range', () => {
		const obj = pyarray()
		expect(() => obj[99]).to.throw(Error)
	})
})