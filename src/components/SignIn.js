import React, { Component } from "react";

export class SignIn extends Component {
    constructor() {
        super();
        if (!localStorage.getItem("users")) {
            let arr = []
            localStorage.setItem("users", JSON.stringify(arr))
        }
        this.state = {
            display: { display: "none" },
            margin_top: "-1rem",
            data: "fake"
        };
    }



    submitbtn = () => {
        const usnm = document.getElementById('exampleInputEmail1').value
        const pass = document.getElementById('pass').value
        const war1 = document.getElementById('warning')
        const war2 = document.getElementById('danger')
        const adminKey = document.getElementById('adminKey').value

        if (adminKey == "") {
            let url = "http://localhost:8093/api/Customers/login"
            let jsonvar = {
                "username": usnm,
                "pwd": pass
            }

            fetch(url, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(jsonvar),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ data: data })
                })
                .catch((err) => {
                    console.log(err.message);
                });



            if (this.state.data == "fake") {
                war1.innerHTML = "Some Error Caused while logging in. Please Try again."
                war1.style.display = "block"
                setTimeout(() => {
                    war1.style.display = "none"
                }, 1500)
            }

            else {
                localStorage.setItem("loginCheck", "true")
                let obb = this.state.data
                obb.cart = []
                obb.cartTotal = 0
                this.state.data = obb
                localStorage.setItem("user", JSON.stringify(this.state.data))
                window.location.assign("http://localhost:3000/Home")
            }
        } else {
            let url = "http://localhost:8093/api/admin/login"
            let jsonvar = {
                "username": usnm,
                "pwd": pass,
                "key": adminKey
            }

            fetch(url, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(jsonvar),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ data: data })
                })
                .catch((err) => {
                    console.log(err.message);
                });



            if (this.state.data == "fake") {
                war1.innerHTML = "Some Error Caused while logging in. Please Try again."
                war1.style.display = "block"
                setTimeout(() => {
                    war1.style.display = "none"
                }, 1500)
            }

            else {
                localStorage.setItem("loginCheck", "true")
                localStorage.setItem("admin", JSON.stringify(this.state.data))
                window.location.assign("http://localhost:3000/admin")
            }

        }
    }

    myfunction = () => {
        if (this.state.display.display === "none") {
            this.setState({ display: { display: "block" }, margin_top: "-3rem" });
        } else {
            this.setState({ display: { display: "none" }, margin_top: "-1rem" });
        }
    }
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
                            UserName
                        </label>
                        <input
                            type="email"
                            style={inp}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter UserName"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >
                            Password
                        </label>
                        <input type="password" style={inp} id="pass" placeholder="Enter Password" />
                    </div>

                    <div className="mb-3" style={this.state.display}>
                        <label htmlFor="exampleInputPassword1" className="form-label" >
                            AdminKey
                        </label>
                        <input type="password" id="adminKey" style={inp} placeholder="Enter AdminKey" />
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

};


export default SignIn;
