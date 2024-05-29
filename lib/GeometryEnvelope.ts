import { Line, LineString, Point, Polygon, SFException } from "./internal.ts";

/**
 * Geometry envelope
 */
export class GeometryEnvelope {
  /**
   * Min X
   */
  private _minX: number | undefined;

  /**
   * Max X
   */
  private _maxX: number | undefined;

  /**
   * Min Y
   */
  private _minY: number | undefined;

  /**
   * Max Y
   */
  private _maxY: number | undefined;

  /**
   * True if has z coordinates
   */
  private _hasZ = false;

  /**
   * Min Z
   */
  private _minZ: number | undefined;

  /**
   * Max Z
   */
  private _maxZ: number | undefined;

  /**
   * True if has M measurements
   */
  private _hasM = false;

  /**
   * Min M
   */
  private _minM: number | undefined;

  /**
   * Max M
   */
  private _maxM: number | undefined;

  /**
   * Create an empty geometry envelope
   * @returns geometry envelope
   */
  public static create(
    hasZ: boolean = false,
    hasM: boolean = false,
  ): GeometryEnvelope {
    const envelope = new GeometryEnvelope();
    envelope.hasZ = hasZ;
    envelope.hasM = hasM;
    return envelope;
  }

  /**
   * Create a geometry envelope
   * @param minX min x
   * @param minY min y
   * @param maxX max x
   * @param maxY max y
   * @returns geometry envelope
   */
  public static createFromMinMaxXY(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
  ): GeometryEnvelope {
    const envelope = new GeometryEnvelope();
    envelope.minX = minX;
    envelope.maxX = maxX;
    envelope.minY = minY;
    envelope.maxY = maxY;
    return envelope;
  }

  /**
   * Create a geometry envelope
   * @param minX min x
   * @param minY min y
   * @param minZ min z
   * @param maxX max x
   * @param maxY max y
   * @param maxZ max z
   * @returns geometry envelope
   */
  public static createFromMinMaxXYZ(
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number,
  ): GeometryEnvelope {
    const envelope = new GeometryEnvelope();
    envelope.minX = minX;
    envelope.minY = minY;
    envelope.minZ = minZ;
    envelope.maxX = maxX;
    envelope.maxY = maxY;
    envelope.maxZ = maxZ;
    return envelope;
  }

  /**
   * Create a geometry envelope
   * @param minX min x
   * @param minY min y
   * @param minZ min z
   * @param minM min m
   * @param maxX max x
   * @param maxY max y
   * @param maxZ max z
   * @param maxM max m
   * @returns geometry envelope
   */
  public static createFromMinMaxXYZM(
    minX: number,
    minY: number,
    minZ: number,
    minM: number,
    maxX: number,
    maxY: number,
    maxZ: number,
    maxM: number,
  ): GeometryEnvelope {
    const envelope = new GeometryEnvelope();
    envelope.minX = minX;
    envelope.minY = minY;
    envelope.minZ = minZ;
    envelope.minM = minM;
    envelope.maxX = maxX;
    envelope.maxY = maxY;
    envelope.maxZ = maxZ;
    envelope.maxM = maxM;
    return envelope;
  }

  /**
   * True if has Z coordinates
   *
   * @return has z
   * @see #hasZ()
   */
  public is3D(): boolean {
    return this.hasZ;
  }
  /**
   * True if has M measurements
   * @return has m
   * @see #hasM()
   */
  public isMeasured(): boolean {
    return this.hasM;
  }

  /**
   * Get min x
   * @return min x
   */
  public get minX(): number {
    if (this._minX === undefined) {
      throw new SFException("minX is not defined");
    }
    return this._minX;
  }

  /**
   * Set min x
   * @param minX min x
   */
  public set minX(minX: number) {
    this._minX = minX;
  }

  /**
   * Get max x
   * @return max x
   */
  public get maxX(): number {
    if (this._maxX === undefined) {
      throw new SFException("maxX is not defined");
    }
    return this._maxX;
  }

  /**
   * Set max x
   * @param maxX max x
   */
  public set maxX(maxX: number) {
    this._maxX = maxX;
  }

