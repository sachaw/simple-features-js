import type { CompoundCurve } from "./CompoundCurve.ts";
import type { CurvePolygon } from "./CurvePolygon.ts";
import type { GeometryCollection } from "./GeometryCollection.ts";
import type { LineString } from "./LineString.ts";
import type { MultiLineString } from "./MultiLineString.ts";
import type { MultiPoint } from "./MultiPoint.ts";
import type { MultiPolygon } from "./MultiPolygon.ts";
import type { Point } from "./Point.ts";
import type { Polygon } from "./Polygon.ts";
import type { PolyhedralSurface } from "./PolyhedralSurface.ts";
import type { TIN } from "./TIN.ts";
import type { Triangle } from "./Triangle.ts";
import type { CircularString } from "./internal.ts";

/**
 * Interfaces
 */
export * from "./util/Comparator.ts";
export * from "./util/Comparable.ts";

/**
 * Exceptions
 */
export * from "./util/SFException.ts";
export * from "./util/UnsupportedOperationException.ts";

/**
 * Geometries
 */
export * from "./GeometryType.ts";
export * from "./Geometry.ts";
export * from "./Curve.ts";
export * from "./Surface.ts";
export * from "./GeometryCollection.ts";
export * from "./Point.ts";
export * from "./LineString.ts";
export * from "./LinearRing.ts";
export * from "./Line.ts";
export * from "./CircularString.ts";
export * from "./CurvePolygon.ts";
export * from "./Polygon.ts";
export * from "./Triangle.ts";
export * from "./CompoundCurve.ts";
export * from "./PolyhedralSurface.ts";
export * from "./TIN.ts";
export * from "./MultiPoint.ts";
export * from "./MultiCurve.ts";
export * from "./MultiLineString.ts";
export * from "./MultiSurface.ts";
export * from "./MultiPolygon.ts";
export * from "./extended/ExtendedGeometryCollection.ts";

/**
 * Filter
 */
export * from "./util/filter/FiniteFilterType.ts";
export * from "./util/filter/GeometryFilter.ts";
export * from "./util/filter/PointFiniteFilter.ts";

/**
 * Centroid
 */
export * from "./util/centroid/CentroidPoint.ts";
export * from "./util/centroid/DegreesCentroid.ts";
export * from "./util/centroid/CentroidCurve.ts";
export * from "./util/centroid/CentroidSurface.ts";

/**
 * Geometry Envelope
 */
export * from "./GeometryEnvelope.ts";
export * from "./util/GeometryEnvelopeBuilder.ts";

/**
 * Geometry Printer
 */
export * from "./util/GeometryPrinter.ts";
export * from "./util/serialize/GeometrySerializer.ts";

/**
 * Sweep
 */
export * from "./util/sweep/EventType.ts";
export * from "./util/sweep/Event.ts";
export * from "./util/sweep/SweepLine.ts";
export * from "./util/sweep/EventQueue.ts";
export * from "./util/sweep/Segment.ts";
export * from "./util/sweep/ShamosHoey.ts";

/**
 * Geometry Utils
 */
export * from "./util/GeometryUtils.ts";
export * from "./util/GeometryConstants.ts";

/**
 * Union of all geometry types
 */
export type GeometryUnion =
  | Point
  | LineString
  | Polygon
  | MultiPoint
  | MultiLineString
  | MultiPolygon
  | GeometryCollection
  | CircularString
  | CompoundCurve
  | CurvePolygon
  | PolyhedralSurface
  | TIN
  | Triangle;
