turf-convex
===============
[![build status](https://secure.travis-ci.org/Turfjs/turf-convex.png)](http://travis-ci.org/Turfjs/turf-convex)

Takes a GeoJSON object and returns a convex hull polygon of its vertices.

###Install

```sh
npm install turf-convex
```

###Parameters

|name|description|
|---|---|
|points|A FeatureCollection of Point Features|

###Usage

```js
convex(pts)
```

###Example

```js
var convex = require('turf-convex')
var fs = require('fs')

var pts = JSON.parse(fs.readFileSync('/path/to/pts.geojson'))
  
var hull = convex(pts)

console.log(hull)
```
