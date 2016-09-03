<h1 align="center">
  <img src="https://raw.githubusercontent.com/gigobyte/pyarray/master/logo.png" alt="pyarray logo" width="400">
  <br>
  pyarray
  <br>
  <h4 align="center">A node module for manipulating arrays just like how you would in Python!</h4>
  <br>
  <br>
</h1>

## Install
[![NPM](https://nodei.co/npm/pyarray.png)](https://nodei.co/npm/pyarray/)

## Features
* Supports all native javascript array functions, such as ```push```, ```indexOf``` etc.
* Supports all native Python [list functions](https://docs.python.org/2/tutorial/datastructures.html#more-on-lists) too!
* Not only that, but you can also use index ranges and negative indexes, no more ```array[array.length-1]```
 
## Examples
```js
import pyarray from 'pyarray'
```
#### Creating a pyarray
```js
let fruits = pyarray(['Banana', 'Apple', 'Orange'])
```
#### Accessing elements
```js
fruits[0] // -> 'Banana'
fruits[-1] // -> 'Orange'
fruits[{0:2}] // -> ['Banana', 'Apple']
```
