import React, { Component } from "react";
import CartCard from "./CartCard";

export class Cart extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            total: JSON.parse(localStorage.getItem("user")).cartTotal,
        };

        let ran = JSON.parse(localStorage.getItem("user"))

        for (const key in ran.cart) {
            if (Object.hasOwnProperty.call(ran.cart, key)) {
                const element = ran.cart[key];

                if (element.indexOf(localStorage.getItem("deletethis")) != -1) {
                    let num = ran.cart.indexOf(element)
                    let totalFinal = this.state.total - element[1]
                    ran.cartTotal = totalFinal;
                    ran.cart.splice(num, 1)
                    localStorage.setItem("user", JSON.stringify(ran))
                    localStorage.removeItem("deletethis")
                    break

                };
            }
        }

    }

    async componentDidMount() {
        let ran = JSON.parse(localStorage.getItem("user"))
        this.setState({ items: ran.cart })

        if (localStorage.getItem("loginCheck") == "true") {
            document.getElementById('temp3').style.display = "block"
            document.getElementById('temp4').style.display = "none"
        } else {
            document.getElementById('temp3').style.display = "none"
            document.getElementById('temp4').style.display = "block"

        }
    }


    render() {

        const carthead = {
            fontSize: "2rem",
            margin: "1.5rem"
        }

        const cartcard = {
            display: "flex",
            flexWrap: "wrap",
            width: "66rem",
            marginLeft: "5rem",
        }

        return <>
            <div id="temp4">
                Please Login First To access the Cart.

            </div>

            <div id="temp3">
                <div style={carthead}>

                    <b>Your Shopping Cart </b>

                </div>
                <div style={cartcard} >
                    {!this.state.loading && this.state.items.map((element) => {

                        return (
                            <CartCard name={element[0] ? element[0] : ""} price={element[1]} imgsrc={element[2]} key={element[0]} id={element[3]} />
                        );
                    })}
                </div>

                <div style={carthead}> Cart Total: {this.state.total}</div>

                <button type="button" style={{ marginTop: "1rem", marginLeft: "1.5rem" }} className="btn btn-secondary" >Place Order</button>

            </div>

        </>;
    }
}

export default Cart;
