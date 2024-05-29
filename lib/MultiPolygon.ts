import type { Curve, Polygon } from "./internal.ts";
import { Geometry, GeometryType, MultiSurface } from "./internal.ts";

/**
 * A restricted form of MultiSurface where each Surface in the collection must
 * be of type Polygon.
 */
export class MultiPolygon extends MultiSurface<Polygon> {
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
   * Create a multi polygon
   * @param hasZ has z
   * @param hasM has m
   * @returns multi polygon
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): MultiPolygon {
    return new MultiPolygon(GeometryType.MultiPolygon, hasZ, hasM);
  }

  /**
   * Create a multi polygon from polygons
   * @param polygons polygons
   * @returns multi polygon
   */
  public static createFromPolygons(
    polygons: Polygon[],
  ): MultiPolygon {
    const hasZ = Geometry.hasZ(polygons);
    const hasM = Geometry.hasM(polygons);
    const multiPolygon = MultiPolygon.create(hasZ, hasM);
    multiPolygon.polygons = polygons;
    return multiPolygon;
  }

  /**
   * Get the polygons
   * @returnspolygons
   */
  public get polygons(): Polygon[] {
    return this.getSurfaces();
  }

  /**
   * Set the polygons
   * @param polygons polygons
   */
  public set polygons(polygons: Polygon[]) {
    this.setSurfaces(polygons);
  }

  /**
   * Add a polygon
   * @param polygon polygon
   */
  public addPolygon(polygon: Polygon): void {
    this.addSurface(polygon);
  }

  /**
   * Add polygons
   * @param polygons polygons
   */
  public addPolygons(polygons: Polygon[]): void {
    this.addSurfaces(polygons);
  }

  /**
   * Get the number of polygons
   * @returnsnumber of polygons
   */
  public numPolygons(): number {
    return this.numSurfaces();
  }

  /**
   * Returns the Nth polygon
   * @param n  nth polygon to return
   * @returnspolygon
   */
  public getPolygon(n: number): Polygon {
    return this.getSurface(n);
  }

  /**
   * {@inheritDoc}
   */
  public copy(): MultiPolygon {
    const hasZ = this.hasZ;
    const hasM = this.hasM;
    const multiPolygonCopy = MultiPolygon.create(hasZ, hasM);
    for (const polygon of this.polygons) {
      multiPolygonCopy.addPolygon(polygon.copy());
    }
    return multiPolygonCopy;
  }
}
