turf-convex
===============
[![build status](https://secure.travis-ci.org/Turfjs/turf-convex.png)](http://travis-ci.org/Turfjs/turf-convex)

Takes a set of points and returns a convex hull polygon.

```js
var convex = require('turf-convex')
var fs = require('fs')

var pts = JSON.parse(fs.readFileSync('/path/to/pts.geojson'))
  
var hull = convex(pts)

console.log(hull)
```