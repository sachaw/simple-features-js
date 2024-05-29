import { RedBlackTree } from "@std/data-structures";
/**
 * Extended red black tree
 */
export class ExtendedRedBlackTree<T> extends RedBlackTree<T> {
  /**
   * Constructor
   * @param value value
   * @returns extended red black tree
   */
  findNode(value: T) {
    let node = this.root;
    while (node) {
      const order = this.compare(value, node.value);
      if (order === 0) return node;
      node = order < 0 ? node.left : node.right;
    }
    return null;
  }

  /**
   * Get the parent node
   * @param node node
   * @returns parent node
   */
  getParent(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    return node.parent;
  }

  /**
   * Get the left child
   * @param node node
   * @returns left child
   */
  getLeftChild(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    return node.left;
  }

  /**
   * Get the right child
   * @param node node
   * @returns right child
   */
  getRightChild(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    return node.right;
  }

  /**
   * Get the successor
   * @param node node
   * @returns successor
   */
  getSuccessor(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    const successor = node.findSuccessorNode() as
      | ReturnType<typeof this.findNode>
      | null;
    return successor;
  }

  /**
   * Get the predecessor
   * @param node node
   * @returns predecessor
   */
  getPredecessor(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    if (node.left) {
      let pred = node.left;
      while (pred.right) pred = pred.right;
      return pred;
    }
    let parent = node.parent;
    let curr = node;
    while (parent && curr === parent.left) {
      curr = parent;
      parent = parent.parent;
    }
    return parent;
  }
}
