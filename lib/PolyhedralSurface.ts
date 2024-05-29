import type { Polygon } from "./internal.ts";
import {
  Geometry,
  GeometryType,
  Surface,
  UnsupportedOperationException,
} from "./internal.ts";

/**
 * Contiguous collection of polygons which share common boundary segments.
 */
export class PolyhedralSurface extends Surface {
  /**
   * List of polygons
   */
  private _polygons: Polygon[];

  /**
   * Constructor
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
    this._polygons = [];
  }

  /**
   * Create a polyhedral surface
   * @param hasZ has z
   * @param hasM has m
   * @returns polyhedral surface
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): PolyhedralSurface {
    return new PolyhedralSurface(GeometryType.PolyhedralSurface, hasZ, hasM);
  }

  /**
   * Create a polyhedral surface from a polygon
   * @param polygon polygon
   * @returns polyhedral surface
   */
  public static createFromPolygon(
    polygon: Polygon,
  ): PolyhedralSurface {
    const polyhedralSurface = PolyhedralSurface.create(
      polygon.hasZ,
      polygon.hasM,
    );
    polyhedralSurface.addPolygon(polygon);
    return polyhedralSurface;
  }

  /**
   * Create a polyhedral surface from polygons
   * @param polygons polygons
   * @returns polyhedral surface
   */
  public static createFromPolygons(
    polygons: Polygon[],
  ): PolyhedralSurface {
    const polyhedralSurface = PolyhedralSurface.create(
      Geometry.hasZ(polygons),
      Geometry.hasM(polygons),
    );
    polyhedralSurface.polygons = polygons;
    return polyhedralSurface;
  }

  /**
   * Get polygons
   * @returnspolygons
   */
  public get polygons(): Polygon[] {
    return this._polygons;
  }

  /**
   * Set polygons
   *
   * @param polygons polygons
   */
  public set polygons(polygons: Polygon[]) {
    this._polygons = polygons;
  }

  /**
   * Get patches
   *
   * @returnspatches
   * @see #getPolygons()
   */
  public get patches(): Polygon[] {
    return this._polygons;
  }

  /**
   * Set patches
   *
   * @param patches patches
   * @see #setPolygons(List)
   */
  public set patches(polygons: Polygon[]) {
    this._polygons = polygons;
  }

  /**
   * Add polygon
   * @param polygon polygon
   */
  public addPolygon(polygon: Polygon): void {
    this._polygons.push(polygon);
    this.updateZM(polygon);
  }

  /**
   * Add patch
   * @param patch patch
   * @see #addPolygon(Polygon)
   */
  public addPatch(patch: Polygon): void {
    this.addPolygon(patch);
  }

  /**
   * Add polygons
   * @param polygons polygons
   */
  public addPolygons(polygons: Polygon[]): void {
    for (const polygon of polygons) {
      this.addPolygon(polygon);
    }
  }

  /**
   * Add patches
   * @param patches patches
   * @see #addPolygons(List)
   */
  public addPatches(patches: Polygon[]): void {
    this.addPolygons(patches);
  }

  /**
   * Get the number of polygons
   * @returnsnumber of polygons
   */
  public numPolygons(): number {
    return this._polygons.length;
  }

  /**
   * Get the number of polygons
   * @returnsnumber of polygons
   * @see #numPolygons()
   */
  public numPatches(): number {
    return this.numPolygons();
  }

  /**
   * Get the Nth polygon
   * @param n nth polygon to return
   * @returnspolygon
   */
  public getPolygon(n: number): Polygon {
    return this._polygons[n];
  }

  /**
   * Get the Nth polygon patch
   * @param n nth polygon patch to return
   * @returnspolygon patch
   * @see #getPolygon(int)
   */
  public getPatch(n: number): Polygon {
    return this.getPolygon(n);
  }

  /**
   * {@inheritDoc}
   */
  public copy(): PolyhedralSurface {
    const polyhedralSurfaceCopy = PolyhedralSurface.create(
      this.hasZ,
      this.hasM,
    );
    for (const polygon of this.polygons) {
      polyhedralSurfaceCopy.addPolygon(polygon.copy());
    }
    return polyhedralSurfaceCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isEmpty(): boolean {
    return this._polygons.length === 0;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    throw new UnsupportedOperationException(
      "Is Simple not implemented for PolyhedralSurface",
    );
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: PolyhedralSurface): boolean {
    let equal = true;
    if (
      obj instanceof PolyhedralSurface &&
      this.numPatches() === obj.numPatches()
    ) {
      for (let i = 0; i < this.numPatches(); i++) {
        if (!this.getPatch(i).equals(obj.getPatch(i))) {
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
