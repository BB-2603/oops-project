import React, { Component } from "react";

export class SignUp extends Component {
  constructor() {
    super();
    if (!localStorage.getItem("users")) {
      let arr = [];
      localStorage.setItem("users", JSON.stringify(arr));
    }
    this.state = {
      display: { display: "none" },
      margin_top: "-4rem",
    };
  }

  Registerbtn = () => {
    const usnm = document.getElementById("usnm").value;
    const adminkey = document.getElementById("adminkey").value;
    const pass = document.getElementById("pass1").value;
    const name = document.getElementById("name").value;
    const Phone = document.getElementById("Phone").value;
    const mail = document.getElementById("mail").value;
    const address = document.getElementById("address").value;
    const conpass = document.getElementById("conpass").value;
    const war1 = document.getElementById("warning");
    const war2 = document.getElementById("danger");
    const war3 = document.getElementById("success");

    if (pass !== conpass) {
      war2.innerHTML = "Password and Confirm Password must be same.";
      war2.style.display = "block";
      setTimeout(() => {
        war2.style.display = "none";
      }, 1500);

      document.getElementById("close").click();
    } else if (usnm.length <= 1) {
      war1.innerHTML = "Username Cannot Be Empty";
      war1.style.display = "block";
      setTimeout(() => {
        war1.style.display = "none";
      }, 1500);

      document.getElementById("close").click();
    } else if (pass.length <= 1) {
      war1.innerHTML = "Password Cannot Be Empty";
      war1.style.display = "block";
      setTimeout(() => {
        war1.style.display = "none";
      }, 1500);

      document.getElementById("close").click();
    } else if (
      name.length <= 1 ||
      mail.length <= 1 ||
      address.length <= 1 ||
      Phone.length <= 1
    ) {
      war1.innerHTML = "Please Enter the Credentials Properly.";
      war1.style.display = "block";
      setTimeout(() => {
        war1.style.display = "none";
      }, 1500);

      document.getElementById("close").click();
    } else {
      if (adminkey === "") {
        let url = "http://localhost:8093/api/addUser";
        let jsonvar = {
          userId: usnm,
          password: pass,
          name: name,
          email: mail,
          phone: Phone,
          address: address,
          cart: [],
          loginStatus: false,
          admin: false,
          cartTotal: 0,
          walletBalance: 1000.0,
          orderHistory: [],
        };

        fetch(url, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify(jsonvar),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message != null) {
              war2.innerHTML =
                "Username Already Taken. Please Choose Another One";
              war2.style.display = "block";
              setTimeout(() => {
                war2.style.display = "none";
              }, 1500);
              document.getElementById("close").click();
            } else if (data.length === 0) {
              war2.innerHTML =
                "There was an error while registering. Please Try again";
              war2.style.display = "block";
              setTimeout(() => {
                war2.style.display = "none";
              }, 1500);

              document.getElementById("close").click();
            } else {
              war3.innerHTML =
                "Registeration Successfull! Please Login to Continue";
              war3.style.display = "block";
              setTimeout(() => {
                war3.style.display = "none";
              }, 1500);

              document.getElementById("close").click();
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        let url = "http://localhost:8093/api/addUser";
        let jsonvar = {
          userId: usnm,
          password: pass,
          name: name,
          email: mail,
          phone: Phone,
          address: address,
          cart: [],
          loginStatus: false,
          admin: true,
          cartTotal: 0,
          walletBalance: 1000.0,
          //"shippingInfo": null
        };
        fetch(url, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify(jsonvar),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.length === 0) {
              war2.innerHTML =
                "There was an error while registering. Please Try again";
              war2.style.display = "block";
              setTimeout(() => {
                war2.style.display = "none";
              }, 1500);

              document.getElementById("close").click();
            } else {
              console.log(data);

              war3.innerHTML =
                "Registeration Successfull! Please Login to Continue";
              war3.style.display = "block";
              setTimeout(() => {
                war3.style.display = "none";
              }, 1500);

              document.getElementById("close").click();
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  };
  myfunction = () => {
    if (this.state.display.display === "none") {
      this.setState({ display: { display: "block" }, margin_top: "-5rem" });
    } else {
      this.setState({ display: { display: "none" }, margin_top: "-4rem" });
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
    };

    return (
      <div style={mystylehead}>
        <h2 style={{ marginLeft: "-3rem", marginTop: this.state.margin_top }}>
          Register Here!
        </h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="usnm"
              style={inp}
              aria-describedby="emailHelp"
              placeholder="Enter Username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              style={inp}
              id="pass1"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              style={inp}
              id="conpass"
              placeholder="Confirm Password"
            />
          </div>

          <div className="mb-3" style={this.state.display}>
            <label htmlFor="exampleInputPassword1" className="form-label">
              AdminKey
            </label>
            <input
              type="password"
              id="adminkey"
              style={inp}
              placeholder="(Given By previous admin)"
            />
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
            htmlFor="btn-check-2-outlined">
            Click if you want to register as an Admin
          </label>
          <br />
        </form>
        <button
          type="button"
          className="btn btn-dark"
          style={{ marginTop: "2rem" }}
          data-bs-toggle="modal"
          data-bs-target="#registerpopup">
          Continue
        </button>

        <div
          className="modal fade"
          id="registerpopup"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  More Details To Register
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    style={inp}
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Phone
                  </label>
                  <input
                    id="Phone"
                    style={inp}
                    aria-describedby="emailHelp"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="mail"
                    style={inp}
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Address
                  </label>
                  <input
                    type="email"
                    id="address"
                    style={inp}
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Address"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="close">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    this.Registerbtn();
                  }}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
