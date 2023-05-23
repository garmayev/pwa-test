import Helper from "./Helper.js";

export default class Order {
    static list()
    {
        return Helper.ajax('//api.local/v1/order/index', undefined, {method: 'GET'});
    }

    render() {
        return Helper.createElement('div');
    }
}