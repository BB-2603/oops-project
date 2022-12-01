import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'


export class FirstHeader extends Component {
    render() {

        const mystylehead = {
            display: "flex",
            marginLeft: "28vw",
            marginTop: "8rem",

        };

        const stylein = {
            display: "flex",
            paddingLeft: "8rem",
            paddingRight: "8rem",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",

        }
        return (
            <>
                <div class="alert alert-danger" id="danger" style={{ display: "none" }} role="alert">

                </div>
                <div class="alert alert-warning" id="warning" style={{ display: "none" }} role="alert">

                </div>
                <div style={mystylehead}>
                    <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
                        <Link to="/Login/#" style={stylein} className="btn btn-outline-dark">Sign-In</Link>
                        <Link to="/Login/signUp" style={stylein} className="btn btn-outline-dark">Sign-Up</Link>
                    </div>
                    <br />
                </div>
                <Outlet />
            </>
        )
    }
}

export default FirstHeader
