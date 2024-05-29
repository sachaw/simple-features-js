import type { Assert } from "@japa/assert";
import type { Expect } from "@japa/expect/types";
import type {} from "../lib/PolyhedralSurface.ts";
import type {
  CircularString,
  Curve,
  Geometry,
  GeometryEnvelope,
  GeometryUnion,
  PolyhedralSurface,
  TIN,
  Triangle,
} from "../lib/mod.ts";
import {
  CompoundCurve,
  CurvePolygon,
  GeometryCollection,
  GeometryType,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  SFException,
} from "../lib/mod.ts";

export const compareEnvelopes = (
  expected: GeometryEnvelope,
  actual: GeometryEnvelope,
  expect: Expect,
) => {
  if (expected == null) {
    expect(actual).toBeUndefined();
  } else {
    expect(actual).not.toBeUndefined;
    expect(expected.minX).toEqual(actual.minX);
    expect(expected.maxX).toEqual(actual.maxX);
    expect(expected.minY).toEqual(actual.minY);
    expect(expected.maxY).toEqual(actual.maxY);
    expect(expected.minZ).toEqual(actual.minZ);
    expect(expected.maxZ).toEqual(actual.maxZ);
    expect(expected.hasZ).toEqual(actual.hasZ);
    expect(expected.minM).toEqual(actual.minM);
    expect(expected.maxM).toEqual(actual.maxM);
    expect(expected.hasM).toEqual(actual.hasM);
  }
};

/**
 * Compare two geometries and verify they are equal
 * @param expected
 * @param actual
 */

export const compareGeometries = (
  expected: Geometry,
  actual: Geometry,
  expect: Expect,
  assert: Assert,
) => {
  if (expected == null) {
    expect(actual).toBeUndefined();
  } else {
    expect(actual).not.toBeUndefined;

    switch (expected.geometryType) {
      // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
      case GeometryType.Geometry: {
        assert.fail(
          `Unexpected Geometry Type of ${
            GeometryType.nameFromType(
              expected.geometryType,
            )
          } which is abstract`,
        );
        break;
      }
      case GeometryType.Point: {
        comparePoint(actual, expected, expect);
        break;
      }
      case GeometryType.LineString: {
        compareLineString(expected, actual, expect);
        break;
      }
      case GeometryType.Polygon: {
        comparePolygon(expected, actual, expect);
        break;
      }
      case GeometryType.MultiPoint: {
        compareMultiPoint(expected, actual, expect);
        break;
      }
      case GeometryType.MultiLineString: {
        compareMultiLineString(expected, actual, expect);
        break;
      }
      case GeometryType.MultiPolygon: {
        compareMultiPolygon(expected, actual, expect);
        break;
      }
      case GeometryType.GeometryCollection:
      case GeometryType.MultiCurve:
      case GeometryType.MultiSurface: {
        compareGeometryCollection(expected, actual, expect, assert);
        break;
      }
      case GeometryType.CircularString: {
        compareCircularString(expected, actual, expect);
        break;
      }
      case GeometryType.CompoundCurve: {
        compareCompoundCurve(expected, actual, expect);
        break;
      }
      case GeometryType.CurvePolygon: {
        compareCurvePolygon(expected, actual, expect, assert);
        break;
      }
      // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
      case GeometryType.Curve: {
        assert.fail(
          `Unexpected Geometry Type of ${
            GeometryType.nameFromType(
              expected.geometryType,
            )
          } which is abstract`,
        );
      }
      // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
      case GeometryType.Surface: {
        assert.fail(
          `Unexpected Geometry Type of ${
            GeometryType.nameFromType(
              expected.geometryType,
            )
          } which is abstract`,
        );
        break;
      }
      case GeometryType.PolyhedralSurface: {
        comparePolyhedralSurface(expected, actual, expect, assert);
        break;
      }
      case GeometryType.Tin: {
        compareTIN(expected, actual, expect, assert);
        break;
      }
      case GeometryType.Triangle: {
        compareTriangle(expected, actual, expect);
        break;
      }
      default:
        throw new Error(
          `Geometry Type not supported: ${expected.geometryType}`,
        );
    }
  }
};

