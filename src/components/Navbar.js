import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'


export class Navbar extends Component {
    render() {

        const mystyle = {
            marginLeft: "15rem",
            width: "30rem"
        }
        const cart = {
            marginLeft: "21rem",
        }

        const wallet = {
            marginLeft: "1.5rem",
        }
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Login">Login/SignUp</Link>
                                </li>

                                <input className="form-control me-2" style={mystyle} type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                                <li className="nav-item">
                                    <Link className="nav-link" style={cart} to="/Cart"><i className="fa-solid fa-cart-shopping fa-xl"></i></Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" style={wallet} to="/Wallet"><i className="fa-solid fa-wallet fa-xl"></i></Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar

