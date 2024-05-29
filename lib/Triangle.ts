import type { LineString } from "./internal.ts";
import { GeometryType, Polygon } from "./internal.ts";

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

  /**
   * Create a triangle
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): Triangle {
    return new Triangle(GeometryType.Triangle, hasZ, hasM);
  }

  /**
   * Create a triangle
   * @param lineString line string
   * @returns triangle
   */
  public static createFromLineString(lineString: LineString): Triangle {
    const triangle = Triangle.create(false, false);
    triangle.addRing(lineString);
    return triangle;
  }

  /**
   * Create a triangle
   * @param lineStrings line strings
   * @returns triangle
   */
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
