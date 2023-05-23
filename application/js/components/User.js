import Helper from "./Helper.js";

export default class User {
    render() {
        let form = Helper.createElement('form');
        return Helper.createElement('div', form);
    }
}