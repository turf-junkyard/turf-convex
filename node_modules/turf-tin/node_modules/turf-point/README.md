turf-point
==========
[![Build Status](https://travis-ci.org/Turfjs/turf-point.svg?branch=master)](https://travis-ci.org/Turfjs/turf-point)

Creates a geojson Point Feature based on an x and y coordinate. Properties can be added optionally.

```javascript
var point = require('turf-point')

var pt1 = point(-75.343, 39.984)
var pt2 = point(-75.343, 39.984, {name: 'point 1', population: 5000})
console.log(pt1)
console.log(pt2)
```