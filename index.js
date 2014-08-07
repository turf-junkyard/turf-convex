// 1. run tin on points
// 2. merge the tin
var t = {}
t.tin = require('turf-tin');
t.merge = require('turf-merge');

module.exports = function(points, done){
  var tinPolys = t.tin(points, null),
    mergePolys;

  done = done || function () {};

  if (tinPolys instanceof Error) {
    done(tinPolys);
    return tinPolys;
  }

  //mergePolys = t.merge(t.buffer(tinPolys, .05, 'miles'));
  mergePolys = t.merge(tinPolys);

  if (mergePolys instanceof Error) {
    done(mergePolys);
  } else {
    done(null, mergePolys);
  }

  return mergePolys;
};
