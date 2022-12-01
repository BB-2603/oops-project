import React, { Component } from 'react'

export class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            display: { display: "none" },
            margin_top: "-4rem"
        };
    }

    myfunction = () => {
        if (this.state.display.display == "none") {
            this.setState({ display: { display: "block" }, margin_top: "-5rem" })
        } else {
            this.setState({ display: { display: "none" }, margin_top: "-4rem" })
        }
    };
    render() {
        const mystylehead = {
            border: "1px solid black",
            borderTop: "0",
            padding: "6rem",
            display: "flex",
            flexDirection: "column",
            height: "32rem",
            width: "40.6rem",
            marginLeft: "28vw",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
        };

        const inp = {
            borderRadius: "0.5rem",
            width: "15rem",
            margin: "1rem",
            marginLeft: "1rem",
            padding: "0.3rem",
        }


        return (
            <div style={mystylehead}>
                <h2 style={{ marginLeft: "-3rem", marginTop: this.state.margin_top }}>Register Here!</h2>
                <form>
                    <div className="mb-3" >
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="email" style={inp} aria-describedby="emailHelp" placeholder='Enter Username' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" style={inp} placeholder='Enter Password' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" style={inp} placeholder='Confirm Password' />
                    </div>

                    <div className="mb-3" style={this.state.display}>
                        <label htmlFor="exampleInputPassword1" className="form-label">AdminKey</label>
                        <input type="password" style={inp} placeholder='(Given By previous admin)' />
                    </div>
                    <input type="checkbox" className="btn-check" onClick={() => { this.myfunction() }} id="btn-check-2-outlined" />
                    <label className="btn btn-outline-secondary" htmlFor="btn-check-2-outlined">Click if you want to register as an Admin</label><br />

                    <button style={{ marginTop: "1rem" }} className="btn btn-dark">Register</button>
                </form>
            </div>
        )
    }
}

export default SignUp
