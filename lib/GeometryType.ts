import { SFException } from "./internal.ts";

/**
 * Geometry Type enumeration
 */
export enum GeometryType {
  /**
   * The root of the geometry type hierarchy
   */
  Geometry = 0,

  /**
   * A single location in space. Each point has an X and Y coordinate. A point
   * MAY optionally also have a Z and/or an M value.
   */
  Point = 1,

  /**
   * A Curve that connects two or more points in space.
   */
  LineString = 2,

  /**
   * A restricted form of CurvePolygon where each ring is defined as a simple,
   * closed LineString.
   */
  Polygon = 3,

  /**
   * A restricted form of GeometryCollection where each Geometry in the
   * collection must be of type Point.
   */
  MultiPoint = 4,

  /**
   * A restricted form of MultiCurve where each Curve in the collection must
   * be of type LineString.
   */
  MultiLineString = 5,

  /**
   * A restricted form of MultiSurface where each Surface in the collection
   * must be of type Polygon.
   */
  MultiPolygon = 6,

  /**
   * A collection of zero or more Geometry instances.
   */
  GeometryCollection = 7,

  /**
   * Circular String, Curve sub type
   */
  CircularString = 8,

  /**
   * Compound Curve, Curve sub type
   */
  CompoundCurve = 9,

  /**
   * A planar surface defined by an exterior ring and zero or more interior
   * ring. Each ring is defined by a Curve instance.
   */
  CurvePolygon = 10,

  /**
   * A restricted form of GeometryCollection where each Geometry in the
   * collection must be of type Curve.
   */
  MultiCurve = 11,

  /**
   * A restricted form of GeometryCollection where each Geometry in the
   * collection must be of type Surface.
   */
  MultiSurface = 12,

  /**
   * The base type for all 1-dimensional geometry types. A 1-dimensional
   * geometry is a geometry that has a length, but no area. A curve is
   * considered simple if it does not intersect itself (except at the start
   * and end point). A curve is considered closed its start and end point are
   * coincident. A simple, closed curve is called a ring.
   */
  Curve = 13,

  /**
   * The base type for all 2-dimensional geometry types. A 2-dimensional
   * geometry is a geometry that has an area.
   */
  Surface = 14,

  /**
   * Contiguous collection of polygons which share common boundary segments.
   */
  PolyhedralSurface = 15,

  /**
   * A tetrahedron (4 triangular faces), corner at the origin and each unit
   * coordinate digit.
   */
  Tin = 16,

  /**
   * Triangle
   */
  Triangle = 17,
}

export namespace GeometryType {
  export function nameFromType(geometryType: GeometryType): string {
    let name: string | undefined;
    if (geometryType !== null && geometryType !== undefined) {
      name = GeometryType[geometryType];
    }

    if (!name) {
      throw new SFException("Invalid geometry type");
    }

    return name;
  }

  export function fromName(type: string): GeometryType {
    return GeometryType[type as keyof typeof GeometryType] as GeometryType;
  }

  export function values(): GeometryType[] {
    return [
      GeometryType.Geometry,
      GeometryType.Point,
      GeometryType.LineString,
      GeometryType.Polygon,
      GeometryType.MultiPoint,
      GeometryType.MultiLineString,
      GeometryType.MultiPolygon,
      GeometryType.GeometryCollection,
      GeometryType.CircularString,
      GeometryType.CompoundCurve,
      GeometryType.CurvePolygon,
      GeometryType.MultiCurve,
      GeometryType.MultiSurface,
      GeometryType.Curve,
      GeometryType.Surface,
      GeometryType.PolyhedralSurface,
      GeometryType.Tin,
      GeometryType.Triangle,
    ];
  }
}
