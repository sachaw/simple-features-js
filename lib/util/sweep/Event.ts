import type { Comparable, EventType, Point } from "../../internal.ts";
import { SweepLine } from "../../internal.ts";

/**
 * Event element
 */
export class Event implements Comparable<Event> {
  /**
   * Edge number
   */
  private readonly _edge: number;

  /**
   * Polygon ring number
   */
  private readonly _ring: number;

  /**
   * Polygon point
   */
  private readonly _point: Point;

  /**
   * Event type, left or right point
   */
  private readonly _type: EventType;

  /**
   * Constructor
   * @param edge edge number
   * @param ring ring number
   * @param point point
   * @param type event type
   */
  public constructor(
    edge: number,
    ring: number,
    point: Point,
    type: EventType,
  ) {
    this._edge = edge;
    this._ring = ring;
    this._point = point;
    this._type = type;
  }

  /**
   * Get the edge
   *
   * @returnsedge number
   */
  public get edge(): number {
    return this._edge;
  }

  /**
   * Get the polygon ring number
   * @returnspolygon ring number
   */
  public get ring(): number {
    return this._ring;
  }

  /**
   * Get the polygon point
   * @returnspolygon point
   */
  public get point(): Point {
    return this._point;
  }

  /**
   * Get the event type
   * @returnsevent type
   */
  public get type(): EventType {
    return this._type;
  }

  /**
   * {@inheritDoc}
   */
  public compareTo(other: Event): number {
    return SweepLine.xyOrder(this.point, other.point);
  }
}