  /**
   * Get min y
   * @return min y
   */
  public get minY(): number {
    if (this._minY === undefined) {
      throw new SFException("minY is not defined");
    }
    return this._minY;
  }

  /**
   * Set min y
   * @param minY min y
   */
  public set minY(minY: number) {
    this._minY = minY;
  }

  /**
   * Get max y
   * @return max y
   */
  public get maxY(): number {
    if (this._maxY === undefined) {
      throw new SFException("maxY is not defined");
    }
    return this._maxY;
  }

  /**
   * Set max y
   * @param maxY max y
   */
  public set maxY(maxY: number) {
    this._maxY = maxY;
  }

  /**
   * True if has Z coordinates
   * @return has z
   */
  public get hasZ(): boolean {
    return this._hasZ;
  }

  /**
   * Set has z coordinates
   * @param hasZ has z
   */
  public set hasZ(hasZ: boolean) {
    this._hasZ = hasZ;
  }

  /**
   * Get min z
   * @return min z
   */
  public get minZ(): number | undefined {
    return this._minZ;
  }

  /**
   * Set min z
   * @param minZ min z
   */
  public set minZ(minZ: number | undefined) {
    this._minZ = minZ;
  }

  /**
   * Get max z
   * @return max z
   */
  public get maxZ(): number | undefined {
    return this._maxZ;
  }

  /**
   * Set max z
   * @param maxZ max z
   */
  public set maxZ(maxZ: number | undefined) {
    this._maxZ = maxZ;
  }

  /**
   * Has m coordinates
   * @return true if has m coordinates
   */
  public get hasM(): boolean {
    return this._hasM;
  }

  /**
   * Set has m coordinates
   * @param hasM has m
   */
  public set hasM(hasM: boolean) {
    this._hasM = hasM;
  }

  /**
   * Get min m
   * @return min m
   */
  public get minM(): number | undefined {
    return this._minM;
  }

  /**
   * Set min m
   * @param minM min m
   */
  public set minM(minM: number | undefined) {
    this._minM = minM;
  }

  /**
   * Get max m
   * @return max m
   */
  public get maxM(): number | undefined {
    return this._maxM;
  }

  /**
   * Set max m
   * @param maxM max m
   */
  public set maxM(maxM: number | undefined) {
    this._maxM = maxM;
  }

  /**
   * Get the x range
   * @return x range
   */
  public get xRange(): number {
    if (this._minX === undefined || this._maxX === undefined) {
      throw new SFException("xRange is not defined");
    }
    return this._maxX - this._minX;
  }

  /**
   * Get the y range
   * @return y range
   */
  public get yRange(): number {
    if (this._minY === undefined || this._maxY === undefined) {
      throw new SFException("yRange is not defined");
    }
    return this._maxY - this._minY;
  }

  /**
   * Get the z range
   * @return z range
   */
  public get zRange(): number {
    const range = this._minZ !== undefined && this._maxZ !== undefined
      ? this._maxZ - this._minZ
      : undefined;
    if (range === undefined) {
      throw new SFException("zRange is not defined");
    }
    return range;
  }

  /**
   * Get the m range
   * @return m range
   */
  public get mRange(): number {
    const range = this._minM !== undefined && this._maxM !== undefined
      ? this._maxM - this._minM
      : undefined;
    if (range === undefined) {
      throw new SFException("mRange is not defined");
    }
    return range;
  }

  /**
   * Determine if the envelope is of a single point
   * @return true if a single point bounds
   * @since 2.0.5
   */
  public isPoint(): boolean {
    return this._minX === this._maxX && this._minY === this._maxY;
  }

  /**
   * Get the top left point
   *
   * @return top left point
   * @since 1.1.1
   */
  public getTopLeft(): Point {
    return Point.createFromXY(this.minX, this.maxY);
  }

  /**
   * Get the bottom left point
   *
   * @return bottom left point
   * @since 1.1.1
   */
  public getBottomLeft(): Point {
    return Point.createFromXY(this.minX, this.minY);
  }

