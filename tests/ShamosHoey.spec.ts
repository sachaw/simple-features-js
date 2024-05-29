import { LineString, Point, Polygon, ShamosHoey } from "../lib/internal.ts";
import { expect } from "@std/expect";

Deno.test("test simple", () => {
  let points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(1, 0),
    Point.createFromXY(0.5, 1),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(true);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    true,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    true,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(true);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    true,
  );
  expect(points.length).toBe(3);

  points.push(Point.createFromXY(0, 0));

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(true);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    true,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    true,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(true);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    true,
  );
  expect(points.length).toBe(4);

  points = [
    Point.createFromXY(0, 100),
    Point.createFromXY(100, 0),
    Point.createFromXY(200, 100),
    Point.createFromXY(100, 200),
    Point.createFromXY(0, 100),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(true);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    true,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    true,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(true);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    true,
  );
  expect(points.length).toBe(5);

  points = [
    Point.createFromXY(-104.8384094, 39.753657),
    Point.createFromXY(-104.8377228, 39.7354422),
    Point.createFromXY(-104.7930908, 39.7364983),
    Point.createFromXY(-104.8233891, 39.7440222),
    Point.createFromXY(-104.7930908, 39.7369603),
    Point.createFromXY(-104.808197, 39.7541849),
    Point.createFromXY(-104.8383236, 39.753723),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(true);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    true,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    true,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(true);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    true,
  );
  expect(points.length).toEqual(7);

  points = [
    Point.createFromXY(-106.3256836, 40.2962865),
    Point.createFromXY(-105.6445313, 38.5911138),
    Point.createFromXY(-105.0842285, 40.3046654),
    Point.createFromXY(-105.6445313, 38.5911139),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(true);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    true,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    true,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(true);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    true,
  );
  expect(points.length).toEqual(4);
});

Deno.test("test non simple", () => {
  let points = [Point.createFromXY(0, 0)];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(1);

  points.push(Point.createFromXY(1, 0));

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(2);

  points.push(Point.createFromXY(0, 0));

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(3);

  points = [
    Point.createFromXY(0, 100),
    Point.createFromXY(100, 0),
    Point.createFromXY(200, 100),
    Point.createFromXY(100, 200),
    Point.createFromXY(100.01, 200),
    Point.createFromXY(0, 100),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(6);

  points = [
    Point.createFromXY(-104.8384094, 39.753657),
    Point.createFromXY(-104.8377228, 39.7354422),
    Point.createFromXY(-104.7930908, 39.7364983),
    Point.createFromXY(-104.8233891, 39.7440222),
    Point.createFromXY(-104.8034763, 39.7387424),
    Point.createFromXY(-104.7930908, 39.7369603),
    Point.createFromXY(-104.808197, 39.7541849),
    Point.createFromXY(-104.8383236, 39.753723),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(8);

  points = [
    Point.createFromXY(-106.3256836, 40.2962865),
    Point.createFromXY(-105.6445313, 38.5911138),
    Point.createFromXY(-105.0842285, 40.3046654),
    Point.createFromXY(-105.6445313, 38.5911138),
  ];

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(4);
});

Deno.test("test simple hole", () => {
  const polygon = Polygon.create();

  const points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(10, 0),
    Point.createFromXY(5, 10),
  ];

  const ring = LineString.create();
  ring.points = points;

  polygon.addRing(ring);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(1);
  expect(polygon.rings[0].numPoints()).toEqual(3);

  const holePoints = [
    Point.createFromXY(1, 1),
    Point.createFromXY(9, 1),
    Point.createFromXY(5, 9),
  ];

  const hole = LineString.create();
  hole.points = holePoints;

  polygon.addRing(hole);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(2);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);
});

Deno.test("test non simple hole", () => {
  const polygon = Polygon.create();

  const points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(10, 0),
    Point.createFromXY(5, 10),
  ];

  const ring = LineString.create();
  ring.points = points;

  polygon.addRing(ring);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(1);
  expect(polygon.rings[0].numPoints()).toEqual(3);

  const holePoints = [
    Point.createFromXY(1, 1),
    Point.createFromXY(9, 1),
    Point.createFromXY(5, 9),
    Point.createFromXY(5.000001, 9),
  ];

  const hole = LineString.create();
  hole.points = holePoints;

  polygon.addRing(hole);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(false);
  expect(polygon.isSimple()).toBe(false);
  expect(polygon.numRings()).toEqual(2);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(4);
});

Deno.test("test intersecting hole", () => {
  const polygon = Polygon.create();

  const points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(10, 0),
    Point.createFromXY(5, 10),
  ];

  const ring = LineString.create();
  ring.points = points;

  polygon.addRing(ring);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(1);
  expect(polygon.rings[0].numPoints()).toEqual(3);

  const holePoints = [
    Point.createFromXY(1, 1),
    Point.createFromXY(9, 1),
    Point.createFromXY(5, 10),
  ];

  const hole = LineString.create();
  hole.points = holePoints;

  polygon.addRing(hole);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(false);
  expect(polygon.isSimple()).toBe(false);
  expect(polygon.numRings()).toEqual(2);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);
});

