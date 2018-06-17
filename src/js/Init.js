define(['../lib/template',
        'css!Core/css/core.css',
        './modules',
        'Core/template/Parser',
        'Core/template/Listener'],
    function (Parser, module, allModules, templateEngine, listener) {
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
        let a = new templateEngine(listener, {
            xmlMode: true,
            recognizeSelfClosing: true,
            failOnInnerCurlyBrace: true,
            generateTagErrors: true
        });

        debugger;
        window.Parser = Parser;
        let app = document.getElementById('app');
        require(allModules , function (Application) {
            setTimeout(function () {
                a.write(Application._template);

            }, 0)
        })
    }
);
