define([], function () {
   class Model {
       constructor(fields) {
           this._fileds = fields;
       }

       updateField(fieldName, newValue) {
           this._fileds[fieldName] = newValue;
       }

       getField(fieldName) {
           return this._fileds[fieldName];
       }
   }
   return Model;
});