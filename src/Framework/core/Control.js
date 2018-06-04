define(['Core/Abstract', 'Core/coreMerge', 'Core/coreDomReplace', 'Core/coreDomHelper'], function (Abstract, coreMerge, domReplace, domHelper) {
    class Control extends Abstract {
        constructor(node, options, template) {
            super();
            this._modifyOptions(options, node);
            this._constructor(node, template);
            this._initChildControls();
            this.init();
        }

        _modifyOptions(options, node) {
            this._options = {};
            this._options = coreMerge(this._options, this._getDefaultOptions());
            this._options = coreMerge(this._options, domHelper.getNodeOptions(node));
            this._options = coreMerge(this._options, options);
        }

        _constructor(node, template) {
            this._container = domReplace.replace(node, Parser.render(template, this._options), this._options);
            this._container.control = this;
        }

        _initChildControls() {
            let childNodes = this._container.querySelectorAll('[name]'),
                childrens = {};
            childNodes.forEach(function (children) {
                if (children.constructor.name === 'HTMLUnknownElement') {
                    let controlType = domHelper.getControlName(children.tagName);
                    require([controlType], function (Constructor) {
                        childrens[children.getName()] = new Constructor(children, {'data-component': controlType});
                    })
                } else {
                    childrens[children.getName()] = children;
                }
            });

            this._children = childrens;
        }

        init() {
            let self = this;
            this._init = true;
            this._notify('init', []);
            this._container.addEventListener('DOMNodeRemoved', function (event) {
                (event.target === self._container) && self.destroy();
            })
        }

        _getDefaultOptions() {
            return {};
        }

        destroy() {
            this._notify('destroy');
            delete this;
        }

        getName() {
            return this._options.name;
        }

        _getParent() {
            let parentNode = this._container.parentNode;

            if(parentNode.tagName !== 'BODY' && !parentNode.control) {
                parentNode = parentNode.parentNode;
            }

            return parentNode.control;
        }
    }

    return Control;
});
