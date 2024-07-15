import { AnyDocument, AnyDocumentStore, AnyOrama, IDocumentsStore, TypedDocument } from '../types.js';
import { DocumentID, InternalDocumentID, InternalDocumentIDStore } from './internal-document-id-store.js';
export interface DocumentsStore extends AnyDocumentStore {
    sharedInternalDocumentStore: InternalDocumentIDStore;
    docs: Record<InternalDocumentID, AnyDocument>;
    count: number;
}
export declare function create<T extends AnyOrama>(_: T, sharedInternalDocumentStore: InternalDocumentIDStore): Promise<DocumentsStore>;
export declare function get<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(store: DocumentsStore, id: DocumentID): Promise<ResultDocument | undefined>;
export declare function getMultiple<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(store: DocumentsStore, ids: DocumentID[]): Promise<(ResultDocument | undefined)[]>;
export declare function getAll<T extends AnyOrama, ResultDocument extends TypedDocument<T>>(store: DocumentsStore): Promise<Record<InternalDocumentID, ResultDocument>>;
export declare function store(store: DocumentsStore, id: DocumentID, doc: AnyDocument): Promise<boolean>;
export declare function remove(store: DocumentsStore, id: DocumentID): Promise<boolean>;
export declare function count(store: DocumentsStore): Promise<number>;
export declare function load<R = unknown>(sharedInternalDocumentStore: InternalDocumentIDStore, raw: R): Promise<DocumentsStore>;
export declare function save<R = unknown>(store: DocumentsStore): Promise<R>;
export declare function createDocumentsStore(): Promise<IDocumentsStore<DocumentsStore>>;
