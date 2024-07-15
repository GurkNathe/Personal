import { Nullable } from '../types.js';
export interface Node<K, V> {
    k: K;
    v: V;
    l: Nullable<Node<K, V>>;
    r: Nullable<Node<K, V>>;
    h: number;
}
export declare function contains<K, V>(node: Node<K, V>, key: K): boolean;
export declare function getSize<K, V>(root: Nullable<Node<K, V>>): number;
export declare function isBalanced<K, V>(root: Nullable<Node<K, V>>): boolean;
export declare function rangeSearch<K, V>(node: Node<K, V>, min: K, max: K): V;
export declare function greaterThan<K, V>(node: Node<K, V>, key: K, inclusive?: boolean): V;
export declare function lessThan<K, V>(node: Node<K, V>, key: K, inclusive?: boolean): V;
export declare function create<K, V>(key: K, value: V): Node<K, V>;
export declare function insert<K, V>(root: Node<K, V>, key: K, value: V): Node<K, V>;
export declare function find<K, V>(root: Node<K, V>, key: K): V | null;
export declare function remove<K, V>(root: Nullable<Node<K, V>>, key: K): Nullable<Node<K, V>>;
export declare function removeDocument<K, V>(root: Node<K, V[]>, id: V, key: K): void;
