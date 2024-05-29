import type { LineString } from "./internal.ts";
import { CurvePolygon, GeometryType, ShamosHoey } from "./internal.ts";

/**
 * A restricted form of CurvePolygon where each ring is defined as a simple,
 * closed LineString.
 */
export class Polygon extends CurvePolygon<LineString> {
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
  ): Polygon {
    return new Polygon(GeometryType.Polygon, hasZ, hasM);
  }

  public static createFromLineString(
    lineString: LineString,
  ): Polygon {
    const polygon = Polygon.create(
      lineString.hasZ,
      lineString.hasM,
    );
    polygon.addRing(lineString);
    return polygon;
  }

  public static createFromLineStrings(
    lineStrings: LineString[],
  ): Polygon {
    const polygon = Polygon.create(false, false);
    for (const lineString of lineStrings) {
      polygon.addRing(lineString);
    }
    return polygon;
  }

  /**
   * {@inheritDoc}
   */
  public copy(): Polygon {
    const polygonCopy = Polygon.create(this.hasZ, this.hasM);
    for (const ring of this.rings) {
      polygonCopy.addRing(ring.copy());
    }
    return polygonCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    return ShamosHoey.simplePolygon(this);
  }
}
