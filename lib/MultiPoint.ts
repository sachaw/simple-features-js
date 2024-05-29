import type { Point } from "./mod.ts";
import { Geometry, GeometryCollection, GeometryType } from "./mod.ts";

/**
 * A restricted form of GeometryCollection where each Geometry in the collection
 * must be of type Point.
 */
export class MultiPoint extends GeometryCollection<Point> {
  /**
   * Constructor
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
  }

  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): MultiPoint {
    return new MultiPoint(GeometryType.MultiPoint, hasZ, hasM);
  }

  public static createFromPoints(points: Point[]): MultiPoint {
    const hasZ = Geometry.hasZ(points);
    const hasM = Geometry.hasM(points);
    const multiPoint = MultiPoint.create(hasZ, hasM);
    for (const point of points) {
      multiPoint.addPoint(point);
    }
    return multiPoint;
  }

  /**
   * Get the points
   * @return points
   */
  public get points(): Point[] {
    return this.geometries;
  }

  /**
   * Set the points
   * @param points points
   */
  public set points(points: Point[]) {
    this.geometries = points;
  }

  /**
   * Add a point
   * @param point point
   */
  public addPoint(point: Point): void {
    this.addGeometry(point);
  }

  /**
   * Add points
   * @param points points
   */
  public addPoints(points: Point[]): void {
    this.addGeometries(points);
  }

  /**
   * Get the number of points
   * @return number of points
   */
  public numPoints(): number {
    return this.numGeometries();
  }

  /**
   * Returns the Nth point
   *
   * @param n nth point to return
   * @return point
   */
  public getPoint(n: number): Point {
    return this.getGeometry(n);
  }

  /**
   * {@inheritDoc}
   */
  public copy(): MultiPoint {
    const multiPointCopy = MultiPoint.create(this.hasZ, this.hasM);
    for (const point of this.points) {
      multiPointCopy.addPoint(point.copy());
    }
    return multiPointCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    return (
      this.points.filter((pA, index) => {
        return this.points.findIndex((pB) => pA.equals(pB)) === index;
      }).length === this.numPoints()
    );
  }
}
