define([], function () {
    return function (arr, arrToConcat) {
        if (arrToConcat && arrToConcat.constructor.name === 'Array') {
            return !!arrToConcat.length ? arr.concat(arrToConcat) : arr;
        } else {
            return arr;
        }
    }
});
