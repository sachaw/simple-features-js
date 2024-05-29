import { Geometry, GeometryType, LineString } from "./internal.ts";
import type { Point } from "./internal.ts";

/**
 * A LineString with exactly 2 Points.
 */
export class Line extends LineString {
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
  ): Line {
    // TODO: Check if it should have it's own GeometryType
    return new Line(GeometryType.LineString, hasZ, hasM);
  }

  public static createFromPoints(points: Point[]): Line {
    const hasZ = Geometry.hasZ(points);
    const hasM = Geometry.hasM(points);
    const line = Line.create(hasZ, hasM);
    for (const point of points) {
      line.addPoint(point);
    }
    return line;
  }

  public static createFromTwoPoints(point1: Point, point2: Point): Line {
    const hasZ = point1.hasZ || point2.hasZ;
    const hasM = point1.hasM || point2.hasM;
    const line = Line.create(hasZ, hasM);
    line.addPoint(point1);
    line.addPoint(point2);
    return line;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): Line {
    const lineCopy = Line.create(this.hasZ, this.hasM);
    for (const point of this.points) {
      lineCopy.addPoint(point.copy());
    }
    return lineCopy;
  }
}
