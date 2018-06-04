define(['Core/Merge'], function (coreMerge) {
    let MixinController = {
        mixes: function (baseObj, mixins) {
            mixins.forEach(function (mixin) {
                MixinController.mix(baseObj, mixin);
            })
        },
        mix: function (baseObj, mixin) {
            coreMerge(baseObj, mixin);
        }
    };

    return MixinController;
});