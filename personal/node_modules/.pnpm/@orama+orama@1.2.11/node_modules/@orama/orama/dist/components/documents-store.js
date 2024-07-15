import { getInternalDocumentId } from './internal-document-id-store.js';
export async function create(_, sharedInternalDocumentStore) {
    return {
        sharedInternalDocumentStore,
        docs: {},
        count: 0
    };
}
export async function get(store, id) {
    const internalId = getInternalDocumentId(store.sharedInternalDocumentStore, id);
    return store.docs[internalId];
}
export async function getMultiple(store, ids) {
    const found = Array.from({
        length: ids.length
    });
    for(let i = 0; i < ids.length; i++){
        const internalId = getInternalDocumentId(store.sharedInternalDocumentStore, ids[i]);
        found[i] = store.docs[internalId];
    }
    return found;
}
export async function getAll(store) {
    return store.docs;
}
export async function store(store, id, doc) {
    const internalId = getInternalDocumentId(store.sharedInternalDocumentStore, id);
    if (typeof store.docs[internalId] !== 'undefined') {
        return false;
    }
    store.docs[internalId] = doc;
    store.count++;
    return true;
}
export async function remove(store, id) {
    const internalId = getInternalDocumentId(store.sharedInternalDocumentStore, id);
    if (typeof store.docs[internalId] === 'undefined') {
        return false;
    }
    delete store.docs[internalId];
    store.count--;
    return true;
}
export async function count(store) {
    return store.count;
}
export async function load(sharedInternalDocumentStore, raw) {
    const rawDocument = raw;
    return {
        docs: rawDocument.docs,
        count: rawDocument.count,
        sharedInternalDocumentStore
    };
}
export async function save(store) {
    return {
        docs: store.docs,
        count: store.count
    };
}
export async function createDocumentsStore() {
    return {
        create,
        get,
        getMultiple,
        getAll,
        store,
        remove,
        count,
        load,
        save
    };
}

//# sourceMappingURL=documents-store.js.map