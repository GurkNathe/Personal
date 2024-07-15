export const OBJECT_COMPONENTS = [
    'tokenizer',
    'index',
    'documentsStore',
    'sorter'
];
export const FUNCTION_COMPONENTS = [
    'validateSchema',
    'getDocumentIndexId',
    'getDocumentProperties',
    'formatElapsedTime'
];
export const SINGLE_OR_ARRAY_COMPONENTS = [
    'beforeInsert',
    'afterInsert',
    'beforeRemove',
    'afterRemove',
    'beforeUpdate',
    'afterUpdate',
    'afterSearch',
    'beforeMultipleInsert',
    'afterMultipleInsert',
    'beforeMultipleRemove',
    'afterMultipleRemove',
    'beforeMultipleUpdate',
    'afterMultipleUpdate'
];
export async function runSingleHook(hooks, orama, id, doc) {
    const hooksLength = hooks.length;
    for(let i = 0; i < hooksLength; i++){
        await hooks[i](orama, id, doc);
    }
}
export async function runMultipleHook(hooks, orama, docsOrIds) {
    const hooksLength = hooks.length;
    for(let i = 0; i < hooksLength; i++){
        await hooks[i](orama, docsOrIds);
    }
}
export async function runAfterSearch(hooks, db, params, language, results) {
    const hooksLength = hooks.length;
    for(let i = 0; i < hooksLength; i++){
        await hooks[i](db, params, language, results);
    }
}

//# sourceMappingURL=hooks.js.map