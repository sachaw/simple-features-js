import type { Point } from "./internal.ts";
import {
  Curve,
  Geometry,
  GeometryType,
  type LineString,
  SFException,
  ShamosHoey,
} from "./internal.ts";

/**
 * Compound Curve, Curve sub type
 */
export class CompoundCurve extends Curve {
  /**
   * List of line strings
   */
  private _lineStrings: LineString[];

  /**
   * Constructor
   */
  protected constructor(
    geometryType: GeometryType,
    hasZ?: boolean,
    hasM?: boolean,
  ) {
    super(geometryType, hasZ, hasM);
    this._lineStrings = [];
  }

  /**
   * Create an empty compound curve
   * @return compound curve
   */
  public static create(
    hasZ?: boolean,
    hasM?: boolean,
  ): CompoundCurve {
    return new CompoundCurve(GeometryType.CompoundCurve, hasZ, hasM);
  }

  /**
   * Create a compound curve
   * @param hasZ has Z values
   * @param hasM has M values
   * @param lineStrings line strings
   * @return compound curve
   */
  public static createFromLineStrings(
    lineStrings: LineString[],
  ): CompoundCurve {
    const hasZ = Geometry.hasZ(lineStrings);
    const hasM = Geometry.hasM(lineStrings);
    const compoundCurve = CompoundCurve.create(hasZ, hasM);
    compoundCurve._lineStrings = lineStrings;
    return compoundCurve;
  }

  /**
   * Create a compound curve
   * @param lineString line string
   * @return compound curve
   */
  public static createFromLineString(lineString: LineString): CompoundCurve {
    const compoundCurve = CompoundCurve.create(
      lineString.hasZ,
      lineString.hasM,
    );
    compoundCurve._lineStrings = [lineString];
    return compoundCurve;
  }

  /**
   * Get the line strings
   * @return line strings
   */
  public get lineStrings(): LineString[] {
    return this._lineStrings;
  }

  /**
   * Set the line strings
   * @param lineStrings line strings
   */
  public set lineStrings(lineStrings: LineString[]) {
    this._lineStrings = lineStrings;
  }

  /**
   * Add a line string
   * @param lineString line string
   */
  public addLineString(lineString: LineString): void {
    this._lineStrings.push(lineString);
    this.updateZM(lineString);
  }

  /**
   * Add line strings
   * @param lineStrings line strings
   */
  public addLineStrings(lineStrings: LineString[]): void {
    for (const lineString of lineStrings) {
      this.addLineString(lineString);
    }
  }

  /**
   * Get the number of line strings
   * @return number of line strings
   */
  public numLineStrings(): number {
    return this._lineStrings.length;
  }

  /**
   * Returns the Nth line string
   * @param n  nth line string to return
   * @return line string
   */
  public getLineString(n: number): LineString {
    return this._lineStrings[n];
  }

  /**
   * {@inheritDoc}
   */
  public startPoint(): Point {
    let startPoint: Point | undefined;
    for (const lineString of this._lineStrings) {
      if (!lineString.isEmpty()) {
        startPoint = lineString.startPoint();
        break;
      }
    }

    if (this.isEmpty() || !startPoint) {
      throw new SFException("CompoundCurve is empty");
    }

    return startPoint;
  }

  /**
   * {@inheritDoc}
   */
  public endPoint(): Point {
    let endPoint: Point | undefined;

    for (const lineString of this._lineStrings.reverse()) {
      if (!lineString.isEmpty()) {
        endPoint = lineString.endPoint();
        break;
      }
    }

    if (this.isEmpty() || !endPoint) {
      throw new SFException("CompoundCurve is empty");
    }

    return endPoint;
  }

  /**
   * {@inheritDoc}
   */
  public isSimple(): boolean {
    return ShamosHoey.simplePolygonLineStrings(this._lineStrings);
  }

  /**
   * {@inheritDoc}
   */
  public copy(): CompoundCurve {
    const compoundCurveCopy = CompoundCurve.create(
      this.hasZ,
      this.hasM,
    );
    for (const lineString of this.lineStrings) {
      compoundCurveCopy.addLineString(lineString.copy());
    }
    return compoundCurveCopy;
  }

  /**
   * {@inheritDoc}
   */
  public isEmpty(): boolean {
    return this._lineStrings.length === 0;
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: Geometry): boolean {
    let equal = true;
    if (
      obj instanceof CompoundCurve &&
      this.numLineStrings() === obj.numLineStrings()
    ) {
      for (let i = 0; i < this._lineStrings.length; i++) {
        if (!this.getLineString(i).equals(obj.getLineString(i))) {
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
