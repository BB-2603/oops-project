import React, { Component } from "react";
import cartContext from "../contexts/CartContext";

export class CartCard extends Component {
  static contextType = cartContext;

  constructor() {
    super();
    this.state = {
      amount: 1,
    };
  }

  async componentDidMount() {
    let ran = JSON.parse(localStorage.getItem("user"));

    for (const key in ran[1]) {
      if (Object.hasOwnProperty.call(ran, key)) {
        const element = ran[1][key];

        if (element[3] === this.props.id) {
          this.setState({
            amount: element[4],
          });
          localStorage.setItem("user", JSON.stringify(ran));
          break;
        }
      }
    }
  }

  addQuantity = (id) => {
    let ran = JSON.parse(localStorage.getItem("user"));

    for (const key in ran[1]) {
      if (Object.hasOwnProperty.call(ran, key)) {
        const element = ran[1][key];

        if (element[3] === id) {
          element[4]++;
          ran[0] = ran[0] + element[1];
          this.context.updateTotal(ran[0]);
          console.log(this.context.total + " " + ran[0]);

          this.setState({
            amount: element[4],
          });
          localStorage.setItem("user", JSON.stringify(ran));
          break;
        }
      }
    }
  };

  reduceQuantity = (id) => {
    let ran = JSON.parse(localStorage.getItem("user"));

    for (const key in ran[1]) {
      if (Object.hasOwnProperty.call(ran, key)) {
        const element = ran[1][key];

        if (element[3] === id) {
          if (element[4] === 1) {
            alert(`You cannot have less than 1 element in your cart`);
          } else {
            ran[0] = ran[0] - element[1];
            this.context.updateTotal(ran[0]);
            element[4]--;
            this.setState({
              amount: element[4],
            });
            localStorage.setItem("user", JSON.stringify(ran));
            break;
          }
        }
      }
    }
  };
  deletebtn = (id) => {
    let ran = JSON.parse(localStorage.getItem("user"));

    for (const key in ran[1]) {
      if (Object.hasOwnProperty.call(ran, key)) {
        const element = ran[1][key];

        if (element[3] === id) {
          console.log(element[3]);
          let num = ran[1].indexOf(element);
          let totalFinal = ran[0] - element[1];
          ran[0] = totalFinal;
          ran[1].splice(num, 1);
          localStorage.setItem("user", JSON.stringify(ran));
          localStorage.removeItem("deletethis");
          break;
        }
      }
    }
    window.location.reload();
  };

  render() {
    const cartOut = {
      display: "flex",
      width: "60rem",
      border: "2px solid black",
    };

    const innerTxt = {
      fontSize: "1.3rem",
      marginTop: "1.5rem",
      marginLeft: "2rem",
    };
    const innerTxtPrice = {
      fontSize: "1.3rem",
      marginLeft: "2rem",
    };
    const dte = {
      marginTop: "1rem",
      marginLeft: "2rem",
    };

    const styledial = {
      width: "6rem",
      height: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "top",
    };

    const styleplus = {
      padding: "0.3rem",
      height: "2rem",
      width: "1.5rem",
      border: "0.2rem solid black",
      borderBottomLeftRadius: "0.5rem",
      borderTopLeftRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    const stylenum = {
      height: "2rem",
      width: "1.5rem",
      border: "0.2rem solid black",
      borderLeft: "0rem",
      //borderBottomLeftRadius: "0.5rem",
      //borderTopLeftRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const styleminus = {
      height: "2rem",
      width: "1.5rem",
      border: "0.2rem solid black",
      borderLeft: "0rem",
      borderBottomRightRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    //const ran = JSON.parse(localStorage.getItem("user"))[1];
    //console.log(this.props.key);

    let { name, price, imgsrc, id } = this.props;
    return (
      <>
        <div className="card mb-3" style={cartOut}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={imgsrc} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body" style={innerTxt}>
                <p className="card-text">{name}</p>
              </div>
              <div id="mid" style={{ display: "flex" }}>
                <div id="dial" style={styledial}>
                  <button
                    id="plus"
                    style={styleplus}
                    onClick={() => this.addQuantity(id)}>
                    +
                  </button>
                  <div id="num" style={stylenum}>
                    {this.state.amount}
                  </div>
                  <button
                    id="minus"
                    style={styleminus}
                    onClick={() => this.reduceQuantity(id)}>
                    -
                  </button>
                </div>
                <div style={innerTxtPrice}>₹{price}</div>
              </div>
              <button
                type="button"
                id="deletebtn"
                style={dte}
                className="btn btn-secondary"
                onClick={() => this.deletebtn(id)}>
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartCard;
