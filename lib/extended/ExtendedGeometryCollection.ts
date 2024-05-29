import type { Geometry } from "../internal.ts";
import { GeometryCollection, GeometryType, SFException } from "../internal.ts";

/**
 * Extended Geometry Collection providing abstract geometry collection type
 * support
 *
 * @param <T> geometry type
 */
export class ExtendedGeometryCollection<T extends Geometry = Geometry>
  extends GeometryCollection<T> {
  /**
   * Extended geometry collection geometry type
   */
  private _editableGeometryType: GeometryType | undefined;

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
  ): ExtendedGeometryCollection {
    return new ExtendedGeometryCollection(
      GeometryType.GeometryCollection,
      hasZ,
      hasM,
    );
  }

  public static createFromGeometryCollection(
    geometryCollection: GeometryCollection,
  ): ExtendedGeometryCollection {
    const extendedGeometryCollection = ExtendedGeometryCollection.create(
      geometryCollection.hasZ,
      geometryCollection.hasM,
    );

    // TODO: This shouldnt be required to be set
    extendedGeometryCollection.geometryType = GeometryType.GeometryCollection;

    for (const geometry of geometryCollection.geometries) {
      extendedGeometryCollection.addGeometry(geometry);
    }
    extendedGeometryCollection.updateGeometryType();
    return extendedGeometryCollection;
  }

  /**
   * Update the extended geometry type based upon the contained geometries
   */
  public updateGeometryType(): void {
    let geometryType = this.getCollectionType();
    switch (geometryType) {
      case GeometryType.GeometryCollection:
      case GeometryType.MultiCurve:
      case GeometryType.MultiSurface:
        break;
      case GeometryType.MultiPoint: {
        geometryType = GeometryType.GeometryCollection;
        break;
      }
      case GeometryType.MultiLineString: {
        geometryType = GeometryType.MultiCurve;
        break;
      }
      case GeometryType.MultiPolygon: {
        geometryType = GeometryType.MultiSurface;
        break;
      }
      default:
        throw new SFException(
          `Unsupported extended geometry collection geometry type: ${geometryType}`,
        );
    }
    this.geometryType = geometryType;
  }

  /**
   * {@inheritDoc}
   */
  public get geometryType(): GeometryType {
    if (!this._editableGeometryType) {
      throw new SFException("Geometry type is not editable");
    }
    return this._editableGeometryType;
  }

  /**
   * {@inheritDoc}
   */
  public set geometryType(geometryType: GeometryType) {
    this._editableGeometryType = geometryType;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): ExtendedGeometryCollection {
    const extendedGeometryCollectionCopy = ExtendedGeometryCollection.create(
      this.hasZ,
      this.hasM,
    );
    for (const geometry of this.geometries) {
      extendedGeometryCollectionCopy.addGeometry(geometry.copy());
    }
    extendedGeometryCollectionCopy._editableGeometryType =
      this._editableGeometryType;
    return extendedGeometryCollectionCopy;
  }

  /**
   * {@inheritDoc}
   */
  public equals(
    obj: Geometry,
  ): boolean {
    return (
      obj instanceof ExtendedGeometryCollection &&
      this.geometryType === obj.geometryType
    );
  }
}
