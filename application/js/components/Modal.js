import Helper from "./Helper.js";

class Modal {
    _id = undefined;
    _title = 'Modal';
    _body = [];
    _footer = [];
    _show = false;
    _container;
    _size = '';

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return Helper.createElement('div', [
            Helper.createElement('h5', this._title, {class: 'modal-title'}),
            Helper.createElement(
                'button',
                Helper.createElement('span', '&times;', {'aria-hidden': true}),
                {type: 'button', class: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'})
        ], {class: 'modal-header'});
    }

    set title(value) {
        this._title = value;
    }

    get body() {
        return Helper.createElement('div', this._body, {class: 'modal-body'});
    }

    set body(value) {
        this._body = value;
    }

    get footer() {
        return Helper.createElement('div', this._footer, {class: ['modal-footer', 'd-flex', 'justify-content-between']});
    }

    set footer(value) {
        this._footer = value;
    }

    get show() {
        return this._show;
    }

    set show(value) {
        this._show = value;
    }

    constructor(container, options) {
        if (options.id) {
            this.id = options.id;
        }

        if (options.title) {
            this.title = options.title;
        }

        if (options.body) {
            this.body = options.body;
        }

        if (options.footer) {
            this.footer = options.footer;
        }

        if (options.show) {
            this.show = options.show;
        }

        this._size = true;
        this._container = container;
    }

    render() {
        let content = Helper.createElement('div', [this.title, this.body, this.footer], {class: 'modal-content'}),
            dialog = Helper.createElement('div', content, {
                class: ['modal-dialog', this._size ? 'modal-lg' : ''],
                role: 'document'
            }),
            attributes = this.id ?
                {
                    class: this.show ? ['modal', 'fade', 'show'] : ['modal', 'fade'],
                    'tabindex': -1,
                    role: 'dialog',
                    id: this.id
                } :
                {
                    class: this.show ? ['modal', 'fade', 'show'] : ['modal', 'fade'],
                    'tabindex': -1,
                    role: 'dialog'
                };
        let modalDialog = this._container.querySelector(`#${this.id}`);
        // console.log(modalDialog)
        if ( modalDialog ) {
            modalDialog.innerHTML = '';
            modalDialog.append(content);
        } else {
            this._container.append(Helper.createElement('div', dialog, attributes));
        }
    }
}

export default Modal;