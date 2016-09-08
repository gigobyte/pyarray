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
* Supports all native javascript array methods, such as ```push```, ```indexOf``` etc.
* Supports native Python [list methods](https://docs.python.org/2/tutorial/datastructures.html#more-on-lists) too!
* Not only that, but you can also use index ranges and negative indexes, no more ```array[array.length-1]```

## Methods
For detailed information about pyarray's method behaviour visit [Python's official docs](https://docs.python.org/2/tutorial/datastructures.html#more-on-lists). Even the errors are the same!

Python method | Supported? | Note
--- | --- | ---
```list.append(x)``` | Yes | Identical to ```Array.prototype.push```
```list.extend(L)``` | Yes
```list.insert(i, x)``` | Yes
```list.remove(x)``` | Yes
```list.pop([i])``` | Yes | Renamed to ```pypop``` to avoid conflict with ```Array.prototype.pop```
```list.index(x)``` | Yes
```list.count(x)``` | Yes
``` list.reverse()``` | Yes | Identical to ```Array.prototype.reverse```
```list.sort()``` | No


## Examples
```js
import pyarray from 'pyarray'
```
#### Creating a pyarray
```js
let fruits = pyarray(['Banana', 'Apple', 'Orange', 'Plum', 'Grape'])
```
#### Accessing elements
Python | pyarray | Result
--- | --- | --- 
```fruits``` | ```fruits.get()``` | ```['Banana', 'Apple', 'Orange', 'Plum', 'Grape']```
```fruits[0]``` | ```fruits[0]``` | ```'Banana'```
```fruits[-1]``` | ```fruits[-1]``` | ```'Grape'```
```fruits[0:-2]``` | ```fruits['0:-2']``` | ```['Banana', 'Apple', 'Orange']```
```fruits[0:-1:2]``` | ```fruits['0:-1:2']``` | ```['Banana', 'Orange']```
```fruits[::-1]``` | ```fruits['::-1']``` | ```['Grape', 'Plum', 'Orange', 'Apple', 'Banana']```
You can also use the ```.get()``` method as a fallback, the syntax is
```obj.get(start, end, step)```

## Testing
1. ```$ npm install ```

2. ```$ npm run test```
