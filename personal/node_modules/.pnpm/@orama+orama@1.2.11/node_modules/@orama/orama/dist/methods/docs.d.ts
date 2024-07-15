import { AnyOrama, TypedDocument } from '../types.js';
export declare function getByID<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(db: T, id: string): Promise<ResultDocument | undefined>;
export declare function count<T extends AnyOrama>(db: T): Promise<number>;
