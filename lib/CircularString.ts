import type { Point } from "./mod.ts";
import { Geometry, GeometryType, LineString } from "./mod.ts";

/**
 * Circular String, Curve sub type
 */
export class CircularString extends LineString {
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

  /**
   * Create an empty circular string
   * @returns circular string
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): CircularString {
    return new CircularString(GeometryType.CircularString, hasZ, hasM);
  }

  /**
   * Create a circular string
   * @param hasZ has Z values
   * @param hasM has M values
   * @param points points
   * @returns circular string
   */
  public static createFromPoints(points: Point[]): CircularString {
    const hasZ = Geometry.hasZ(points);
    const hasM = Geometry.hasM(points);
    const circularString = CircularString.create(hasZ, hasM);
    for (const point of points) {
      circularString.addPoint(point);
    }
    return circularString;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): CircularString {
    const circularStringCopy = CircularString.create(
      this.hasZ,
      this.hasM,
    );
    for (const point of this.points) {
      circularStringCopy.addPoint(point.copy());
    }
    return circularStringCopy;
  }
}
