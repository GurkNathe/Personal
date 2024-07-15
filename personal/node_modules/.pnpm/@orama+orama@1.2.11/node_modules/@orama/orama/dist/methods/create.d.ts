import { DocumentsStore } from '../components/documents-store.js';
import { Index } from '../components/index.js';
import { Sorter } from '../components/sorter.js';
import { Components, IDocumentsStore, IIndex, ISorter, Orama, SorterConfig } from '../types.js';
interface CreateArguments<OramaSchema, TIndex, TDocumentStore, TSorter> {
    schema: OramaSchema;
    sort?: SorterConfig;
    language?: string;
    components?: Components<Orama<OramaSchema, TIndex, TDocumentStore, TSorter>, OramaSchema, TIndex, TDocumentStore, TSorter>;
    id?: string;
}
export declare function create<OramaSchema, TIndex = IIndex<Index>, TDocumentStore = IDocumentsStore<DocumentsStore>, TSorter = ISorter<Sorter>>({ schema, sort, language, components, id, }: CreateArguments<OramaSchema, TIndex, TDocumentStore, TSorter>): Promise<Orama<OramaSchema, TIndex, TDocumentStore, TSorter>>;
export {};
