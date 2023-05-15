import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import './Navbar.css';
import data from "../../data/route.json";
import Home from "../home/Home";
import About from "../about/About";
import Contact from "../contact/Contact";
import Other from "../other/Other"

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: data
        }
    }

    render() {
        return (
            <>
                <div className="navbar">
                    <ul className="nav">
                        {this.state.items.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={item.path} className={({isActive, isPending}) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }>{item.label}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={"content"}>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"about"} element={<About/>}/>
                        <Route path={"contact"} element={<Contact/>}/>
                        <Route path={"other"} element={<Other />} />
                    </Routes>
                </div>
            </>
        );
    }
}