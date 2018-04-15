initAppComponents();

function initAppComponents() {
    var controls = document.querySelectorAll('[data-component]');
    controls.forEach(function (item) {
        if (!item.hasAttribute('data-init')) {
            let name = item.getAttribute('data-name');
            switch (item.getAttribute('data-component')) {
                case 'Button':
                    components[name] = new Button(item, name);
                    break;
                case 'ProgressBar':
                    components[name] = new ProgressBar(item, name);
                    break;
            }
        }
    })
}