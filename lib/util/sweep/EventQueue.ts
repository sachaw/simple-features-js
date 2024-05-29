import { sort } from "@dewars/timsort";
import { Event, EventType, SweepLine } from "../../internal.ts";
import type { LineString, Point } from "../../internal.ts";

/**
 * Event queue for processing events
 */
export class EventQueue implements Iterable<Event> {
  /**
   * List of events
   */
  private _events: Event[] = [];

  /**
   * Create an event queue from a line string
   * @param ring line string
   * @returns event queue
   */
  public static createFromLineString(ring: LineString): EventQueue {
    const eventQueue = new EventQueue();
    eventQueue.addRing(ring, 0);
    eventQueue.sort();
    return eventQueue;
  }

  /**
   * Create an event queue from line strings
   * @param rings line strings
   * @returns event queue
   */
  public static createFromLineStrings(rings: LineString[]): EventQueue {
    const eventQueue = new EventQueue();
    for (let i = 0; i < rings.length; i++) {
      eventQueue.addRing(rings[i], i);
    }
    eventQueue.sort();
    return eventQueue;
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

  /**
   * Iterator for events
   * @returns iterator for events
   */
  [Symbol.iterator](): Iterator<Event> {
    return this._events[Symbol.iterator]();
  }
}
