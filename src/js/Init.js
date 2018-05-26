var app;
document.addEventListener('DOMContentLoaded', function () {
    let state = false;
    app = new App(document.querySelector('[data-component="App"]'));
    let toggleButton = app.getChildControlByName('toggleInputs');
    app.getChildControlByName('ActivateInputs').getContainer().addEventListener('activated', function () {
        Control.reviveNodeControls(document.querySelector('section.input'));
        this.control.setEnabled(false);
        toggleButton.setEnabled(true);
    }, {once: true});
    toggleButton.getContainer().addEventListener('activated', function () {
        let inputs = Control.getNodeControls(document.querySelector('section.input'));
        inputs.forEach(function (control) {
            control.setEnabled(state);
        });
        state = !state;
        if (this.control.getCaption() === 'Деактивировать компоненты') {
            this.control.setCaption('Активировать компоненты');
        } else {
            this.control.setCaption('Деактивировать компоненты');
        }
    });

    //Сохраним в переменную наш компонент и создадим тестовые данные
    let tableView = app.getChildControlByName('TableViewExample'),
        arr = [{
            name: 'Иван', surname: 'Иванов', grade: '4'
        }, {
            name: 'Андрей', surname: 'Андреев', grade: '5'
        }];

    //Зададим шаблон для отрисовки item
    tableView.setItemTemplate(function (item) {
        return `<td class="controls-TableView__td">${item.name}</td>
                <td class="controls-TableView__td">${item.surname}</td>
                <td class="controls-TableView__td">${item.grade}</td>`;
    });

    //Проставим items
    tableView.setItems(arr);
});


