// http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript


/**
 * Takes a set of points and
 * returns a [convex hull](http://en.wikipedia.org/wiki/Convex_hull) polygon.
 *
 * Internally this implements
 * a [Monotone chain algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript).
 *
 * @module turf/convex
 * @param {FeatureCollection} points a collection of {@link Point} features
 * @returns {Feature} a {@link Polygon} feature
 * @example
 * var points = turf.featurecollection([
 *   turf.point(10.1953125, 43.75522505306928),
 *   turf.point(10.404052734375, 43.84245116699039),
 *   turf.point(10.579833984375, 43.6599240747891),
 *   turf.point(10.360107421875, 43.51668853502909),
 *   turf.point(10.140380859375, 43.58834891179792),
 *   turf.point(10.1953125, 43.75522505306928)]);
 *
 * var result = turf.featurecollection(
 *   points.features.concat([turf.convex(points)]));
 * //=result
 */
module.exports = function(fc){
  var points = fc.features.map(function(point){
    return point.geometry.coordinates;
  });

  points.sort(function(a, b) {
    return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
  });

  var lower = [];
  for (var i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
       lower.pop();
    }
    lower.push(points[i]);
  }

  var upper = [];
  for (var i = points.length - 1; i >= 0; i--) {
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
      coordinates: [
        coords
      ]
    } 
  };
}

function cross(o, a, b) {
   return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}
