import React, { Component } from "react";

export class Wallet extends Component {
  constructor() {
    super();
    if (localStorage.getItem("loginCheck") == null)
      localStorage.setItem("loginCheck", "false");
    this.state = {
      ran: [],
    };
  }

  addmoney = () => {
    let temp = this.state.ran;
    let amount = parseInt(document.getElementById("money").value);
    amount = temp[2] + amount;
    temp[2] = amount;
    localStorage.setItem("user", JSON.stringify(temp));
    window.location.reload();
  };

  componentDidMount() {
    if (localStorage.getItem("loginCheck") === "true") {
      this.setState({
        ran: JSON.parse(localStorage.getItem("user")),
      });
      document.getElementById("temp1").style.display = "block";
      document.getElementById("temp2").style.display = "none";
    } else {
      document.getElementById("temp1").style.display = "none";
      document.getElementById("temp2").style.display = "block";
    }
  }
  render() {
    const centerStyle = {
      marginTop: "12rem",
      marginLeft: "32vw",
      display: "flex",
      width: "32rem",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid black",
    };

    const usStyle = {
      fontSize: "1.5rem",
      margin: "2rem",
    };

    const desc = {
      fontSize: "1.5rem",
      margin: "2rem",
      marginLeft: "3.5rem",
      marginTop: "0rem",
    };
    const amt = {
      fontSize: "1.5rem",
      marginLeft: "2rem",
    };

    const moneyStyle = {
      margin: "1rem",
    };
    return (
      <>
        <div id="temp2">Please Login First To access the Wallet.</div>
        <div style={centerStyle} id="temp1">
          <div style={usStyle}> Hello {this.state.ran.name}.</div>
          <div style={desc}>Your current wallet has</div>
          <div style={amt}> ₹{this.state.ran[2]}</div>

          <button
            type="button"
            style={moneyStyle}
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#addMON">
            Add Money
          </button>

          <div
            className="modal fade"
            id="addMON"
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
                  Enter Amount:{" "}
                  <input type="number" id="money" placeholder="Enter Amount" />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => this.addmoney()}>
                    Add Amount
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Wallet;
