var registrationComponents = {};

initRegistrationControls();

function initRegistrationControls() {
   var controls = document.querySelectorAll('[data-component]');
   controls.forEach(function (item) {
      if (!item.hasAttribute('data-init')) {
          switch (item.getAttribute('data-component')) {
             case 'Button':
                 registrationComponents[item.getAttribute('data-name')] = new Button(item, item.getAttribute('data-name'), function () {
                   components[item.getAttribute('data-popup-name')].open();
                 })
          }
      }
   })
}