  /**
   * Get the bottom right point
   *
   * @return bottom right point
   * @since 1.1.1
   */
  public getBottomRight(): Point {
    return Point.createFromXY(this.maxX, this.minY);
  }

  /**
   * Get the top right point
   *
   * @return top right point
   * @since 1.1.1
   */
  public getTopRight(): Point {
    return Point.createFromXY(this.maxX, this.maxY);
  }

  /**
   * Get the left line
   *
   * @return left line
   * @since 1.1.1
   */
  public getLeft(): Line {
    return Line.createFromTwoPoints(this.getTopLeft(), this.getBottomLeft());
  }

  /**
   * Get the bottom line
   *
   * @return bottom line
   * @since 1.1.1
   */
  public getBottom(): Line {
    return Line.createFromTwoPoints(
      this.getBottomLeft(),
      this.getBottomRight(),
    );
  }

  /**
   * Get the right line
   *
   * @return right line
   * @since 1.1.1
   */
  public getRight(): Line {
    return Line.createFromTwoPoints(this.getBottomRight(), this.getTopRight());
  }

  /**
   * Get the top line
   *
   * @return top line
   * @since 1.1.1
   */
  public getTop(): Line {
    return Line.createFromTwoPoints(this.getTopRight(), this.getTopLeft());
  }

  /**
   * Get the envelope mid x
   *
   * @return mid x
   * @since 1.0.3
   */
  public getMidX(): number {
    return (this.minX + this.maxX) / 2.0;
  }

  /**
   * Get the envelope mid y
   *
   * @return mid y
   * @since 1.0.3
   */
  public getMidY(): number {
    return (this.minY + this.maxY) / 2.0;
  }

  /**
   * Get the envelope centroid point
   * @return centroid point
   */
  public get centroid(): Point {
    if (
      this._minX === undefined ||
      this._maxX === undefined ||
      this._minY === undefined ||
      this._maxY === undefined
    ) {
      throw new SFException("centroid is not defined");
    }
    return Point.createFromXY(
      (this._minX + this._maxX) / 2.0,
      (this._minY + this._maxY) / 2.0,
    );
  }

  /**
   * Determine if the envelope is empty
   *
   * @return true if empty
   * @since 1.1.1
   */
  public isEmpty(): boolean {
    return this.xRange <= 0.0 || this.yRange <= 0.0;
  }

  /**
   * Determine if intersects with the provided envelope
   * @param envelope geometry envelope
   * @param allowEmpty allow empty ranges when determining intersection
   * @return true if intersects
   */
  public intersects(
    envelope: GeometryEnvelope,
    allowEmpty: boolean,
  ): boolean {
    return this.overlap(envelope, allowEmpty) !== undefined;
  }

  /**
   * Get the overlapping geometry envelope with the provided envelope
   * @param envelope geometry envelope
   * @param allowEmpty allow empty ranges when determining intersection
   * @return geometry envelope
   */
  public overlap(
    envelope: GeometryEnvelope,
    allowEmpty = false,
  ): GeometryEnvelope {
    const minX = Math.max(this.minX, envelope.minX);
    const maxX = Math.min(this.maxX, envelope.maxX);
    const minY = Math.max(this.minY, envelope.minY);
    const maxY = Math.min(this.maxY, envelope.maxY);

    if (
      (minX < maxX && minY < maxY) ||
      (allowEmpty && minX <= maxX && minY <= maxY)
    ) {
      return GeometryEnvelope.createFromMinMaxXY(minX, minY, maxX, maxY);
    }

    throw new SFException("No overlap between envelopes");
  }

  /**
   * Get the union geometry envelope combined with the provided envelope
   * @param envelope geometry envelope
   * @return geometry envelope
   */
  public union(envelope: GeometryEnvelope): GeometryEnvelope {
    const minX = Math.min(this.minX, envelope.minX);
    const maxX = Math.max(this.maxX, envelope.maxX);
    const minY = Math.min(this.minY, envelope.minY);
    const maxY = Math.max(this.maxY, envelope.maxY);

    if (minX < maxX && minY < maxY) {
      return GeometryEnvelope.createFromMinMaxXY(minX, minY, maxX, maxY);
    }

    throw new SFException("No union between envelopes");
  }

