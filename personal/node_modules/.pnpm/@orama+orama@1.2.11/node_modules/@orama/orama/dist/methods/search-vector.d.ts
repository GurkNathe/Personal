import type { AnyOrama, Results, TypedDocument } from '../types.js';
export type SearchVectorParams = {
    vector: number[] | Float32Array;
    property: string;
    similarity?: number;
    limit?: number;
    offset?: number;
    includeVectors?: boolean;
};
export declare function searchVector<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(orama: T, params: SearchVectorParams): Promise<Results<ResultDocument>>;
