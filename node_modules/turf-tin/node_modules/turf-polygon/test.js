var test = require('tape');
var polygon = require('./')

test('polygon', function(t){
  t.plan(6)

  var poly = polygon([[[5, 10], [20, 40], [40, 0]]], {name: 'test polygon'})

  t.ok(poly);
  t.equal(poly.geometry.coordinates[0][0][0], 5)
  t.equal(poly.geometry.coordinates[0][1][0], 20)
  t.equal(poly.geometry.coordinates[0][2][0], 40)
  t.equal(poly.properties.name, 'test polygon')
  t.equal(poly.geometry.type, 'Polygon')
});