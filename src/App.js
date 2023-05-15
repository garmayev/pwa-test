import React from "react";
import Main from './layouts/Main';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

export default class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </div>
        );
    }
}

reportWebVitals();
