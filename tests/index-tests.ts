import pyarray, { PyArray } from './../index';

let fruits: PyArray<string> = pyarray(['Banana', 'Apple', 'Orange', 'Plum', 'Grape']);

fruits.push('Avocado');
fruits.pop();
let array: string = fruits.toString();
let all: Array<string> = fruits.get();
let fruit: string = fruits[0];
let some: Array<string> = fruits['0:-1:2'];
all = fruits['::-1'];
console.log(all, fruit, some);
fruits.append('Avocado');
fruits.extend(['Strawbarry', 'Blueberry']);
fruits.insert(2, 'Coconut');
fruits.remove(2);
fruit = fruits.pypop(2);
let index: number = fruits.index('Plum');
let count: number = fruits.count('Plum');
console.log(all, fruit, some, index, count);