/**
 * Compare to the base attributes of two geometries
 *
 * @param expected
 * @param actual
 */
export const compareBaseGeometryAttributes = (
  expected: Geometry,
  actual: Geometry,
  expect: Expect,
) => {
  expect(expected.geometryType).toEqual(actual.geometryType);
  expect(expected.hasZ).toEqual(actual.hasZ);
  expect(expected.hasM).toEqual(actual.hasM);
};

/**
 * Compare the two points for equality
 *
 * @param expected
 * @param actual
 */
export const comparePoint = (
  expected: Point,
  actual: Point,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.equals(actual)).toBe(true);
};

/**
 * Compare the two line strings for equality
 *
 * @param expected
 * @param actual
 */
export const compareLineString = (
  expected: LineString,
  actual: LineString,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numPoints()).toEqual(actual.numPoints());
  for (let i = 0; i < expected.numPoints(); i++) {
    comparePoint(expected.getPoint(i), actual.getPoint(i), expect);
  }
};

/**
 * Compare the two polygons for equality
 *
 * @param expected
 * @param actual
 */
export const comparePolygon = (
  expected: Polygon,
  actual: Polygon,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numRings()).toEqual(actual.numRings());
  for (let i = 0; i < expected.numRings(); i++) {
    compareLineString(expected.getRing(i), actual.getRing(i), expect);
  }
};

/**
 * Compare the two multi points for equality
 *
 * @param expected
 * @param actual
 */
export const compareMultiPoint = (
  expected: MultiPoint,
  actual: MultiPoint,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numPoints()).toEqual(actual.numPoints());
  for (let i = 0; i < expected.numPoints(); i++) {
    comparePoint(expected.points[i], actual.points[i], expect);
  }
};

/**
 * Compare the two multi line strings for equality
 *
 * @param expected
 * @param actual
 */
export const compareMultiLineString = (
  expected: MultiLineString,
  actual: MultiLineString,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numLineStrings()).toEqual(actual.numLineStrings());
  for (let i = 0; i < expected.numLineStrings(); i++) {
    compareLineString(expected.lineStrings[i], actual.lineStrings[i], expect);
  }
};

/**
 * Compare the two multi polygons for equality
 *
 * @param expected
 * @param actual
 */
export const compareMultiPolygon = (
  expected: MultiPolygon,
  actual: MultiPolygon,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numPolygons()).toEqual(actual.numPolygons());
  for (let i = 0; i < expected.numPolygons(); i++) {
    comparePolygon(expected.polygons[i], actual.polygons[i], expect);
  }
};

/**
 * Compare the two geometry collections for equality
 *
 * @param expected
 * @param actual
 */

export const compareGeometryCollection = (
  expected: GeometryCollection<Geometry>,
  actual: GeometryCollection<Geometry>,
  expect: Expect,
  assert: Assert,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numGeometries()).toEqual(actual.numGeometries());
  for (let i = 0; i < expected.numGeometries(); i++) {
    compareGeometries(
      expected.getGeometry(i),
      actual.getGeometry(i),
      expect,
      assert,
    );
  }
};

/**
 * Compare the two circular strings for equality
 *
 * @param expected
 * @param actual
 */
export const compareCircularString = (
  expected: CircularString,
  actual: CircularString,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numPoints()).toEqual(actual.numPoints());
  for (let i = 0; i < expected.numPoints(); i++) {
    comparePoint(expected.points[i], actual.points[i], expect);
  }
};

/**
 * Compare the two compound curves for equality
 *
 * @param expected
 * @param actual
 */
export const compareCompoundCurve = (
  expected: CompoundCurve,
  actual: CompoundCurve,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numLineStrings()).toEqual(actual.numLineStrings());
  for (let i = 0; i < expected.numLineStrings(); i++) {
    compareLineString(expected.lineStrings[i], actual.lineStrings[i], expect);
  }
};

