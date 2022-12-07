import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'


export class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            display: "block",
            logout: "none"

        }
    }

    async componentDidMount() {
        if (localStorage.getItem("loginCheck") == "true") {
            this.setState({ display: "none" })
            this.setState({ logout: "block" })
        }
    }

    logoutClick = () => {
        localStorage.setItem("loginCheck", "false")
        this.setState({ display: "block" })
        this.setState({ logout: "none" })
        window.location.reload()
    }
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
                                <li className="nav-item" style={{ display: this.state.display }}>
                                    <Link className="nav-link" to="/Login">Login/SignUp</Link>
                                </li>
                                <li className="nav-item" style={{ display: this.state.logout }}>
                                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Logout
                                    </button>

                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    Are you sure you want to Logout?
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-dark" onClick={() => { this.logoutClick() }}>Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

