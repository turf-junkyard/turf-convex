var each = require('turf-meta').coordEach;

// http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript

/**
 * Takes any {@link GeoJSON} object and returns a 
 * [convex hull](http://en.wikipedia.org/wiki/Convex_hull) polygon.
 *
 * Internally this implements
 * a [Monotone chain algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript).
 *
 * @module turf/convex
 * @param {GeoJSON} input any GeoJSON object
 * @returns {Feature} a {@link Polygon} feature
 * @example
 * var points = turf.featurecollection([
 *   turf.point([10.195312, 43.755225]),
 *   turf.point([10.404052, 43.8424511]),
 *   turf.point([10.579833, 43.659924]),
 *   turf.point([10.360107, 43.516688]),
 *   turf.point([10.14038, 43.588348]),
 *   turf.point([10.195312, 43.755225])]);
 *
 * var hull = turf.convex(points);
 *
 * var result = turf.featurecollection(
 *   points.features.concat(hull));
 *
 * //=result
 */
module.exports = function(fc){
  var i, points = [], lower = [], upper = [];

  each(fc, function(coord) {
      points.push(coord);
  });

  points.sort(function(a, b) {
    return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
  });

  for (i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
       lower.pop();
    }
    lower.push(points[i]);
  }

  for (i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
       upper.pop();
    }
    upper.push(points[i]);
  }

  upper.pop();
  lower.pop();
  var coords = lower.concat(upper);
  coords.push(coords[0]);
  return {
    type:'Feature',
    properties: {},
    geometry: {
      type:'Polygon',
      coordinates: [coords]
    }
  };
};

function cross(o, a, b) {
   return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}
