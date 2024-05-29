import type {
  Geometry,
  GeometryCollection,
  MultiPoint,
} from "../../internal.ts";

import { GeometryType, Point, SFException } from "../../internal.ts";

/**
 * Calculate the centroid from point based geometries. Implementation based on
 * the JTS (Java Topology Suite) CentroidPoint.
 */
export class CentroidPoint {
  /**
   * Point count
   */
  private _count = 0;

  /**
   * Sum of point locations
   */
  private _sum: Point = Point.create();

  /**
   * Create a centroid point
   * @returns centroid point
   */
  public static create(): CentroidPoint {
    return new CentroidPoint();
  }

  /**
   * Create a centroid point from a geometry
   * @param geometry geometry
   * @returns centroid point
   */
  public static createFromGeometry(
    geometry: Geometry,
  ): CentroidPoint {
    const centroidPoint = CentroidPoint.create();
    centroidPoint.add(geometry);
    return centroidPoint;
  }

  /**
   * Add a point based dimension 0 geometry to the centroid total
   * @param geometry geometry
   */
  public add(geometry: Geometry): void {
    const geometryType: GeometryType = geometry.geometryType;
    switch (geometryType) {
      case GeometryType.Point: {
        this.addPoint(geometry as Point);
        break;
      }
      case GeometryType.MultiPoint: {
        const multiPoint: MultiPoint = geometry as MultiPoint;
        for (const point of multiPoint.points) {
          this.addPoint(point);
        }
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
      default:
        throw new SFException(
          `Unsupported CentroidPoint Geometry Type: ${geometryType}`,
        );
    }
  }

  /**
   * Add a point to the centroid total
   * @param point point
   */
  private addPoint(point: Point): void {
    this._count++;
    this._sum.x += point.x;
    this._sum.y += point.y;
  }

  /**
   * Get the centroid point
   * @returnscentroid point
   */
  public getCentroid(): Point {
    return Point.createFromXY(
      this._sum.x / this._count,
      this._sum.y / this._count,
    );
  }
}
