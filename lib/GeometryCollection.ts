import {
  Curve,
  Geometry,
  GeometryType,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  SFException,
  Surface,
  UnsupportedOperationException,
} from "./internal.ts";

/**
 * A collection of zero or more Geometry instances.
 * @param <T> geometry type
 */
export class GeometryCollection<T extends Geometry = Geometry>
  extends Geometry {
  /**
   * List of geometries
   */
  private _geometries: T[] = [];

  /**
   * Constructor
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
    this._geometries = [];
  }

  /**
   * Create a geometry collection
   * @returns geometry collection
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): GeometryCollection {
    return new GeometryCollection(GeometryType.GeometryCollection, hasZ, hasM);
  }

  /**
   * Create a geometry collection
   * @param geometries geometries
   * @returns geometry collection
   */
  public static createFromGeometries(
    geometries: Geometry[],
  ): GeometryCollection {
    const hasZ = Geometry.hasZ(geometries);
    const hasM = Geometry.hasM(geometries);
    const geometryCollection = GeometryCollection.create(hasZ, hasM);
    geometryCollection.geometries = geometries;
    return geometryCollection;
  }

  /**
   * Create a geometry collection
   * @param geometry geometry
   * @returns geometry collection
   */
  public static createFromGeometry(
    geometry: Geometry,
  ): GeometryCollection {
    const hasZ = geometry.hasZ;
    const hasM = geometry.hasM;
    const geometryCollection = GeometryCollection.create(hasZ, hasM);
    geometryCollection.addGeometry(geometry);
    return geometryCollection;
  }

  /**
   * Get the list of geometries
   * @returnsgeometries
   */
  public get geometries(): T[] {
    return this._geometries;
  }

  /**
   * Set the geometries
   * @param geometries geometries
   */
  public set geometries(geometries: T[]) {
    this._geometries = [];
    for (const geometry of geometries) {
      this.addGeometry(geometry);
    }
  }

  /**
   * Add a geometry
   * @param geometry geometry
   */
  public addGeometry(geometry: T): void {
    this._geometries.push(geometry);
    this.updateZM(geometry);
  }

  /**
   * Add geometries
   * @param geometries geometries
   */
  public addGeometries(geometries: T[]): void {
    for (const geometry of geometries) {
      this.addGeometry(geometry);
    }
  }

  /**
   * Get the number of geometries in the collection
   *
   * @returnsnumber of geometries
   */
  public numGeometries(): number {
    return this._geometries.length;
  }

  /**
   * Returns the Nth geometry
   * @param n nth geometry to return
   * @returnsgeometry
   */
  public getGeometry(n: number): T {
    return this._geometries[n];
  }

  /**
   * Get the collection type by evaluating the geometries
   * @returnscollection geometry type, one of:
   * {@link GeometryType#MULTIPOINT},
   * {@link GeometryType#MULTILINESTRING},
   * {@link GeometryType#MULTIPOLYGON},
   * {@link GeometryType#MULTICURVE},
   * {@link GeometryType#MULTISURFACE},
   * {@link GeometryType#GEOMETRYCOLLECTION}
   */
  public getCollectionType(): GeometryType {
    let geometryType: GeometryType = this.geometryType;

    switch (geometryType) {
      case GeometryType.MultiPoint:
      case GeometryType.MultiLineString:
      case GeometryType.MultiPolygon:
        break;
      case GeometryType.GeometryCollection:
      case GeometryType.MultiCurve:
      case GeometryType.MultiSurface: {
        if (this.isMultiPoint()) {
          geometryType = GeometryType.MultiPoint;
        } else if (this.isMultiLineString()) {
          geometryType = GeometryType.MultiLineString;
        } else if (this.isMultiPolygon()) {
          geometryType = GeometryType.MultiPolygon;
        } else if (this.isMultiCurve()) {
          geometryType = GeometryType.MultiCurve;
        } else if (this.isMultiSurface()) {
          geometryType = GeometryType.MultiSurface;
        }
        break;
      }
      default:
        throw new SFException(
          `Unexpected Geometry Collection Type: ${geometryType}`,
        );
    }

    return geometryType;
  }

  /**
   * Determine if this geometry collection is a {@link MultiPoint} instance or
   * contains only {@link Point} geometries
   * @returns true if a multi point or contains only points
   */
  public isMultiPoint(): boolean {
    let isMultiPoint = this instanceof MultiPoint;
    if (!isMultiPoint) {
      isMultiPoint = this.isCollectionOfType(Point);
    }
    return isMultiPoint;
  }

  /**
   * Get as a {@link MultiPoint}, either the current instance or newly created
   * from the {@link Point} geometries
   *
   * @returnsmulti point
   */
  public getAsMultiPoint(): MultiPoint {
    let multiPoint: MultiPoint;
    if (this instanceof MultiPoint) {
      multiPoint = this;
    } else {
      multiPoint = MultiPoint.createFromPoints(
        this._geometries as unknown as Point[],
      );
    }
    return multiPoint;
  }

  /**
   * Determine if this geometry collection is a {@link MultiLineString}
   * instance or contains only {@link LineString} geometries
   * @returns true if a multi line string or contains only line strings
   */
  public isMultiLineString(): boolean {
    let isMultiLineString: boolean = this instanceof MultiLineString;
    if (!isMultiLineString) {
      isMultiLineString = this.isCollectionOfType(LineString);
    }
    return isMultiLineString;
  }

  /**
   * Get as a {@link MultiLineString}, either the current instance or newly
   * created from the {@link LineString} geometries
   * @returnsmulti line string
   */
  public getAsMultiLineString(): MultiLineString {
    let multiLineString: MultiLineString;
    if (this instanceof MultiLineString) {
      multiLineString = this;
    } else {
      multiLineString = MultiLineString.createFromLineStrings(
        this._geometries as unknown as LineString[],
      );
    }
    return multiLineString;
  }

  /**
   * Determine if this geometry collection is a {@link MultiPolygon} instance
   * or contains only {@link Polygon} geometries
   * @returns true if a multi polygon or contains only polygons
   */
  public isMultiPolygon(): boolean {
    let isMultiPolygon: boolean = this instanceof MultiPolygon;
    if (!isMultiPolygon) {
      isMultiPolygon = this.isCollectionOfType(Polygon);
    }
    return isMultiPolygon;
  }

  /**
   * Get as a {@link MultiPolygon}, either the current instance or newly
   * created from the {@link Polygon} geometries
   *
   * @returnsmulti polygon
   */
  public getAsMultiPolygon(): MultiPolygon {
    let multiPolygon: MultiPolygon;
    if (this instanceof MultiPolygon) {
      multiPolygon = this;
    } else {
      multiPolygon = MultiPolygon.createFromPolygons(
        this._geometries as unknown as Polygon[],
      );
    }
    return multiPolygon;
  }

  /**
   * Determine if this geometry collection contains only {@link Curve}
   * geometries
   * @returns true if contains only curves
   */
  public isMultiCurve(): boolean {
    let isMultiCurve: boolean = this instanceof MultiLineString;
    if (!isMultiCurve) {
      isMultiCurve = this.isCollectionOfType(Curve);
    }
    return isMultiCurve;
  }

  /**
   * Get as a Multi Curve, a {@link Curve} typed Geometry Collection
   * @returnsmulti curve
   */
  public getAsMultiCurve(): GeometryCollection {
    let multiCurve: GeometryCollection;
    if (this instanceof MultiLineString) {
      multiCurve = GeometryCollection.createFromGeometries(this.geometries);
    } else {
      multiCurve = this;
      if (!multiCurve.isEmpty()) {
        const curve = multiCurve.getGeometry(0);
      }
    }
    return multiCurve;
  }

  /**
   * Determine if this geometry collection contains only {@link Surface}
   * geometries
   *
   * @returns true if contains only surfaces
   */
  public isMultiSurface(): boolean {
    let isMultiSurface = this instanceof MultiPolygon;
    if (!isMultiSurface) {
      isMultiSurface = this.isCollectionOfType(Surface);
    }
    return isMultiSurface;
  }

  /**
   * Get as a Multi Surface, a {@link Surface} typed Geometry Collection
   * @returnsmulti surface
   */
  public getAsMultiSurface(): GeometryCollection {
    let multiSurface: GeometryCollection;
    if (this instanceof MultiPolygon) {
      multiSurface = GeometryCollection.createFromGeometries(
        this.geometries,
      );
    } else {
      multiSurface = this as unknown as GeometryCollection<T>;
      if (!multiSurface.isEmpty()) {
        const surface: Surface = multiSurface.getGeometry(0);
      }
    }
    return multiSurface;
  }

  /**
   * Get as a top level Geometry Collection
   * @returnsgeometry collection
   */
  public getAsGeometryCollection(): GeometryCollection {
    return GeometryCollection.createFromGeometries(this.geometries);
  }

  /**
   * Determine if the geometries in this collection are made up only of the
   * provided geometry class type
   * @param type geometry class type
   * @returns true if a collection of the type
   */
  private isCollectionOfType(type: any): boolean {
    let isType = true;
    for (const geometry of this._geometries) {
      if (!(geometry instanceof type)) {
        isType = false;
        break;
      }
    }
    return isType;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): Geometry {
    const hasZ = this.hasZ;
    const hasM = this.hasM;
    const geometryCollectionCopy = GeometryCollection.create(hasZ, hasM);
    for (const geometry of this.geometries) {
      geometryCollectionCopy.addGeometry(geometry);
    }
    return geometryCollectionCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isEmpty(): boolean {
    return this._geometries.length === 0;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    throw new UnsupportedOperationException(
      "Is Simple not implemented for GeometryCollection",
    );
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: Geometry): boolean {
    let equals = true;
    if (
      obj instanceof GeometryCollection &&
      this.numGeometries() === obj.numGeometries()
    ) {
      for (let i = 0; i < this.numGeometries(); i++) {
        if (!this.getGeometry(i).equals(obj.getGeometry(i))) {
          equals = false;
          break;
        }
      }
    } else {
      equals = false;
    }
    return equals;
  }
}
