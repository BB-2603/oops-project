import React, { Component } from "react";

export class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            users: {
                "7073045096": "this-pass",
                "8484854848": "this-pass2"
            },
            display: { display: "none" },
            margin_top: "-1rem",
        };
    }

    submitbtn = () => {
        let username = document.getElementById("exampleInputEmail1").value;
        let password = document.getElementById("pass").value;
        let uscheck = username in this.state.users;
        let war2 = document.getElementById("danger");
        let war3 = document.getElementById("warning");

        if (uscheck == false) {
            war3.innerText = "User does not exist. Please Register to Continue."
            war3.style.display = "block";
            setTimeout(() => {
                war3.style.display = "none";
            }, 1500);
        } else if (this.state.users[username] != password) {
            war2.innerText = "Incorrect Password Entered. Please try again."
            war2.style.display = "block";
            setTimeout(() => {
                war2.style.display = "none";
            }, 1500);
        } else {
            console.log("corrt");

        }
    };

    myfunction = () => {
        if (this.state.display.display === "none") {
            this.setState({ display: { display: "block" }, margin_top: "-3rem" });
        } else {
            this.setState({ display: { display: "none" }, margin_top: "-1rem" });
        }
    };

    render() {
        const mystylehead = {
            border: "1px solid black",
            borderTop: "0",
            padding: "6rem",
            display: "flex",
            flexDirection: "column",
            width: "40.6rem",
            height: "32rem",
            marginLeft: "28vw",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
        };

        const inp = {
            borderRadius: "0.5rem",
            margin: "1rem",
            marginLeft: "1rem",
            padding: "0.3rem",
            width: "15rem",
        };

        return (
            <div style={mystylehead}>
                <h2 style={{ marginLeft: "-3rem", marginTop: this.state.margin_top }}>
                    Welcome Back!
                </h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Mobile Number
                        </label>
                        <input
                            type="email"
                            style={inp}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Mobile Number"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input type="password" style={inp} id="pass" placeholder="Enter Password" />
                    </div>

                    <div className="mb-3" style={this.state.display}>
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            AdminKey
                        </label>
                        <input type="password" style={inp} placeholder="Enter AdminKey" />
                    </div>
                    <input
                        type="checkbox"
                        className="btn-check"
                        onClick={() => {
                            this.myfunction();
                        }}
                        id="btn-check-2-outlined"
                    />
                    <label
                        className="btn btn-outline-secondary"
                        htmlFor="btn-check-2-outlined"
                    >
                        Click if you are an Admin
                    </label>
                    <br />

                </form>
                <button style={{ marginTop: "1rem", width: "6rem" }} className="btn btn-dark" onClick={() => this.submitbtn()}>
                    Submit
                </button>
            </div>
        );
    }
}

export default SignIn;