Deno.test("test intersecting holes", () => {
  const polygon = Polygon.create();

  const points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(10, 0),
    Point.createFromXY(5, 10),
  ];

  const ring = LineString.create();
  ring.points = points;

  polygon.addRing(ring);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(1);
  expect(polygon.rings[0].numPoints()).toEqual(3);

  const holePoints1: Point[] = [
    Point.createFromXY(1, 1),
    Point.createFromXY(9, 1),
    Point.createFromXY(5, 9),
  ];

  const hole1 = LineString.create();
  hole1.points = holePoints1;

  polygon.addRing(hole1);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(2);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);

  const holePoints2: Point[] = [
    Point.createFromXY(5.0, 0.1),
    Point.createFromXY(6.0, 0.1),
    Point.createFromXY(5.5, 1.00001),
  ];

  const hole2 = LineString.create();
  hole2.points = holePoints2;

  polygon.addRing(hole2);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(false);
  expect(polygon.isSimple()).toBe(false);
  expect(polygon.numRings()).toEqual(3);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);
  expect(polygon.rings[2].numPoints()).toEqual(3);
});

Deno.test("test hole inside hole", () => {
  const polygon = Polygon.create();

  const points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(10, 0),
    Point.createFromXY(5, 10),
  ];

  const ring = LineString.create();
  ring.points = points;

  polygon.addRing(ring);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(1);
  expect(polygon.rings[0].numPoints()).toEqual(3);

  const holePoints1: Point[] = [
    Point.createFromXY(1, 1),
    Point.createFromXY(9, 1),
    Point.createFromXY(5, 9),
  ];

  const hole1 = LineString.create();
  hole1.points = holePoints1;

  polygon.addRing(hole1);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(2);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);

  const holePoints2: Point[] = [
    Point.createFromXY(2, 2),
    Point.createFromXY(8, 2),
    Point.createFromXY(5, 8),
  ];

  const hole2 = LineString.create();
  hole2.points = holePoints2;

  polygon.addRing(hole2);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(false);
  expect(polygon.isSimple()).toBe(false);
  expect(polygon.numRings()).toEqual(3);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);
  expect(polygon.rings[2].numPoints()).toEqual(3);
});

Deno.test("test external hole", () => {
  const polygon = Polygon.create();

  const points = [
    Point.createFromXY(0, 0),
    Point.createFromXY(10, 0),
    Point.createFromXY(5, 10),
  ];

  const ring = LineString.create();
  ring.points = points;

  polygon.addRing(ring);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(true);
  expect(polygon.isSimple()).toBe(true);
  expect(polygon.numRings()).toEqual(1);
  expect(polygon.rings[0].numPoints()).toEqual(3);

  const holePoints = [
    Point.createFromXY(-1, 1),
    Point.createFromXY(-1, 3),
    Point.createFromXY(-2, 1),
  ];

  const hole = LineString.create();
  hole.points = holePoints;

  polygon.addRing(hole);

  expect(ShamosHoey.simplePolygon(polygon)).toBe(false);
  expect(polygon.isSimple()).toBe(false);
  expect(polygon.numRings()).toEqual(2);
  expect(polygon.rings[0].numPoints()).toEqual(3);
  expect(polygon.rings[1].numPoints()).toEqual(3);
});

Deno.test("test large simple", () => {
  const increment = 0.01;
  const radius = 1250;
  let x = -radius + increment;
  let y = 0;

  const points: Point[] = [];

  while (x <= radius) {
    if (x <= 0) {
      y -= increment;
    } else {
      y += increment;
    }
    points.push(Point.createFromXY(x, y));
    x += increment;
  }

  x = radius - increment;
  while (x >= -radius) {
    if (x >= 0) {
      y += increment;
    } else {
      y -= increment;
    }
    points.push(Point.createFromXY(x, y));
    x -= increment;
  }

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(true);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    true,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    true,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(true);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    true,
  );
  expect(points.length).toEqual(Math.round((radius / increment) * 4));
});

Deno.test("test large non simple", () => {
  const increment = 0.01;
  const radius = 1250;
  let x = -radius + increment;
  let y = 0;

  const points: Point[] = [];

  while (x <= radius) {
    if (x <= 0) {
      y -= increment;
    } else {
      y += increment;
    }
    points.push(Point.createFromXY(x, y));
    x += increment;
  }

  let previousPoint = points[points.length - 2];
  const invalidIndex = points.length;
  points.push(
    Point.createFromXY(previousPoint.x, previousPoint.y - 0.000000000000001),
  );

  x = radius - increment;
  while (x >= -radius) {
    if (x >= 0) {
      y += increment;
    } else {
      y -= increment;
    }
    points.push(Point.createFromXY(x, y));
    x -= increment;
  }

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(1 + Math.round((radius / increment) * 4));

  points.splice(invalidIndex, 1);
  previousPoint = points[points.length - 3];
  points.push(
    Point.createFromXY(previousPoint.x, previousPoint.y + 0.000000000000001),
  );

  expect(ShamosHoey.simplePolygonPoints(points)).toBe(false);
  expect(
    ShamosHoey.simplePolygonLineString(LineString.createFromPoints(points)),
  ).toBe(
    false,
  );
  expect(
    ShamosHoey.simplePolygon(
      Polygon.createFromLineString(LineString.createFromPoints(points)),
    ),
  ).toBe(
    false,
  );
  expect(LineString.createFromPoints(points).isSimple()).toBe(false);
  expect(
    Polygon.createFromLineString(LineString.createFromPoints(points))
      .isSimple(),
  ).toBe(
    false,
  );
  expect(points.length).toEqual(1 + Math.round((radius / increment) * 4));
});
