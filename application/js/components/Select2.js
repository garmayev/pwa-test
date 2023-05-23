import Helper from "./Helper.js";

export default class Select2 extends HTMLElement
{
    _value;
    _method;
    _list;
    _url;
    _focused;

    render()
    {
        let shadow = this.attachShadow({mode: 'closed'}),
            list = Helper.createElement('ul');
        shadow.append(list);
        for (const item of this._list) {
            list.append(Helper.createElement('li', item.username, {'data-key': item.id}));
        }
    }

    static get observedAttributes()
    {
        return [
            'value',
        ];
    }

    connectedCallback()
    {
        this._url = this.getAttribute('data-url');
        this._value = this.getAttribute('value');
        this._method = this.getAttribute('data-method');
        this._list = Helper.ajax(this._url, {q: this._value ?? ''}, {method: this._method});
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue)
    {

    }
}