  /**
   * Determine if contains the point
   *
   * @param point point
   * @return true if contains
   * @since 1.1.1
   */
  public containsPoint(point: Point): boolean {
    return this.containsPointWithEpsilon(point, 0.0);
  }

  /**
   * Determine if contains the point
   *
   * @param point point
   * @param epsilon epsilon equality tolerance
   * @return true if contains
   * @since 1.1.1
   */
  public containsPointWithEpsilon(point: Point, epsilon: number): boolean {
    return this.containsCoordsWithEpsilon(point.x, point.y, epsilon);
  }

  /**
   * Determine if contains the coordinate
   *
   * @param x x value
   * @param y y value
   * @return true if contains
   * @since 1.1.1
   */
  public containsCoords(x: number, y: number): boolean {
    return this.containsCoordsWithEpsilon(x, y, 0.0);
  }

  /**
   * Determine if contains the coordinate
   *
   * @param x x value
   * @param y y value
   * @param epsilon epsilon equality tolerance
   * @return true if contains
   * @since 1.1.1
   */
  public containsCoordsWithEpsilon(
    x: number,
    y: number,
    epsilon: number,
  ): boolean {
    return (
      x >= this.minX - epsilon &&
      x <= this.maxX + epsilon &&
      y >= this.minY - epsilon &&
      y <= this.maxY + epsilon
    );
  }

  /**
   * Determine if inclusively contains the provided envelope
   * @param envelope geometry envelope
   * @return true if contains
   */
  public contains(envelope: GeometryEnvelope): boolean {
    return this.containsWithEpsilon(envelope, 0.0);
  }

  /**
   * Determine if inclusively contains the provided envelope
   *
   * @param envelope geometry envelope
   * @param epsilon epsilon equality tolerance
   * @return true if contains
   * @since 1.1.1
   */
  public containsWithEpsilon(
    envelope: GeometryEnvelope,
    epsilon: number,
  ): boolean {
    return (
      this.minX - epsilon <= envelope.minX &&
      this.maxX + epsilon >= envelope.maxX &&
      this.minY - epsilon <= envelope.minY &&
      this.maxY + epsilon >= envelope.maxY
    );
  }

  /**
   * Build a geometry representation of the geometry envelope
   * @return geometry, polygon or point
   */
  public buildGeometry(): Polygon | Point {
    let geometry: Polygon | Point;
    if (this.isPoint()) {
      geometry = Point.createFromXY(this.minX, this.minY);
    } else {
      const polygon = Polygon.create();
      const ring = LineString.create();
      ring.addPoint(Point.createFromXY(this.minX, this.minY));
      ring.addPoint(Point.createFromXY(this.maxX, this.minY));
      ring.addPoint(Point.createFromXY(this.maxX, this.maxY));
      ring.addPoint(Point.createFromXY(this.minX, this.maxY));
      polygon.addRing(ring);
      geometry = polygon;
    }
    return geometry;
  }

  /**
   * Copy the geometry envelope
   * @return geometry envelope copy
   */
  public copy(): GeometryEnvelope {
    const envelopeCopy = new GeometryEnvelope();
    envelopeCopy.minX = this.minX;
    envelopeCopy.maxX = this.maxX;
    envelopeCopy.minY = this.minY;
    envelopeCopy.maxY = this.maxY;
    envelopeCopy.hasZ = this.hasZ;
    envelopeCopy.minZ = this.minZ;
    envelopeCopy.maxZ = this.maxZ;
    envelopeCopy.hasM = this.hasM;
    envelopeCopy.minM = this.minM;
    envelopeCopy.maxM = this.maxM;
    return envelopeCopy;
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: GeometryEnvelope): boolean {
    return !(
      !(obj instanceof GeometryEnvelope) ||
      this.minX !== obj.minX ||
      this.maxX !== obj.maxX ||
      this.minY !== obj.minY ||
      this.maxY !== obj.maxY ||
      this.minZ !== obj.minZ ||
      this.maxZ !== obj.maxZ ||
      this.minM !== obj.minM ||
      this.maxM !== obj.maxM
    );
  }
}
