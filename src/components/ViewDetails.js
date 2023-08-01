import React, { Component } from "react";

export class ViewDetails extends Component {
  constructor() {
    super();
    if (localStorage.getItem("loginCheck") == null)
      localStorage.setItem("loginCheck", "false");
    this.state = {
      items: [],
      message: { display: "none" },
    };
  }

  async componentDidMount() {
    let url = "http://localhost:8093/api/Items";

    let jsonvar = {
      _id: localStorage.getItem("tempthis"),
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
      .then((info) => {
        localStorage.removeItem("tempthis");
        this.setState({ items: info[0] });
      });

    if (localStorage.getItem("loginCheck") === "false") {
      document.getElementById("AddtoCart").style.display = "block";
      document.getElementById("AddtoCart").disabled = "true";
      document.getElementById("DelteItm").style.display = "none";
    } else if (localStorage.getItem("logintype") === "customer") {
      document.getElementById("AddtoCart").style.display = "block";
      document.getElementById("DelteItm").style.display = "none";
      let ran = JSON.parse(localStorage.getItem("user"));

      for (const key in ran[1]) {
        if (Object.hasOwnProperty.call(ran, key)) {
          const element = ran[1][key];
          console.log(element[3] + " " + jsonvar._id);

          if (element[3] === jsonvar._id) {
            let addtocart = document.getElementById("AddtoCart");
            addtocart.disabled = true;
          }
        }
      }
    } else if (localStorage.getItem("logintype") === "admin") {
      document.getElementById("AddtoCart").style.display = "none";
      document.getElementById("DelteItm").style.display = "block";
    }
  }

  deleteItem = () => {
    let url = `http://localhost:8093/api/Items/${this.state.items._id}`;
    //let adminobj = JSON.parse(localStorage.getItem("admin"));

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    window.location.reload();
    window.location.assign("http://localhost:3000/admin");
  };
  addedItem = () => {
    this.setState({ message: { display: "block" } });
    setTimeout(() => {
      this.setState({ message: { display: "none" } });
    }, 1500);

    let cartItem = [
      this.state.items.name,
      this.state.items.price,
      this.state.items.image,
      this.state.items._id,
      1,
    ];
    let tempo = JSON.parse(localStorage.getItem("user"));
    if (tempo[1].length === 0) {
      //tempo[1] = [];
      tempo[1].push(cartItem);
      tempo[0] = this.state.items.price;
    } else {
      tempo[1].push(cartItem);
      tempo[0] += this.state.items.price;
    }
    localStorage.setItem("user", JSON.stringify(tempo));
    let addtocart = document.getElementById("AddtoCart");
    addtocart.disabled = true;
  };

  render() {
    const title = {
      fontSize: "3rem",
      marginLeft: "3rem",
      marginTop: "1.8rem",
    };
    const imageStyle = {
      backgroundColor: "white",
      marginLeft: "3rem",
      width: "30rem",
    };
    const descStyle = {
      fontSize: "1.5rem",
      marginLeft: "13.5rem",
      marginTop: "3.5rem",
    };

    const priceStyle = {
      fontSize: "1.5rem",
      width: "10rem",
      marginLeft: "13.5rem",
      marginTop: "1.2rem",
    };
    const flex = {
      display: "flex",
      marginTop: "1.5rem",
    };
    const flex2 = {
      display: "flex",
      marginTop: "2rem",
      flexDirection: "column",
    };
    const button = {
      marginLeft: "13.5rem",
      marginTop: "1.8rem",
      width: "8rem",
    };

    return (
      <div>
        <div
          className="alert alert-success"
          style={this.state.message}
          id="success"
          role="alert">
          Your Item has been successfully added to cart.
        </div>
        <div style={title}>{this.state.items.name}</div>
        <div style={flex}>
          <div style={imageStyle}>
            <img src={this.state.items.image} style={imageStyle} alt="" />
          </div>
          <div style={flex2}>
            <div style={descStyle}>
              About this item: <br />
              {this.state.items.description}
            </div>

            <div style={priceStyle}>₹{this.state.items.price}</div>

            <button
              className="btn btn-outline-secondary"
              id="AddtoCart"
              style={button}
              onClick={() => this.addedItem()}>
              Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-danger"
              id="DelteItm"
              style={button}
              onClick={() => this.deleteItem()}>
              Delete Item
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewDetails;
