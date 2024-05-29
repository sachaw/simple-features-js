import { RedBlackTree } from "@std/data-structures";

export class ExtendedRedBlackTree<T> extends RedBlackTree<T> {
  findNode(value: T) {
    let node = this.root;
    while (node) {
      const order = this.compare(value, node.value);
      if (order === 0) return node;
      node = order < 0 ? node.left : node.right;
    }
    return null;
  }

  getParent(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    return node.parent;
  }

  getLeftChild(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    return node.left;
  }

  getRightChild(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    return node.right;
  }

  getSuccessor(
    node: ReturnType<typeof this.findNode>,
  ): ReturnType<typeof this.findNode> | null {
    if (!node) return null;
    const successor = node.findSuccessorNode() as
      | ReturnType<typeof this.findNode>
      | null;
    return successor;
  }

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
