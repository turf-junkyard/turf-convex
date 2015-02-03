var each = require('turf-meta').coordEach,
    convexHull = require('convex-hull'),
    polygon = require('turf-polygon');

/**
 * Takes any {@link GeoJSON} object and returns a
 * [convex hull](http://en.wikipedia.org/wiki/Convex_hull) polygon.
 *
 * Internally this uses
 * the [convex-hull](https://github.com/mikolalysenko/convex-hull) module that
 * implements a [monotone chain hull](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain).
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
module.exports = function(fc) {
  var points = [];
  each(fc, function(coord) { points.push(coord); });
  var hull = convexHull(points);
  var ring = [];
  for (var i = 0; i < hull.length; i++) {
      ring.push(points[hull[i][0]]);
  }
  ring.push(points[hull[hull.length - 1][1]]);
  return polygon([ring]);
};
