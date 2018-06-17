define(['Core/Concat', 'Core/Event/Synthetic'], function (coreConcat, SyntheticEvent) {
    return {
        _notify(eventType, args, nativeEvent) {
            let event = new SyntheticEvent(eventType, this, nativeEvent),
                parentControl = this._getParent(),
                finalArgs = coreConcat([event], args),
                fn = parentControl && parentControl._subscriptions && parentControl._subscriptions[this.getName()] && parentControl._subscriptions[this.getName()][eventType];
            if (fn) {
                fn.apply(this, finalArgs);
            }
        },

        subscribe(eventType, handler) {
            let parentControl = this._getParent();
            if(!parentControl) {
                return null;
            }

            if (!parentControl._subscriptions) {
                parentControl._subscriptions = {};
            }
            if (!parentControl._subscriptions[this.getName()]) {
                parentControl._subscriptions[this.getName()] = {};
            }
            parentControl._subscriptions[this.getName()][eventType] = handler;
        }
    };
});