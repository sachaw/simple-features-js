import type { Point } from "./mod.ts";
import { Geometry, GeometryType, LineString, SFException } from "./mod.ts";

/**
 * A LineString that is both closed and simple.
 */
export class LinearRing extends LineString {
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
   * Create an empty linear ring
   * @return linear ring
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): LinearRing {
    // TODO: Check if it should have it's own GeometryType
    return new LinearRing(GeometryType.LineString, hasZ, hasM);
  }

  /**
   * Create a linear ring
   * @param points points
   * @return linear ring
   */
  public static createFromPoints(points: Point[]): LinearRing {
    const hasZ = Geometry.hasZ(points);
    const hasM = Geometry.hasM(points);
    const linearRing = LinearRing.create(hasZ, hasM);
    linearRing.points = points;
    return linearRing;
  }

  /**
   * {@inheritDoc}
   */
  public set points(points: Point[]) {
    super.points = points;
    if (!this.isEmpty()) {
      if (!this.isClosed()) {
        this.addPoint(points[0]);
      }
      if (this.numPoints() < 4) {
        throw new SFException(
          "A closed linear ring must have at least four points.",
        );
      }
    }
  }

  /**
   * {@inheritDoc}
   */
  public copy(): LinearRing {
    const linearRingCopy = LinearRing.create(this.hasZ, this.hasM);
    for (const point of this.points) {
      linearRingCopy.addPoint(point.copy());
    }
    return linearRingCopy;
  }
}
