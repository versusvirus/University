define([], function () {
    function coreMerge(obj, objToMerge) {
        for (let key in objToMerge) {
            if (objToMerge[key] && typeof objToMerge[key] === 'object' && objToMerge[key].constructor.name === 'Object') {
                if (!obj[key] || typeof obj[key] !== 'object') {
                    obj[key] = {};
                }
                coreMerge(obj[key], objToMerge[key]);
            } else {
                obj[key] = objToMerge[key];
            }
        }
        return obj;
    }

    return coreMerge;
});
