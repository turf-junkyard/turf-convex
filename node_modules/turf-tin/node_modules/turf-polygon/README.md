turf-polygon
============
[![Build Status](https://travis-ci.org/Turfjs/turf-polygon.svg)](https://travis-ci.org/Turfjs/turf-polygon)

Creates a geojson polygon Feature based on a coordinate array. Properties can be added optionally.

```js
var polygon = require('turf-polygon')

var poly1 = polygon([[[20.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0],[100.0,0.0]]])
var poly2 = polygon([[[20.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0],[100.0,0.0]]],
  {name: 'line 1', distance: 145})
  
console.log(poly1)
console.log(poly2)
```
