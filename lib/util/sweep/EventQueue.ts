import { sort } from "timsort";
import { Event, EventType, LineString, SweepLine } from "../../internal.ts";
import type { Point } from "../../internal.ts";

/**
 * Event queue for processing events
 */
export class EventQueue implements Iterable<Event> {
  /**
   * List of events
   */
  private _events: Event[] = [];

  public constructor(ring: LineString);
  public constructor(rings: LineString[]);

  public constructor(...args: [ring: LineString] | [rings: LineString[]]) {
    // Match: [ring: LineString]
    if (args.length === 1 && args[0] instanceof LineString) {
      this.addRing(args[0], 0);
      this.sort();
    } // Match: [rings: LineString[]]
    else if (args.length === 1 && Array.isArray(args[0])) {
      for (let i = 0; i < args[0].length; i++) {
        this.addRing(args[0][i], i);
      }
      this.sort();
    }
  }

  /**
   * Add a ring to the event queue
   * @param ring polygon ring
   * @param ringIndex ring index
   */
  private addRing(ring: LineString, ringIndex: number): void {
    const points: Point[] = ring.points;

    for (let i = 0; i < points.length; i++) {
      const point1 = points[i];
      const point2 = points[(i + 1) % points.length];

      let type1: EventType | undefined;
      let type2: EventType | undefined;
      if (SweepLine.xyOrder(point1, point2) < 0) {
        type1 = EventType.Left;
        type2 = EventType.Right;
      } else {
        type1 = EventType.Right;
        type2 = EventType.Left;
      }

      this._events.push(new Event(i, ringIndex, point1, type1));
      this._events.push(new Event(i, ringIndex, point2, type2));
    }
  }

  /**
   * Sort the events
   */
  private sort(): void {
    sort(
      this._events,
      (a: Event, b: Event) => SweepLine.xyOrder(a.point, b.point),
    );
  }

  [Symbol.iterator](): Iterator<Event> {
    return this._events[Symbol.iterator]();
  }
}
