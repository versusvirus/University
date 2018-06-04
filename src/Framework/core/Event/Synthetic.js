define([], function () {
   class SyntheticEvent {
       constructor(eventType, eventCaller, nativeEvent) {
           this.eventType = eventType;
           this.eventCaller = eventCaller;
           nativeEvent && (this.nativeEvent = nativeEvent);
       }
   }

   return SyntheticEvent;
});
