/**
 * Interface for a comparator function.
 */
export interface Comparator<T> {
  /**
   * Compare two objects.
   * @param a Compare a
   * @param b Compare b
   */
  compare(a: T, b: T): number;
}
