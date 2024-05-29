/**
 * Interface for objects that can be compared to other objects.
 */
export interface Comparable<T> {
  /**
   * Compare this object to another object.
   * @param other Other object
   */
  compareTo(other: T): number;
}
