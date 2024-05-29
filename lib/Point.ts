import { Geometry, GeometryType } from "./internal.ts";

/**
 * A single location in space. Each point has an X and Y coordinate. A point MAY
 * optionally also have a Z and/or an M value.
 */
export class Point extends Geometry {
  /**
   * X coordinate
   */
  private _x: number;

  /**
   * Y coordinate
   */
  private _y: number;

  /**
   * Z coordinate
   */
  private _z: number | undefined;

  /**
   * M value
   */
  private _m: number | undefined;

  /**
   * Constructor
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
    this._x = 0;
    this._y = 0;
  }

  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): Point {
    return new Point(GeometryType.Point, hasZ, hasM);
  }

  public static createFromXY(x: number, y: number): Point {
    const point = Point.create();
    point.x = x;
    point.y = y;
    return point;
  }

  public static createFromXYZ(x: number, y: number, z: number): Point {
    const point = Point.create(true);
    point.x = x;
    point.y = y;
    point.z = z;
    return point;
  }

  public static createFromXYZM(
    x: number,
    y: number,
    z: number,
    m: number,
  ): Point {
    const point = Point.create(true, true);
    point.x = x;
    point.y = y;
    point.z = z;
    point.m = m;
    return point;
  }

  /**
   * Get x
   * @return x
   */
  public get x(): number {
    return this._x;
  }

  /**
   * Set y
   * @param x
   */
  public set x(x: number) {
    this._x = x;
  }

  /**
   * Get y
   * @return y
   */
  public get y(): number {
    return this._y;
  }

  /**
   * Set y
   * @param y
   */
  public set y(y: number) {
    this._y = y;
  }

  /**
   * Get z
   * @return z
   */
  public get z(): number | undefined {
    return this._z;
  }

  /**
   * Set z
   * @param z
   */
  public set z(z: number | undefined) {
    this._z = z;
    this.hasZ = z !== undefined;
  }

  /**
   * Get m
   *
   * @return m
   */
  public get m(): number | undefined {
    return this._m;
  }

  /**
   * Set m
   * @param m
   */
  public set m(m: number | undefined) {
    this._m = m;
    this.hasM = m !== undefined;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): Point {
    const pointCopy = Point.create(this.hasZ, this.hasM);
    pointCopy.x = this.x;
    pointCopy.y = this.y;
    pointCopy.z = this.z;
    pointCopy.m = this.m;
    return pointCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isEmpty(): boolean {
    return false;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    return true;
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: Point): boolean {
    return (
      super.equals(obj) &&
      obj instanceof Point &&
      this.m === obj.m &&
      this.z === obj.z &&
      this.x === obj.x &&
      this.y === obj.y
    );
  }
}
