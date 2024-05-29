import type {
  CompoundCurve,
  Curve,
  CurvePolygon,
  Geometry,
  GeometryCollection,
  LineString,
  MultiPolygon,
  Polygon,
  PolyhedralSurface,
} from "../../internal.ts";

import { GeometryType, Point, SFException } from "../../internal.ts";

/**
 * Calculate the centroid from surface based geometries. Implementation based on
 * the JTS (Java Topology Suite) CentroidArea.
 */
export class CentroidSurface {
  /**
   * Base point for triangles
   */
  private _base: Point | undefined;

  /**
   * Area sum
   */
  private _area = 0;

  /**
   * Sum of surface point locations
   */
  private _sum: Point = Point.create();

  public static create(): CentroidSurface {
    return new CentroidSurface();
  }

  public static createFromGeometry(
    geometry: Geometry,
  ): CentroidSurface {
    const centroidSurface = CentroidSurface.create();
    centroidSurface.add(geometry);
    return centroidSurface;
  }

  /**
   * Add a surface based dimension 2 geometry to the centroid total. Ignores
   * dimension 0 and 1 geometries.
   *
   * @param geometry geometry
   */
  public add(geometry: Geometry): void {
    const geometryType = geometry.geometryType;
    switch (geometryType) {
      case GeometryType.Polygon:
      case GeometryType.Triangle: {
        this.addPolygon(geometry as Polygon);
        break;
      }
      case GeometryType.MultiPolygon: {
        this.addPolygons((geometry as MultiPolygon).polygons);
        break;
      }
      case GeometryType.CurvePolygon: {
        this.addCurvePolygon(geometry as CurvePolygon);
        break;
      }
      case GeometryType.PolyhedralSurface:
      case GeometryType.Tin: {
        this.addPolygons((geometry as PolyhedralSurface).polygons);
        break;
      }
      case GeometryType.GeometryCollection:
      case GeometryType.MultiCurve:
      case GeometryType.MultiSurface: {
        for (
          const subGeometry of (geometry as GeometryCollection)
            .geometries
        ) {
          this.add(subGeometry);
        }
        break;
      }
      case GeometryType.Point:
      case GeometryType.MultiPoint:
      case GeometryType.LineString:
      case GeometryType.CircularString:
      case GeometryType.MultiLineString:
      case GeometryType.CompoundCurve:
        // Doesn't contribute to surface dimension
        break;
      default:
        throw new SFException(
          `Unsupported CendroidSurface Geometry Type: ${geometryType}`,
        );
    }
  }

  /**
   * Add polygons to the centroid total
   *
   * @param polygons polygons
   */
  private addPolygons(polygons: Polygon[]): void {
    for (const polygon of polygons) {
      this.addPolygon(polygon);
    }
  }

  /**
   * Add a polygon to the centroid total
   *
   * @param polygon polygon
   */
  private addPolygon(polygon: Polygon): void {
    const rings = polygon.rings;
    this.addLineString(rings[0]);
    for (let i = 1; i < rings.length; i++) {
      this.addHole(rings[i]);
    }
  }

  /**
   * Add a curve polygon to the centroid total
   *
   * @param curvePolygon curve polygon
   */
  private addCurvePolygon(curvePolygon: CurvePolygon): void {
    const rings: Curve[] = curvePolygon.rings;

    const curve: Curve = rings[0];
    const curveGeometryType = curve.geometryType;
    switch (curveGeometryType) {
      case GeometryType.CompoundCurve: {
        for (const lineString of (curve as CompoundCurve).lineStrings) {
          this.addLineString(lineString);
        }
        break;
      }
      case GeometryType.LineString:
      case GeometryType.CircularString: {
        this.addLineString(curve as LineString);
        break;
      }
      default:
        throw new SFException(`Unexpected Curve Type: ${curveGeometryType}`);
    }

    for (let i = 1; i < rings.length; i++) {
      const curveHole = rings[i];
      const curveHoleGeometryType = curveHole.geometryType;
      switch (curveHoleGeometryType) {
        case GeometryType.CompoundCurve: {
          for (const lineString of (curve as CompoundCurve).lineStrings) {
            this.addHole(lineString);
          }
          break;
        }
        case GeometryType.LineString:
        case GeometryType.CircularString: {
          this.addHole(curveHole as LineString);
          break;
        }
        default:
          throw new SFException(
            `Unexpected Curve Type: ${curveHoleGeometryType}`,
          );
      }
    }
  }

  /**
   * Add a line string to the centroid total
   * @param lineString line string
   */
  private addLineString(lineString: LineString): void {
    this.addOrSubtractLine(true, lineString);
  }

  /**
   * Add a line string hole to subtract from the centroid total
   * @param lineString line string
   */
  private addHole(lineString: LineString): void {
    this.addOrSubtractLine(false, lineString);
  }

  /**
   * Add or subtract a line string to or from the centroid total
   * @param positive true if an addition, false if a subtraction
   * @param lineString line string
   */
  private addOrSubtractLine(positive: boolean, lineString: LineString): void {
    const points: Point[] = lineString.points;
    const firstPoint = points[0];
    if (!this._base) {
      this._base = firstPoint;
    }
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      this.addTriangle(positive, this._base, point, nextPoint);
    }
    const lastPoint = points[points.length - 1];
    if (firstPoint.x !== lastPoint.x || firstPoint.y !== lastPoint.y) {
      this.addTriangle(positive, this._base, lastPoint, firstPoint);
    }
  }

  /**
   * Add or subtract a triangle of points to or from the centroid total
   * @param positive true if an addition, false if a subtraction
   * @param point1 point 1
   * @param point2 point 2
   * @param point3 point 3
   */
  private addTriangle(
    positive: boolean,
    point1: Point,
    point2: Point,
    point3: Point,
  ): void {
    const sign = positive ? 1.0 : -1.0;
    const triangleCenter3: Point = CentroidSurface.centroid3(
      point1,
      point2,
      point3,
    );
    const area2 = CentroidSurface.area2(point1, point2, point3);
    this._sum.x += sign * area2 * triangleCenter3.x;
    this._sum.y += sign * area2 * triangleCenter3.y;
    this._area += sign * area2;
  }

  /**
   * Calculate three times the centroid of the point triangle
   * @param point1 point 1
   * @param point2 point 2
   * @param point3 point 3
   * @return 3 times centroid point
   */
  private static centroid3(point1: Point, point2: Point, point3: Point): Point {
    const x = point1.x + point2.x + point3.x;
    const y = point1.y + point2.y + point3.y;
    return Point.createFromXY(x, y);
  }

  /**
   * Calculate twice the area of the point triangle
   *
   * @param point1 point 1
   * @param point2 point 2
   * @param point3 point 3
   * @return 2 times triangle area
   */
  private static area2(point1: Point, point2: Point, point3: Point): number {
    return (
      (point2.x - point1.x) * (point3.y - point1.y) -
      (point3.x - point1.x) * (point2.y - point1.y)
    );
  }

  /**
   * Get the centroid point
   * @return centroid point
   */
  public getCentroid(): Point {
    return Point.createFromXY(
      this._sum.x / 3.0 / this._area,
      this._sum.y / 3.0 / this._area,
    );
  }
}
