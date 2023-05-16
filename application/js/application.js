"use strict";

class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuth: window.localStorage.getItem("isAuth") === "true",
            username: window.localStorage.getItem("username"),
        }
    }

    render() {
        if (this.state.isAuth === "true") {
            return (
                <h1>Hello, {this.state.username}!</h1>
            )
        } else {
            return (
                <form className={'container'}>
                    <div className={'form-group'}>
                        <input className={'form-control'} type={'text'} name={'User[login]'}/>
                    </div>
                    <div className={'form-group'}>
                        <input className={'form-control'} type={'password'} name={'User[password]'}/>
                    </div>
                    <div className={'form-group'}>
                        <input className={'btn btn-success'} type={'submit'}/>
                    </div>
                </form>
            );
        }
    }
}