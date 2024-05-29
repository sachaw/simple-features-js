import type { LineString } from "./mod.ts";
import { GeometryType, Polygon } from "./mod.ts";

/**
 * Triangle
 */
export class Triangle extends Polygon {
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
  ): Triangle {
    return new Triangle(GeometryType.Triangle, hasZ, hasM);
  }

  public static createFromLineString(lineString: LineString): Triangle {
    const triangle = Triangle.create(false, false);
    triangle.addRing(lineString);
    return triangle;
  }

  public static createFromLineStrings(lineStrings: LineString[]): Triangle {
    const triangle = Triangle.create(false, false);
    triangle.rings = lineStrings;
    return triangle;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): Triangle {
    const newTriangle = Triangle.create(this.hasZ, this.hasM);
    for (const ring of this.rings) {
      newTriangle.addRing(ring.copy());
    }
    return newTriangle;
  }
}
