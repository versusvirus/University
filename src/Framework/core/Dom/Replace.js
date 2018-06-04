define([], function () {
   return {
       replace: function (container, template, options) {
           let tmpNode = document.createElement('tmp');
           tmpNode.innerHTML = template;
           tmpNode = tmpNode.firstChild;
           container.parentNode.replaceChild(tmpNode, container);
           return tmpNode;
       }
   }
});