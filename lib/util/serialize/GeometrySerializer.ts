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

export interface SerializedPoint {
  _geometryType: GeometryType.Point;
  _x: number;
  _y: number;
  _z: number;
  _m: number;
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedLineString {
  _geometryType: GeometryType.LineString;
  _points: SerializedPoint[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedPolygon {
  _geometryType: GeometryType.Polygon;
  _rings: SerializedLineString[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedMultiPoint {
  _geometryType: GeometryType.MultiPoint;
  _geometries: SerializedPoint[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedMultiLineString {
  _geometryType: GeometryType.MultiLineString;
  _geometries: SerializedLineString[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedMultiPolygon {
  _geometryType: GeometryType.MultiPolygon;
  _geometries: SerializedPolygon[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedGeometryCollection {
  _geometryType: GeometryType.GeometryCollection;
  _geometries: Geometry[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedCircularString {
  _geometryType: GeometryType.CircularString;
  _points: SerializedPoint[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedCompoundCurve {
  _geometryType: GeometryType.CompoundCurve;
  _lineStrings: SerializedLineString[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedCurvePolygon {
  _geometryType: GeometryType.CurvePolygon;
  _rings: SerializedLineString[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedPolyhedralSurface {
  _geometryType: GeometryType.PolyhedralSurface;
  _polygons: SerializedPolygon[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedTIN {
  _geometryType: GeometryType.Tin;
  _polygons: SerializedPolygon[];
  _hasZ: boolean;
  _hasM: boolean;
}

export interface SerializedTriangle {
  _geometryType: GeometryType.Triangle;
  _rings: SerializedLineString[];
  _hasZ: boolean;
  _hasM: boolean;
}

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

export class GeometrySerializer {
  /**
   * Serialize the geometry to JSON
   * @param geometry geometry
   * @return serialized JSON
   */
  public static serialize(
    geometry: Geometry,
  ): string {
    return JSON.stringify(geometry);
  }

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
   * @return geometry
   */
  public static deserialize(json: string): Geometry {
    return GeometrySerializer.fromJSON(JSON.parse(json));
  }
}