/**
 * Compare the two curve polygons for equality
 *
 * @param expected
 * @param actual
 */
export const compareCurvePolygon = (
  expected: CurvePolygon<Curve>,
  actual: CurvePolygon<Curve>,
  expect: Expect,
  assert: Assert,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numRings()).toEqual(actual.numRings());
  for (let i = 0; i < expected.numRings(); i++) {
    compareGeometries(expected.rings[i], actual.rings[i], expect, assert);
  }
};

/**
 * Compare the two polyhedral surfaces for equality
 *
 * @param expected
 * @param actual
 */
export const comparePolyhedralSurface = (
  expected: PolyhedralSurface,
  actual: PolyhedralSurface,
  expect: Expect,
  assert: Assert,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numPolygons()).toEqual(actual.numPolygons());
  for (let i = 0; i < expected.numPolygons(); i++) {
    compareGeometries(expected.polygons[i], actual.polygons[i], expect, assert);
  }
};

/**
 * Compare the two TINs for equality
 *
 * @param expected
 * @param actual
 */
export const compareTIN = (
  expected: TIN,
  actual: TIN,
  expect: Expect,
  assert: Assert,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numPolygons()).toEqual(actual.numPolygons());
  for (let i = 0; i < expected.numPolygons(); i++) {
    compareGeometries(expected.polygons[i], actual.polygons[i], expect, assert);
  }
};

/**
 * Compare the two triangles for equality
 *
 * @param expected
 * @param actual
 */
export const compareTriangle = (
  expected: Triangle,
  actual: Triangle,
  expect: Expect,
) => {
  compareBaseGeometryAttributes(expected, actual, expect);
  expect(expected.numRings()).toEqual(actual.numRings());
  for (let i = 0; i < expected.numRings(); i++) {
    compareLineString(expected.rings[i], actual.rings[i], expect);
  }
};

// /**
//  * Compare two byte arrays and verify they are equal
//  *
//  * @param expected
//  * @param actual
//  */
// export const compareByteArrays = (expected, actual, expect: Expect) => {
//   expected.length.should.be.equal(actual.length);
//   for (let i = 0; i < expected.length; i++) {
//     expected[i].should.be.equal(actual[i], `Byte: ${i}`);
//   }
// };

// /**
//  * Compare two byte arrays and verify they are equal
//  *
//  * @param expected
//  * @param actual
//  * @return true if equal
//  */
// export const equalByteArrays = (expected, actual) => {
//   let equal = expected.length === actual.length;

//   for (let i = 0; equal && i < expected.length; i++) {
//     equal = expected[i] === actual[i];
//   }
//   return equal;
// };

/**
 * Create a random point
 *
 * @param hasZ
 * @param hasM
 * @return Point
 */
export const createPoint = (hasZ: boolean, hasM: boolean) => {
  const x = Math.random() * 180.0 * (Math.random() < 0.5 ? 1 : -1);
  const y = Math.random() * 90.0 * (Math.random() < 0.5 ? 1 : -1);
  const point = Point.createFromXY(x, y);
  if (hasZ) {
    point.z = Math.random() * 1000.0;
  }
  if (hasM) {
    point.m = Math.random() * 1000.0;
  }
  return point;
};

/**
 * Create a random line string
 *
 * @param hasZ
 * @param hasM
 * @param ring
 * @return LineString
 */
export const createLineString = (
  hasZ: boolean,
  hasM: boolean,
  ring = false,
) => {
  const lineString = LineString.create(hasZ, hasM);
  const num = 2 + Math.round(Math.random() * 9);
  for (let i = 0; i < num; i++) {
    lineString.addPoint(createPoint(hasZ, hasM));
  }
  if (ring) {
    lineString.addPoint(lineString.points[0]);
  }
  return lineString;
};

/**
 * Create a random polygon
 * @param hasZ
 * @param hasM
 * @return Polygon
 */
export const createPolygon = (hasZ: boolean, hasM: boolean) => {
  const polygon = Polygon.create(hasZ, hasM);
  const num = 1 + Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    polygon.addRing(createLineString(hasZ, hasM, true));
  }
  return polygon;
};

