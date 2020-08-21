
/**
 * Simulates a class list.
 *
 * If changes are made outside this object, resync using synchronize().
 */
export class ClassList {

  constructor(el: HTMLElement);

  /**
   * Add a class.
   *
   * @param className
   *        class to add.
   */
  add(className: string): void;

  /**
   * Check if element has a class.
   *
   * @param className
   *        class to add.
   * @return
   *         true if element list includes class.
   */
  contains(className: string): boolean;

  /**
   * Access a class.
   *
   * @param pos
   *        index in list [0,ClassList.length-1].
   * @return className in list, or null if out of range.
   */
  item(pos: string): string;

  /**
   * Remove a class.
   *
   * @param className
   *        class to remove.
   */
  remove(className: string): void;

  /**
   * Toggle a class.
   *
   * Add is not in list, otherwise remove.
   *
   * @param className
   *        class to add.
   */
  toggle(className: string): void;

}
