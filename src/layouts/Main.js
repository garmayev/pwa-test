import React from "react";
import Navbar from "../components/navbar/Navbar";

export default class Main extends React.Component {
    render() {
        return (
            <>
                <div className={'content'}>
                    <Navbar />
                </div>
            </>
        );
    }
}