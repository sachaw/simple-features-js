import { GeometryCollection, GeometryType, MultiCurve } from "./internal.ts";
import type { LineString } from "./internal.ts";

/**
 * A restricted form of MultiCurve where each Curve in the collection must be of
 * type LineString.
 */
export class MultiLineString extends MultiCurve<LineString> {
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
   * Create an empty multi line string
   * @returns multi line string
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): MultiLineString {
    return new MultiLineString(GeometryType.MultiLineString, hasZ, hasM);
  }

  /**
   * Create a multi line string
   * @param lineString line string
   * @returns multi line string
   */
  public static createFromLineString(
    lineString: LineString,
  ): MultiLineString {
    const multiLineString = MultiLineString.create(
      lineString.hasZ,
      lineString.hasM,
    );
    multiLineString.addLineString(lineString);
    return multiLineString;
  }

  /**
   * Create a multi line string
   * @param lineStrings line strings
   * @returns multi line string
   */
  public static createFromLineStrings(
    lineStrings: LineString[],
  ): MultiLineString {
    const hasZ = GeometryCollection.hasZ(lineStrings);
    const hasM = GeometryCollection.hasM(lineStrings);
    const multiLineString = MultiLineString.create(hasZ, hasM);
    multiLineString.lineStrings = lineStrings;
    return multiLineString;
  }

  /**
   * Get the line strings
   * @return line strings
   */
  public get lineStrings(): LineString[] {
    return this.getCurves();
  }

  /**
   * Set the line strings
   *
   * @param lineStrings line strings
   */
  public set lineStrings(lineStrings: LineString[]) {
    this.setCurves(lineStrings);
  }

  /**
   * Add a line string
   *
   * @param lineString line string
   */
  public addLineString(lineString: LineString): void {
    this.addCurve(lineString);
  }

  /**
   * Add line strings
   *
   * @param lineStrings line strings
   */
  public addLineStrings(lineStrings: LineString[]): void {
    this.addCurves(lineStrings);
  }

  /**
   * Get the number of line strings
   *
   * @return number of line strings
   */
  public numLineStrings(): number {
    return this.numCurves();
  }

  /**
   * Returns the Nth line string
   * @param n nth line string to return
   * @return line string
   */
  public getLineString(n: number): LineString {
    return this.getCurve(n);
  }

  /**
   * {@inheritDoc}
   */
  public copy(): MultiLineString {
    const multiLineStringCopy = MultiLineString.create(
      this.hasZ,
      this.hasM,
    );
    for (const lineString of this.lineStrings) {
      multiLineStringCopy.addLineString(lineString.copy());
    }
    return multiLineStringCopy;
  }
}
