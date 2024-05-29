import { GeometryType, PolyhedralSurface } from "./internal.ts";
import type { Polygon } from "./internal.ts";

/**
 * A tetrahedron (4 triangular faces), corner at the origin and each unit
 * coordinate digit.
 */
export class TIN extends PolyhedralSurface {
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
   * Create an empty TIN
   * @returns TIN
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): TIN {
    return new TIN(GeometryType.Tin, hasZ, hasM);
  }

  /**
   * Create a TIN from a polygon
   * @param polygon polygon
   * @returns TIN
   */
  public static createFromPolygon(
    polygon: Polygon,
  ): TIN {
    const tin = TIN.create(polygon.hasZ, polygon.hasM);
    tin.addPolygon(polygon);
    return tin;
  }

  /**
   * Create a TIN from polygons
   * @param polygons polygons
   * @returns TIN
   */
  public static createFromPolygons(
    polygons: Polygon[],
  ): TIN {
    const tin = TIN.create(polygons[0].hasZ, polygons[0].hasM);
    tin.polygons = polygons;
    return tin;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): TIN {
    const tinCopy = TIN.create(this.hasZ, this.hasM);
    for (const polygon of this.polygons) {
      tinCopy.addPolygon(polygon.copy());
    }
    return tinCopy;
  }
}
