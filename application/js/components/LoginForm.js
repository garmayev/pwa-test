import Helper from "./Helper.js";
import Modal from "./Modal.js";

export default class LoginForm extends Modal {
    get body() {
        let form = Helper.createElement('form');
        return Helper.createElement('div', form);
    }

    set body(value) {
        this._body = value;
    }
}