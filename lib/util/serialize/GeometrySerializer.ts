import {
  CircularString,
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
  PolyhedralSurface,
  SFException,
  TIN,
  Triangle,
} from "../../internal.ts";

import type { Geometry } from "../../internal.ts";

/**
 * Serialized Point
 */
export interface SerializedPoint {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.Point;
  /**
   * X coordinate
   */
  _x: number;
  /**
   * Y coordinate
   */
  _y: number;
  /**
   * Z coordinate
   */
  _z: number;
  /**
   * M coordinate
   */
  _m: number;
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized LineString
 */
export interface SerializedLineString {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.LineString;
  /**
   * Points
   */
  _points: SerializedPoint[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized Polygon
 */
export interface SerializedPolygon {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.Polygon;
  /**
   * Rings
   */
  _rings: SerializedLineString[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized MultiPoint
 */
export interface SerializedMultiPoint {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.MultiPoint;
  /**
   * Points
   */
  _geometries: SerializedPoint[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized MultiLineString
 */
export interface SerializedMultiLineString {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.MultiLineString;
  /**
   * Line strings
   */
  _geometries: SerializedLineString[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized MultiPolygon
 */
export interface SerializedMultiPolygon {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.MultiPolygon;
  /**
   * Polygons
   */
  _geometries: SerializedPolygon[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized GeometryCollection
 */
export interface SerializedGeometryCollection {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.GeometryCollection;
  /**
   * Geometries
   */
  _geometries: Geometry[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized CircularString
 */
export interface SerializedCircularString {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.CircularString;
  /**
   * Points
   */
  _points: SerializedPoint[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized CompoundCurve
 */
export interface SerializedCompoundCurve {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.CompoundCurve;
  /**
   * Line strings
   */
  _lineStrings: SerializedLineString[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized CurvePolygon
 */
export interface SerializedCurvePolygon {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.CurvePolygon;
  /**
   * Rings
   */
  _rings: SerializedLineString[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized PolyhedralSurface
 */
export interface SerializedPolyhedralSurface {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.PolyhedralSurface;
  /**
   * Polygons
   */
  _polygons: SerializedPolygon[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized TIN
 */
export interface SerializedTIN {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.Tin;
  /**
   * Polygons
   */
  _polygons: SerializedPolygon[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized Triangle
 */
export interface SerializedTriangle {
  /**
   * Geometry type
   */
  _geometryType: GeometryType.Triangle;
  /**
   * Rings
   */
  _rings: SerializedLineString[];
  /**
   * Has Z
   */
  _hasZ: boolean;
  /**
   * Has M
   */
  _hasM: boolean;
}

/**
 * Serialized Geometry
 */
export type SerializedGeometry =
  | SerializedPoint
  | SerializedLineString
  | SerializedPolygon
  | SerializedMultiPoint
  | SerializedMultiLineString
  | SerializedMultiPolygon
  | SerializedGeometryCollection
  | SerializedCircularString
  | SerializedCompoundCurve
  | SerializedCurvePolygon
  | SerializedPolyhedralSurface
  | SerializedTIN
  | SerializedTriangle;

/**
 * Geometry Serializer
 */
export class GeometrySerializer {
  /**
   * Serialize the geometry to JSON
   * @param geometry geometry
   * @returnsserialized JSON
   */
  public static serialize(
    geometry: Geometry,
  ): string {
    return JSON.stringify(geometry);
  }

  /**
   * Serialize the geometry to JSON
   * @param obj serialized object
   * @returns geometry
   */
  public static fromJSON(obj: SerializedGeometry): Geometry {
    let geometry: Geometry;
    const geometryType = obj._geometryType;
    switch (geometryType) {
      case GeometryType.Point: {
        const point = Point.create();
        point.x = obj._x;
        point.y = obj._y;
        point.z = obj._z;
        point.m = obj._m;
        point.hasZ = obj._hasZ;
        point.hasM = obj._hasM;
        geometry = point;
        break;
      }
      case GeometryType.LineString: {
        const lineString = LineString.create();
        for (const point of obj._points) {
          lineString.addPoint(GeometrySerializer.fromJSON(point) as Point);
        }
        lineString.hasZ = obj._hasZ;
        lineString.hasM = obj._hasM;
        geometry = lineString;
        break;
      }
      case GeometryType.Polygon: {
        const polygon = Polygon.create();
        for (const ring of obj._rings) {
          polygon.addRing(GeometrySerializer.fromJSON(ring) as LineString);
        }
        polygon.hasZ = obj._hasZ;
        polygon.hasM = obj._hasM;
        geometry = polygon;
        break;
      }
      case GeometryType.MultiPoint: {
        const multiPoint = MultiPoint.create();
        for (const point of obj._geometries) {
          multiPoint.addPoint(GeometrySerializer.fromJSON(point) as Point);
        }
        multiPoint.hasZ = obj._hasZ;
        multiPoint.hasM = obj._hasM;
        geometry = multiPoint;
        break;
      }
      case GeometryType.MultiLineString: {
        const multiLineString = MultiLineString.create();
        for (const lineString of obj._geometries) {
          multiLineString.addLineString(
            GeometrySerializer.fromJSON(lineString) as LineString,
          );
        }
        multiLineString.hasZ = obj._hasZ;
        multiLineString.hasM = obj._hasM;
        geometry = multiLineString;
        break;
      }
      case GeometryType.MultiPolygon: {
        const multiPolygon = MultiPolygon.create();
        for (const polygon of obj._geometries) {
          multiPolygon.addPolygon(
            GeometrySerializer.fromJSON(polygon) as Polygon,
          );
        }
        multiPolygon.hasZ = obj._hasZ;
        multiPolygon.hasM = obj._hasM;
        geometry = multiPolygon;
        break;
      }
      case GeometryType.GeometryCollection: {
        const geometryCollection = GeometryCollection.create();
        for (const geometry of obj._geometries) {
          // @ts-ignore Incorrect
          geometryCollection.addGeometry(GeometrySerializer.fromJSON(geometry));
        }
        geometryCollection.hasZ = obj._hasZ;
        geometryCollection.hasM = obj._hasM;
        geometry = geometryCollection;
        break;
      }
      case GeometryType.CircularString: {
        const circularString = CircularString.create();
        for (const point of obj._points) {
          circularString.addPoint(GeometrySerializer.fromJSON(point) as Point);
        }
        circularString.hasZ = obj._hasZ;
        circularString.hasM = obj._hasM;
        geometry = circularString;
        break;
      }
      case GeometryType.CompoundCurve: {
        const compoundCurve = CompoundCurve.create();
        for (const lineString of obj._lineStrings) {
          compoundCurve.addLineString(
            GeometrySerializer.fromJSON(lineString) as LineString,
          );
        }
        compoundCurve.hasZ = obj._hasZ;
        compoundCurve.hasM = obj._hasM;
        geometry = compoundCurve;
        break;
      }
      case GeometryType.CurvePolygon: {
        const curvePolygon = CurvePolygon.create();
        for (const ring of obj._rings) {
          curvePolygon.addRing(GeometrySerializer.fromJSON(ring) as LineString);
        }
        curvePolygon.hasZ = obj._hasZ;
        curvePolygon.hasM = obj._hasM;
        geometry = curvePolygon;
        break;
      }
      case GeometryType.PolyhedralSurface: {
        const polyhedralSurface = PolyhedralSurface.create();
        for (const polygon of obj._polygons) {
          polyhedralSurface.addPolygon(
            GeometrySerializer.fromJSON(polygon) as Polygon,
          );
        }
        polyhedralSurface.hasZ = obj._hasZ;
        polyhedralSurface.hasM = obj._hasM;
        geometry = polyhedralSurface;
        break;
      }
      case GeometryType.Tin: {
        const tin = TIN.create();
        for (const polygon of obj._polygons) {
          tin.addPolygon(GeometrySerializer.fromJSON(polygon) as Polygon);
        }
        tin.hasZ = obj._hasZ;
        tin.hasM = obj._hasM;
        geometry = tin;
        break;
      }
      case GeometryType.Triangle: {
        const triangle = Triangle.create();
        for (const ring of obj._rings) {
          triangle.addRing(GeometrySerializer.fromJSON(ring) as LineString);
        }
        triangle.hasZ = obj._hasZ;
        triangle.hasM = obj._hasM;
        geometry = triangle;
        break;
      }
      default:
        throw new SFException(`Geometry Type not supported: ${geometryType}`);
    }
    return geometry;
  }

  /**
   * Deserialize the json into a geometry
   * @param json serialized json
   * @returnsgeometry
   */
  public static deserialize(json: string): Geometry {
    return GeometrySerializer.fromJSON(JSON.parse(json));
  }
}
