import Modal from "./Modal.js";
import Helper from "./Helper.js";

class OrderForm extends Modal {
    get body() {
        let form = Helper.createElement('form'),
            csrf = Helper.createElement('input', undefined, {type: 'hidden', name: window.csrf.param, value: window.csrf.token}),
            client = Helper.createElement('select', undefined, {id: 'client_id', class: 'form-control'}),
            delivery = Helper.createElement('toggle-button', undefined, {}),
            deliveryAddress = Helper.createElement('input', undefined, {type: 'text', class: 'form-control'}),
            deliveryAddressContainer = Helper.createElement('div', deliveryAddress, {class: 'form-group'});
        form.append(csrf, client, delivery, deliveryAddressContainer);
        return Helper.createElement('div', form, {class: 'modal-body'});
    }

    set body(value) {
        this._body = value;
    }
}

export default OrderForm;