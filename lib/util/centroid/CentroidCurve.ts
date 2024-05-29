import type {
  CompoundCurve,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
} from "../../mod.ts";

import { GeometryType, GeometryUtils, Point, SFException } from "../../mod.ts";

/**
 * Calculate the centroid from curve based geometries. Implementation based on
 * the JTS (Java Topology Suite) CentroidLine.
 */
export class CentroidCurve {
  /**
   * Sum of curve point locations
   */
  private _sum = Point.create();

  /**
   * Total length of curves
   */
  private _totalLength = 0;

  public static create(): CentroidCurve {
    return new CentroidCurve();
  }

  public static createFromGeometry(
    geometry: Geometry,
  ): CentroidCurve {
    const centroidCurve = CentroidCurve.create();
    centroidCurve.add(geometry);
    return centroidCurve;
  }

  /**
   * Add a curve based dimension 1 geometry to the centroid total. Ignores
   * dimension 0 geometries.
   * @param geometry geometry
   */
  public add(geometry: Geometry): void {
    const geometryType = geometry.geometryType;
    switch (geometryType) {
      case GeometryType.LineString:
      case GeometryType.CircularString: {
        this.addLineString(geometry as LineString);
        break;
      }
      case GeometryType.MultiLineString: {
        this.addLineStrings((geometry as MultiLineString).lineStrings);
        break;
      }
      case GeometryType.CompoundCurve: {
        this.addLineStrings((geometry as CompoundCurve).lineStrings);
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
        // Doesn't contribute to curve dimension
        break;
      default:
        throw new SFException(
          `Unsupported CentroidCurve Geometry Type: ${geometryType}`,
        );
    }
  }

  /**
   * Add line strings to the centroid total
   * @param lineStrings line strings
   */
  private addLineStrings(lineStrings: LineString[]): void {
    for (const lineString of lineStrings) {
      this.addLineString(lineString);
    }
  }

  /**
   * Add a line string to the centroid total
   * @param lineString line string
   */
  private addLineString(lineString: LineString): void {
    this.addPoints(lineString.points);
  }

  /**
   * Add points to the centroid total
   *
   * @param points points
   */
  private addPoints(points: Point[]): void {
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      const length = GeometryUtils.distance(point, nextPoint);
      this._totalLength += length;
      const midX = (point.x + nextPoint.x) / 2;
      this._sum.x += length * midX;
      const midY = (point.y + nextPoint.y) / 2;
      this._sum.y += length * midY;
    }
  }

  /**
   * Get the centroid point
   * @return centroid point
   */
  public getCentroid(): Point {
    return Point.createFromXY(
      this._sum.x / this._totalLength,
      this._sum.y / this._totalLength,
    );
  }
}
