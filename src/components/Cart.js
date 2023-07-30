import React, { Component } from "react";
import CartCard from "./CartCard";

export class Cart extends Component {
  constructor() {
    super();
    if (localStorage.getItem("loginCheck") == null) {
      localStorage.setItem("loginCheck", "false");
    }
    if (localStorage.getItem("deletethis") == null) {
      localStorage.setItem("deletethis", "0");
    }
    this.state = {
      items: [],
      total: 0,
    };
  }

  placeOrder = () => {
    let temp = JSON.parse(localStorage.getItem("user"));
    if (this.state.items.length == 0) {
      const war2 = document.getElementById("Warning");
      war2.innerHTML = "Please Add atleast one item in the cart";
      war2.style.display = "block";
      setTimeout(() => {
        war2.style.display = "none";
      }, 1500);
    } else if (temp[2] < temp[0]) {
      const war2 = document.getElementById("Danger");
      war2.innerHTML = "Your wallet has insufficient balance";
      war2.style.display = "block";
      setTimeout(() => {
        war2.style.display = "none";
      }, 1500);
      console.log("Your wallet has insufficient balance");
    } else {
      if (temp[3].length == 0) {
        temp[3].push(this.state.items);
      }
      temp[1] = [];
      let finalTotal = temp[2] - temp[0];
      temp[2] = finalTotal;
      temp[0] = 0;

      localStorage.setItem("user", JSON.stringify(temp));
      const war2 = document.getElementById("Success");
      war2.innerHTML =
        "Your Order is Placed and will be delivered within 3 working days!";
      war2.style.display = "block";
      setTimeout(() => {
        war2.style.display = "none";
      }, 1500);

      window.location.reload();
    }
  };

  async componentDidMount() {
    let ran = JSON.parse(localStorage.getItem("user"));
    this.setState({ items: ran[1] });

    if (localStorage.getItem("loginCheck") == "true") {
      this.setState({
        total: ran[0],
      });
      document.getElementById("temp3").style.display = "block";
      document.getElementById("temp4").style.display = "none";
    } else {
      document.getElementById("temp3").style.display = "none";
      document.getElementById("temp4").style.display = "block";
    }
  }

  render() {
    const carthead = {
      fontSize: "2rem",
      margin: "1.5rem",
    };

    const cartcard = {
      display: "flex",
      flexWrap: "wrap",
      width: "66rem",
      marginLeft: "5rem",
    };

    return (
      <>
        <div
          className="alert alert-danger"
          id="Danger"
          style={{ display: "none" }}
          role="alert"></div>
        <div
          className="alert alert-warning"
          id="Warning"
          style={{ display: "none" }}
          role="alert"></div>
        <div
          className="alert alert-success"
          id="Success"
          style={{ display: "none" }}
          role="alert"></div>

        <div id="temp4">Please Login First To access the Cart.</div>

        <div id="temp3" style={{ display: "none" }}>
          <div style={carthead}>
            <b>Your Shopping Cart </b>
          </div>
          <div style={cartcard}>
            {!this.state.loading &&
              localStorage.getItem("loginCheck") == "true" &&
              this.state.items.map((element) => {
                return (
                  <CartCard
                    name={element[0] ? element[0] : ""}
                    price={element[1]}
                    imgsrc={element[2]}
                    key={element[0]}
                    id={element[3]}
                  />
                );
              })}
          </div>

          <div style={carthead}> Cart Total: ₹{this.state.total}</div>

          <button
            type="button"
            style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            className="btn btn-secondary"
            onClick={() => {
              this.placeOrder();
            }}>
            Place Order
          </button>
        </div>
      </>
    );
  }
}

export default Cart;
