import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";

export class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      display: "block",
      logout: "none",
      displayadmin: "none",
      displayhome: "block",
      userlogout: {},
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("loginCheck") == "true") {
      this.setState({ display: "none" });
      this.setState({ logout: "block" });
      if (localStorage.getItem("logintype") == "admin") {
        document.getElementById("admhome").style.display = "block";
        document.getElementById("cushome").style.display = "none";
        document.getElementById("Cartt").style.display = "none";
        document.getElementById("wallett").style.display = "none";
      } else if (localStorage.getItem("logintype") == "customer") {
        document.getElementById("admhome").style.display = "none";
        document.getElementById("aDDItm").style.display = "none";
        document.getElementById("edIT").style.display = "none";
        document.getElementById("cushome").style.display = "block";
      }
    } else {
      document.getElementById("edIT").style.display = "none";
      document.getElementById("aDDItm").style.display = "none";
      document.getElementById("admhome").style.display = "none";
      document.getElementById("cushome").style.display = "block";
    }
  }

  addnew = () => {
    let url = "http://localhost:8093/api/addItems";
    let name = document.getElementById("ItemnamE").value;
    let price = document.getElementById("pricEe").value;
    let quantity = document.getElementById("QuantitY").value;
    let descri = document.getElementById("DescriptioN").value;
    let img = document.getElementById("ImgLinK").value;

    let jsonvar = {
      name: name,
      price: price,
      image: img,
      description: descri,
      quantity: quantity,
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    window.location.reload();
  };

  logoutClick = () => {
    let url = "http://localhost:8093/api/loggedIn";
    let jsonvar = {};
    fetch(url)
      .then((data) => data.json())
      .then((info) => {
        console.log(info);
        jsonvar = info[0];
        let ran = JSON.parse(localStorage.getItem("user"));

        jsonvar.cartTotal = ran[0];
        jsonvar.cart = ran[1];
        jsonvar.walletBalance = ran[2];
        jsonvar.orderHistory = ran[3];
        jsonvar.loginStatus = false;

        let url = "http://localhost:8093/api/logout";

        fetch(url, {
          mode: "cors",
          method: "PUT",
          body: JSON.stringify(jsonvar),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        localStorage.clear();
        localStorage.setItem("loginCheck", "false");
        this.setState({ display: "block" });

        this.setState({ logout: "none" });
        window.location.reload();
        window.location.assign("http://localhost:3000/Home");
      });
  };
  render() {
    const mystyle = {
      marginLeft: "15rem",
      width: "30rem",
    };
    const cart = {
      marginLeft: "19rem",
    };

    const wallet = {
      marginLeft: "1.5rem",
    };

    const inp = {
      borderRadius: "0.5rem",
      width: "15rem",
      margin: "1rem",
      marginLeft: "1rem",
      padding: "0.3rem",
    };
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              FarmFresh
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Home"
                    id="cushome">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/admin"
                    id="admhome">
                    AdminHome
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{ display: this.state.display }}>
                  <Link className="nav-link" to="/Login">
                    Login/SignUp
                  </Link>
                </li>
                <li className="nav-item" style={{ display: this.state.logout }}>
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    Logout
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel">
                            Confirmation
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to Logout?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => {
                              this.logoutClick();
                            }}>
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <input
                  className="form-control me-2"
                  style={mystyle}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>

                <li className="nav-item" id="Cartt">
                  <Link className="nav-link" style={cart} to="/Cart">
                    <i className="fa-solid fa-cart-shopping fa-xl"></i>
                  </Link>
                </li>

                <li className="nav-item" id="wallett">
                  <Link className="nav-link" style={wallet} to="/Wallet">
                    <i className="fa-solid fa-wallet fa-xl"></i>
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    style={{ marginLeft: "10rem" }}
                    id="aDDItm"
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Add Item{" "}
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel">
                            Add Credentials
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label">
                              Name
                            </label>
                            <input
                              id="ItemnamE"
                              style={inp}
                              aria-describedby="emailHelp"
                              placeholder="Enter Item Name"
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label">
                              Price
                            </label>
                            <input
                              id="pricEe"
                              style={inp}
                              aria-describedby="emailHelp"
                              placeholder="Enter Price"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label">
                              Quantity
                            </label>
                            <input
                              id="QuantitY"
                              style={inp}
                              aria-describedby="emailHelp"
                              placeholder="Enter Quantity"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label">
                              Image Link
                            </label>
                            <input
                              id="ImgLinK"
                              style={inp}
                              aria-describedby="emailHelp"
                              placeholder="Enter Image Link"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label">
                              Description
                            </label>
                            <input
                              id="DescriptioN"
                              style={inp}
                              aria-describedby="emailHelp"
                              placeholder="Enter Description"
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            id="ClsE">
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              this.addnew();
                            }}>
                            Add Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item" id="wallett">
                  <Link
                    className="nav-link"
                    id="edIT"
                    style={wallet}
                    to="/Users">
                    View Customer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
