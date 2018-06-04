define(['Core/Mixin/Notify', 'Core/MixinController', 'Core/Concat'], function (NotifyMixin, MixinController, coreConcat) {
    class Abstract {
        constructor(mixins) {
            MixinController.mixes(this, coreConcat([NotifyMixin], mixins));
        }
    }

    return Abstract;
});
