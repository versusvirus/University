define(['../lib/template',
        'css!Core/css/core.css'],
    function (Parser) {
        HTMLElement.prototype.getName = function () {
          return this.getAttribute('name');
        };
        HTMLElement.prototype.show = function (mode) {
            if (!mode) {
                this.style.display = 'block';
            } else {
                this.style.display = mode;
            }
        };
        HTMLElement.prototype.hide = function () {
            this.style.display = 'none';
        };
        window.Parser = Parser;
        let app = document.getElementById('app');
        require([app.getAttribute('data-component')], function (AppConstructor) {
            window.Application = new AppConstructor(app, {});
        })
    }
);
