'use strict'

import Helper from "./components/Helper.js";
import OrderForm from './components/OrderForm.js';
import LoginForm from "./components/LoginForm.js";
import Order from './components/Order.js';
import User from "./components/User.js";

class Application {
    container = null;
    orderForm = undefined;
    orderList = [];

    constructor(props) {
        this.container = props.container;

        this.saveOrder = this.saveOrder.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);

        this.state = {
            isAuth: props.isAuth ?? false,
            username: props.username ?? '',
            showOrder: props.showOrder ?? false,
            showLogin: props.showLogin ?? false
        }
        this.order = new Order();
        this.user = new User();
        this.orderList = Order.list();
        this.loginForm = new LoginForm(document.querySelector('#root'), {
            id: 'loginForm',
            title: 'Authorization',
            body: this.user.render(),
            show: true,
            footer: [
                Helper.createElement('button', 'Close', {type: 'button', class: ['btn', 'btn-danger'], 'data-dismiss': 'modal'}),
                Helper.createElement('button', 'Login', {type: 'button', class: ['btn', 'btn-success']}, {click: this.toggleLogin})
            ],
        })
        this.orderForm = new OrderForm(document.querySelector('#root'), {
            id: 'orderForm',
            title: 'Create Order',
            body: this.order.render(),
            show: false,
            footer: [
                Helper.createElement('button', 'Close', {type: 'button', class: ['btn', 'btn-danger'], 'data-dismiss': 'modal'}),
                Helper.createElement('button', 'Save', {type: 'button', class: ['btn', 'btn-success']}, {click: this.saveOrder})
            ],
        });

        this.loginForm.render();
        this.orderForm.render();
    }

    saveOrder(e) {
        console.log(this);
        console.log(e);
    }

    toggleLogin() {
        console.log(this)
        console.log('Login')
    }

    render() {
        let container = Helper.createElement(
            'div',
            [
                Helper.createElement(
                    'div',
                    Helper.createElement('a', 'Create Order', {class: ['btn', 'btn-success'], 'data-toggle': 'modal', 'data-target': '#'+this.orderForm.id}),
                    {class: ['nav', 'justify-content-start']}),
                Helper.createElement('img', null, {src: '/images/logo192.png', class: 'justify-content-center', width: '80px'}),
                Helper.createElement(
                    'div',
                    Helper.createElement('a', this.state.isAuth ? this.state.username : 'Authorization', {class: ['btn', 'btn-secondary'], 'data-toggle': 'modal', 'data-target': '#'+this.loginForm.id}),
                    {class: ['nav', 'justify-content-end']}),
            ],
            {class: ['d-flex', 'justify-content-around', 'align-items-center', 'mt-1']}
        );
        this.container.append(container);

        console.log(this.orderList)
    }
}

export default Application