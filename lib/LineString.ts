import type { Point } from "./internal.ts";
import {
  Curve,
  Geometry,
  GeometryType,
  SFException,
  ShamosHoey,
} from "./internal.ts";

/**
 * A Curve that connects two or more points in space.
 */
export class LineString extends Curve {
  /**
   * List of points
   */
  private _points: Point[];

  /**
   * Constructor
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
    this._points = [];
  }

  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): LineString {
    return new LineString(GeometryType.LineString, hasZ, hasM);
  }

  public static createFromPoints(points: Point[]): LineString {
    const hasZ = Geometry.hasZ(points);
    const hasM = Geometry.hasM(points);
    const lineString = LineString.create(hasZ, hasM);
    lineString.addPoints(points);
    return lineString;
  }

  /**
   * Get the points
   * @return points
   */
  public get points(): Point[] {
    return this._points;
  }

  /**
   * Set the points
   * @param points points
   */
  public set points(points: Point[]) {
    this._points = points;
  }

  /**
   * Add a point
   * @param point point
   */
  public addPoint(point: Point): void {
    this._points.push(point);
    this.updateZM(point);
  }

  /**
   * Add points
   * @param points points
   */
  public addPoints(points: Point[]): void {
    for (const point of points) {
      this.addPoint(point);
    }
  }

  /**
   * Get the number of points
   * @return number of points
   */
  public numPoints(): number {
    return this._points.length;
  }

  /**
   * Returns the Nth point
   * @param n nth point to return
   * @return point
   */
  public getPoint(n: number): Point {
    return this._points[n];
  }

  /**
   * {@inheritDoc}
   */
  public startPoint(): Point {
    let startPoint: Point | undefined;
    if (!this.isEmpty()) {
      startPoint = this._points[0];
    }

    if (!startPoint) {
      throw new SFException("No start point");
    }

    return startPoint;
  }

  /**
   * {@inheritDoc}
   */
  public endPoint(): Point {
    let endPoint: Point | undefined;
    if (!this.isEmpty()) {
      endPoint = this._points[this._points.length - 1];
    }

    if (!endPoint) {
      throw new SFException("No end point");
    }

    return endPoint;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    return ShamosHoey.simplePolygonPoints(this._points);
  }

  /**
   * {@inheritDoc}
   */
  public copy(): LineString {
    const lineStringCopy = LineString.create(
      this.hasZ,
      this.hasM,
    );
    for (const point of this.points) {
      lineStringCopy.addPoint(point.copy());
    }
    return lineStringCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isEmpty(): boolean {
    return this._points.length === 0;
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: LineString): boolean {
    let equal = true;
    if (obj instanceof LineString && this.numPoints() === obj.numPoints()) {
      for (let i = 0; i < this._points.length; i++) {
        if (!this.getPoint(i).equals(obj.getPoint(i))) {
          equal = false;
          break;
        }
      }
    } else {
      equal = false;
    }
    return equal;
  }
}
