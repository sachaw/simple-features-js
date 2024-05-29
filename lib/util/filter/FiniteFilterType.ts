/**
 * Finite Filter Type, including finite values and optionally one of either
 * infinite or NaN values
 */
export enum FiniteFilterType {
  /**
   * Accept only finite values
   */
  Finite = 0,

  /**
   * Accept finite and infinite values
   */
  FiniteAndInfinite = 1,

  /**
   * Accept finite and Not a Number values
   */
  FiniteAndNan = 2,
}