/**
 * Create a random multi point
 *
 * @param hasZ
 * @param hasM
 * @return MultiPoint
 */
export const createMultiPoint = (hasZ: boolean, hasM: boolean) => {
  const multiPoint = MultiPoint.create(hasZ, hasM);
  const num = 1 + Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    multiPoint.addPoint(createPoint(hasZ, hasM));
  }
  return multiPoint;
};

/**
 * Create a random multi line string
 *
 * @param hasZ
 * @param hasM
 * @return MultiLineString
 */
export const createMultiLineString = (hasZ: boolean, hasM: boolean) => {
  const multiLineString = MultiLineString.create(hasZ, hasM);
  const num = 1 + Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    multiLineString.addLineString(createLineString(hasZ, hasM));
  }
  return multiLineString;
};

/**
 * Create a random multi polygon
 *
 * @param hasZ
 * @param hasM
 * @return MultiPolygon
 */
export const createMultiPolygon = (hasZ: boolean, hasM: boolean) => {
  const multiPolygon = MultiPolygon.create(hasZ, hasM);
  const num = 1 + Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    multiPolygon.addPolygon(createPolygon(hasZ, hasM));
  }
  return multiPolygon;
};

/**
 * Create a random geometry collection
 *
 * @param hasZ
 * @param hasM
 * @return GeometryCollection
 */
export const createGeometryCollection = (hasZ: boolean, hasM: boolean) => {
  const geometryCollection = GeometryCollection.create(hasZ, hasM);
  const num = 1 + Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    let geometry = null;
    const randomGeometry = Math.floor(Math.random() * 6);
    switch (randomGeometry) {
      case 0: {
        geometry = createPoint(hasZ, hasM);
        break;
      }
      case 1: {
        geometry = createLineString(hasZ, hasM);
        break;
      }
      case 2: {
        geometry = createPolygon(hasZ, hasM);
        break;
      }
      case 3: {
        geometry = createMultiPoint(hasZ, hasM);
        break;
      }
      case 4: {
        geometry = createMultiLineString(hasZ, hasM);
        break;
      }
      case 5: {
        geometry = createMultiPolygon(hasZ, hasM);
        break;
      }
    }

    if (geometry) {
      geometryCollection.addGeometry(geometry);
    } else {
      throw new SFException("Geometry not created");
    }
  }

  return geometryCollection;
};

/**
 * Creates a random point
 * @param minX
 * @param minY
 * @param xRange
 * @param yRange
 * @returns Point
 */
export const createRandomPoint = (
  minX: number,
  minY: number,
  xRange: number,
  yRange: number,
) => {
  const x = minX + Math.random() * xRange;
  const y = minY + Math.random() * yRange;
  return Point.createFromXY(x, y);
};

/**
 * Create a random compound curve
 *
 * @param hasZ
 * @param hasM
 * @param ring
 * @return CompoundCurve
 */
export const createCompoundCurve = (
  hasZ: boolean,
  hasM: boolean,
  ring = false,
) => {
  const compoundCurve = CompoundCurve.create(hasZ, hasM);
  const num = 2 + Math.round(Math.random() * 9);
  for (let i = 0; i < num; i++) {
    compoundCurve.addLineString(createLineString(hasZ, hasM));
  }
  if (ring) {
    compoundCurve
      .getLineString(num - 1)
      .addPoint(compoundCurve.getLineString(0).startPoint());
  }
  return compoundCurve;
};

/**
 * Create a random curve polygon
 *
 * @param hasZ
 * @param hasM
 * @return CurvePolygon
 */
export const createCurvePolygon = (hasZ: boolean, hasM: boolean) => {
  const curvePolygon = CurvePolygon.create(hasZ, hasM);
  const num = 1 + Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    curvePolygon.addRing(createCompoundCurve(hasZ, hasM, true));
  }
  return curvePolygon;
};

/**
 * Randomly return true or false
 * @return true or false
 */
export const coinFlip = () => Math.random() < 0.5;
