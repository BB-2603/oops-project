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

    placeOrder = () => {
        let temp = JSON.parse(localStorage.getItem("user"))
        if (this.state.items.length == 0) {
            const war2 = document.getElementById('Warning')
            war2.innerHTML = "Please Add atleast one item in the cart"
            war2.style.display = "block"
            setTimeout(() => {
                war2.style.display = "none"
            }, 1500)
            console.log("cart is empty");
        } else if (temp.walletBalance < temp.cartTotal) {
            const war2 = document.getElementById('Danger')
            war2.innerHTML = "Your wallet has insufficient balance"
            war2.style.display = "block"
            setTimeout(() => {
                war2.style.display = "none"
            }, 1500)
            console.log("Your wallet has insufficient balance");
        }
        else {
            if (temp.shippingInfo == null) {
                temp.shippingInfo = []
                temp.shippingInfo.push(this.state.items)
            }
            temp.cart = []
            let finalTotal = temp.walletBalance - temp.cartTotal
            temp.walletBalance = finalTotal
            temp.cartTotal = 0

            localStorage.setItem("user", JSON.stringify(temp))
            const war2 = document.getElementById('Success')
            war2.innerHTML = "Your Order is Placed and will be delivered within 3 working days!"
            war2.style.display = "block"
            setTimeout(() => {
                war2.style.display = "none"
            }, 1500)


            window.location.reload()
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
            <div className="alert alert-danger" id="Danger" style={{ display: "none" }} role="alert">

            </div>
            <div className="alert alert-warning" id="Warning" style={{ display: "none" }} role="alert">

            </div>
            <div className="alert alert-success" id="Success" style={{ display: "none" }} role="alert">

            </div>

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

                <div style={carthead}> Cart Total: ₹{this.state.total}</div>

                <button type="button" style={{ marginTop: "1rem", marginLeft: "1.5rem" }} className="btn btn-secondary" onClick={() => { this.placeOrder() }}>Place Order</button>

            </div>

        </>;
    }
}

export default Cart;
