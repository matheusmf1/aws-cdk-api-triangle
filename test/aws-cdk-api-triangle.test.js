const triangle_classification = require( '../resources/lambda_triangle/lambda_triangle' );

test('Triangle Classification Equilateral', () => {
  const result = triangle_classification.checkTriangle( 6, 6, 6 );
  expect(result).toEqual('Equilateral Triangle');
});

test('Triangle Classification Scalene', () => {
  const result = triangle_classification.checkTriangle( 3, 5, 8 );
  expect(result).toEqual('Scalene Triangle');
});

test('Triangle Classification Isosceles', () => {
  const result = triangle_classification.checkTriangle( 3, 3, 8 );
  expect(result).toEqual('Isosceles Triangle');
});