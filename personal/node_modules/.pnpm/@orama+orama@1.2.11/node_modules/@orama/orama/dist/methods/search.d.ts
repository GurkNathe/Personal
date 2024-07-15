import type { AnyOrama, Results, SearchParams, TypedDocument } from '../types.js';
export declare function search<T extends AnyOrama, ResultDocument = TypedDocument<T>>(orama: T, params: SearchParams<T, ResultDocument>, language?: string): Promise<Results<ResultDocument>>;
