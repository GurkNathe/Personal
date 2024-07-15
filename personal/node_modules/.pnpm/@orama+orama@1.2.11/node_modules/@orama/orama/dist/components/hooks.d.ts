import { AfterSearch, AnyOrama, MultipleCallbackComponent, Results, SearchParams, SingleCallbackComponent, TypedDocument } from '../types.js';
export declare const OBJECT_COMPONENTS: string[];
export declare const FUNCTION_COMPONENTS: string[];
export declare const SINGLE_OR_ARRAY_COMPONENTS: string[];
export declare function runSingleHook<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(hooks: SingleCallbackComponent<T>[], orama: T, id: string, doc?: ResultDocument): Promise<void>;
export declare function runMultipleHook<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(hooks: MultipleCallbackComponent<T>[], orama: T, docsOrIds: ResultDocument[] | string[]): Promise<void>;
export declare function runAfterSearch<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(hooks: AfterSearch<T, ResultDocument>[], db: T, params: SearchParams<T, ResultDocument>, language: string | undefined, results: Results<ResultDocument>): Promise<void>;
