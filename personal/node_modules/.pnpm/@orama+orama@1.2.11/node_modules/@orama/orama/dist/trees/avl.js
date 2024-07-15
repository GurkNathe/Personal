import { safeArrayPush } from '../utils.js';
const BALANCE_STATE = {
    UNBALANCED_RIGHT: -2,
    SLIGHTLY_UNBALANCED_RIGHT: -1,
    BALANCED: 0,
    SLIGHTLY_UNBALANCED_LEFT: 1,
    UNBALANCED_LEFT: 2
};
function getHeight(node) {
    return node != null ? node.h : -1;
}
function rotateLeft(node) {
    const right = node.r;
    node.r = right.l;
    right.l = node;
    node.h = Math.max(getHeight(node.l), getHeight(node.r)) + 1;
    right.h = Math.max(getHeight(right.l), getHeight(right.r)) + 1;
    return right;
}
function rotateRight(node) {
    const left = node.l;
    node.l = left.r;
    left.r = node;
    node.h = Math.max(getHeight(node.l), getHeight(node.r)) + 1;
    left.h = Math.max(getHeight(left.l), getHeight(left.r)) + 1;
    return left;
}
export function contains(node, key) {
    return !!find(node, key);
}
export function getSize(root) {
    let size = 0;
    const queue = [];
    if (root !== null) {
        queue.push(root);
    }
    while(queue.length > 0){
        const node = queue.shift();
        size++;
        if (node.l !== null) {
            queue.push(node.l);
        }
        if (node.r !== null) {
            queue.push(node.r);
        }
    }
    return size;
}
export function isBalanced(root) {
    if (root === null) return true;
    const stack = [
        root
    ];
    while(stack.length > 0){
        const node = stack.pop();
        if (node === undefined) return true;
        const heightDiff = getHeight(node.l) - getHeight(node.r);
        if (heightDiff > 1 || heightDiff < -1) {
            return false;
        }
        if (node.r !== null) {
            stack.push(node.r);
        }
        if (node.l !== null) {
            stack.push(node.l);
        }
    }
    return true;
}
export function rangeSearch(node, min, max) {
    if (!node) {
        return [];
    }
    const result = [];
    function traverse(node) {
        if (!node) {
            return;
        }
        if (node.k > min) {
            traverse(node.l);
        }
        if (node.k >= min && node.k <= max) {
            safeArrayPush(result, node.v);
        }
        if (node.k < max) {
            traverse(node.r);
        }
    }
    traverse(node);
    return result;
}
export function greaterThan(node, key, inclusive = false) {
    if (!node) {
        return [];
    }
    const result = [];
    function traverse(node) {
        if (!node) {
            return;
        }
        if (inclusive && node.k >= key) {
            safeArrayPush(result, node.v);
        }
        if (!inclusive && node.k > key) {
            safeArrayPush(result, node.v);
        }
        traverse(node.l);
        traverse(node.r);
    }
    traverse(node);
    return result;
}
export function lessThan(node, key, inclusive = false) {
    if (!node) {
        return [];
    }
    const result = [];
    function traverse(node) {
        if (!node) {
            return;
        }
        if (inclusive && node.k <= key) {
            safeArrayPush(result, node.v);
        }
        if (!inclusive && node.k < key) {
            safeArrayPush(result, node.v);
        }
        traverse(node.l);
        traverse(node.r);
    }
    traverse(node);
    return result;
}
function getNodeByKey(node, key) {
    while(node !== null){
        if (key < node.k) {
            node = node.l;
        } else if (key > node.k) {
            node = node.r;
        } else {
            return node;
        }
    }
    return null;
}
export function create(key, value) {
    return {
        k: key,
        v: value,
        l: null,
        r: null,
        h: 0
    };
}
export function insert(root, key, value) {
    let parent = null;
    let current = root;
    while(current !== null){
        parent = current;
        if (key < current.k) {
            current = current.l;
        } else if (key > current.k) {
            current = current.r;
        } else {
            // assuming value is an array here
            current.v = current.v.concat(value);
            return root;
        }
    }
    const newNode = create(key, value);
    if (parent == null) {
        root = newNode // tree was empty
        ;
    } else if (key < parent.k) {
        parent.l = newNode;
    } else {
        parent.r = newNode;
    }
    current = newNode;
    while(parent != null){
        const balanceFactor = getHeight(parent.l) - getHeight(parent.r);
        if (balanceFactor === BALANCE_STATE.UNBALANCED_LEFT) {
            if (key > parent.l.k) {
                parent.l = rotateLeft(parent.l);
            }
            parent = rotateRight(parent);
        }
        if (balanceFactor === BALANCE_STATE.UNBALANCED_RIGHT) {
            if (key < parent.r.k) {
                parent.r = rotateRight(parent.r);
            }
            parent = rotateLeft(parent);
        }
        if (parent === root) {
            break;
        }
        current = parent;
        parent = getNodeParent(root, current.k);
    }
    return root;
}
function getNodeParent(root, key) {
    let current = root;
    let parent = null;
    while(current !== null){
        if (key < current.k) {
            parent = current;
            current = current.l;
        } else if (key > current.k) {
            parent = current;
            current = current.r;
        } else {
            break;
        }
    }
    return parent;
}
export function find(root, key) {
    const node = getNodeByKey(root, key);
    if (node == null) {
        return null;
    }
    return node.v;
}
export function remove(root, key) {
    let node = root;
    let parentNode = null;
    while(node != null && node.k !== key){
        parentNode = node;
        if (key < node.k) {
            node = node.l;
        } else {
            node = node.r;
        }
    }
    if (node == null) {
        return null;
    }
    if (node.l == null && node.r == null) {
        if (parentNode == null) {
            // Node to be deleted is root
            root = null;
        } else {
            if (parentNode.l === node) {
                parentNode.l = null;
            } else {
                parentNode.r = null;
            }
        }
    } else if (node.l != null && node.r != null) {
        let minValueNode = node.r;
        let minValueParent = node;
        while(minValueNode.l != null){
            minValueParent = minValueNode;
            minValueNode = minValueNode.l;
        }
        node.k = minValueNode.k;
        if (minValueParent === node) {
            minValueParent.r = minValueNode.r;
        } else {
            minValueParent.l = minValueNode.r;
        }
    } else {
        const childNode = node.l != null ? node.l : node.r;
        if (parentNode == null) {
            root = childNode;
        } else {
            if (parentNode.l === node) {
                parentNode.l = childNode;
            } else {
                parentNode.r = childNode;
            }
        }
    }
    return root;
}
export function removeDocument(root, id, key) {
    const node = getNodeByKey(root, key);
    if (!node) {
        return;
    }
    if (node.v.length === 1) {
        remove(root, key);
        return;
    }
    node.v.splice(node.v.indexOf(id), 1);
}

//# sourceMappingURL=avl.js.map