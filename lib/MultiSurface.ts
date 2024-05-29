import type { GeometryType, Surface } from "./internal.ts";
import { GeometryCollection } from "./internal.ts";

/**
 * A restricted form of GeometryCollection where each Geometry in the collection
 * must be of type Surface.
 *
 * @param <T> surface type
 */
export abstract class MultiSurface<
  T extends Surface,
> extends GeometryCollection<T> {
  /**
   * Constructor
   *
   * @param type geometry type
   * @param hasZ has z
   * @param hasM has m
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
  }

  /**
   * Get the surfaces
   * @returnssurfaces
   */
  public getSurfaces(): T[] {
    return this.geometries;
  }

  /**
   * Set the surfaces
   * @param surfaces surfaces
   */
  public setSurfaces(surfaces: T[]): void {
    this.geometries = surfaces;
  }

  /**
   * Add a surface
   * @param surface surface
   */
  public addSurface(surface: T): void {
    this.addGeometry(surface);
  }

  /**
   * Add surfaces
   *
   * @param surfaces surfaces
   */
  public addSurfaces(surfaces: T[]): void {
    this.addGeometries(surfaces);
  }

  /**
   * Get the number of surfaces
   * @returnsnumber of surfaces
   */
  public numSurfaces(): number {
    return this.numGeometries();
  }

  /**
   * Returns the Nth surface
   * @param n nth line surface to return
   * @returnssurface
   */
  public getSurface(n: number): T {
    return this.getGeometry(n);
  }
}
